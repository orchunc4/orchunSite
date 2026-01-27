import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { fileURLToPath } from 'url';
import { query, run, get } from './db.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}));
app.use(express.json());

// Cloudinary Config
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.warn('WARNING: Cloudinary credentials are missing in .env file. Uploads will fail.');
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer Storage Engine
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'portfolio_uploads',
        resource_type: 'auto',
        allowed_formats: ['jpg', 'png', 'jpeg', 'glb', 'gltf']
    },
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// --- AUTH ROUTES ---

app.post('/api/login', (req, res) => {
    const { password } = req.body;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

    if (password === ADMIN_PASSWORD) {
        res.json({ success: true, message: 'Authenticated' });
    } else {
        res.status(401).json({ success: false, error: 'Incorrect password' });
    }
});

// --- DATA ROUTES ---

app.get('/api/renders', async (req, res) => {
    try {
        const renders = await query('SELECT * FROM renders ORDER BY "order" ASC, createdAt ASC');
        res.json(renders);
    } catch (err) {
        console.error('API Error (/api/renders):', err.message);
        res.status(500).json({ error: 'Database Error', details: err.message });
    }
});

app.get('/api/models', async (req, res) => {
    try {
        const models = await query('SELECT * FROM models ORDER BY createdAt DESC');
        res.json(models);
    } catch (err) {
        console.error('API Error (/api/models):', err.message);
        res.status(500).json({ error: 'Database Error', details: err.message });
    }
});

// --- UPLOAD ROUTES ---

app.post('/api/upload/render', upload.single('image'), async (req, res) => {
    console.log('UPLOAD RENDER ATTEMPT:', { body: req.body, file: req.file ? req.file.filename : 'MISSING' });
    try {
        const { title, subtitle } = req.body;
        if (!req.file) {
            console.warn('Upload failed: No file in request');
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const result = await run(
            'INSERT INTO renders (title, subtitle, imageUrl, cloudinaryId) VALUES (?, ?, ?, ?)',
            [title || '', subtitle || '', req.file.path, req.file.filename]
        );

        const newRender = await get('SELECT * FROM renders WHERE id = ?', [result.id]);
        res.status(201).json(newRender);
    } catch (err) {
        console.error('Render Upload Error:', err);
        const errorMessage = (err.http_code === 400 && err.message?.includes('size'))
            ? 'File size too large for Cloudinary (Max 10MB)'
            : (err.message || 'Upload failed');
        res.status(500).json({ error: errorMessage });
    }
});

app.post('/api/upload/model', upload.fields([{ name: 'modelFile', maxCount: 1 }, { name: 'thumbnailFile', maxCount: 1 }]), async (req, res) => {
    console.log('UPLOAD MODEL ATTEMPT:', { body: req.body, files: req.files ? Object.keys(req.files) : 'NONE' });
    try {
        const { name } = req.body;

        // Check if model file exists
        if (!req.files || !req.files['modelFile']) {
            console.warn('Upload failed: No model file in request');
            return res.status(400).json({ error: 'No model file uploaded' });
        }

        const modelFile = req.files['modelFile'][0];
        const thumbnailFile = req.files['thumbnailFile'] ? req.files['thumbnailFile'][0] : null;

        const result = await run(
            'INSERT INTO models (name, fileUrl, cloudinaryId, thumbnailUrl, thumbnailCloudinaryId) VALUES (?, ?, ?, ?, ?)',
            [
                name || '',
                modelFile.path,
                modelFile.filename,
                thumbnailFile ? thumbnailFile.path : null, // Store thumbnail URL if uploaded
                thumbnailFile ? thumbnailFile.filename : null // Store thumbnail ID if uploaded
            ]
        );

        const newModel = await get('SELECT * FROM models WHERE id = ?', [result.id]);
        res.status(201).json(newModel);
    } catch (err) {
        console.error('Model Upload Error:', err);
        const errorMessage = (err.http_code === 400 && err.message?.includes('size'))
            ? 'File size too large for Cloudinary (Max 10MB)'
            : (err.message || 'Upload failed');
        res.status(500).json({ error: errorMessage });
    }
});

// --- CONTACT ROUTE ---

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const result = await run(
            'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)',
            [name, email, message]
        );

        res.status(201).json({ success: true, id: result.id });
    } catch (err) {
        console.error('Contact Error:', err);
        res.status(500).json({ error: 'Failed to save message' });
    }
});

// --- DELETE ROUTES ---

app.delete('/api/delete/render/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const render = await get('SELECT * FROM renders WHERE id = ?', [id]);
        if (!render) return res.status(404).json({ error: 'Render not found' });

        if (render.cloudinaryId) {
            await cloudinary.uploader.destroy(render.cloudinaryId);
        }
        await run('DELETE FROM renders WHERE id = ?', [id]);
        res.json({ success: true, message: 'Render deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/delete/model/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const model = await get('SELECT * FROM models WHERE id = ?', [id]);
        if (!model) return res.status(404).json({ error: 'Model not found' });

        if (model.cloudinaryId) {
            await cloudinary.uploader.destroy(model.cloudinaryId, { resource_type: 'raw' });
        }

        // Also delete thumbnail if exists
        if (model.thumbnailCloudinaryId) {
            await cloudinary.uploader.destroy(model.thumbnailCloudinaryId);
        }

        await run('DELETE FROM models WHERE id = ?', [id]);
        res.json({ success: true, message: 'Model deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Health / Status
app.get('/api', (req, res) => {
    res.json({ status: 'Online', message: 'Full Admin API (SQLite) is running' });
});

// Global Error Handler (ensure JSON response on crash)
app.use((err, req, res, next) => {
    console.error('SERVER ERROR:', err);
    res.status(err.status || 500).json({
        error: 'Server Error',
        message: err.message || 'Unknown error',
        stack: err.stack,
        details: err.toString()
    });
});

const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
    console.log(`Backend server permanently listening on port ${PORT}`);
});

// Keep process alive
setInterval(() => {
    if (server.listening) {
        // Just checking server state
    }
}, 30000);

process.on('uncaughtException', (err) => {
    console.error('CRITICAL UNCAUGHT EXCEPTION:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('CRITICAL UNHANDLED REJECTION:', reason);
});

export default app;
