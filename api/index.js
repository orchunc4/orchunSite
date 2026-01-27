import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { sql, initializeTables } from './db.js';

dotenv.config();

const app = express();

// Initialize database tables
let dbError = null;
initializeTables().catch(err => {
    console.error('Database initialization failed:', err.message);
    dbError = err;
});

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
        const renders = await sql`
            SELECT id, title, subtitle, image_url as "imageUrl", cloudinary_id as "cloudinaryId", 
                   sort_order as "order", created_at as "createdAt"
            FROM renders 
            ORDER BY sort_order ASC, created_at ASC
        `;
        res.json(renders);
    } catch (err) {
        console.error('API Error (/api/renders):', err.message);
        res.status(500).json({ error: 'Database Error', details: err.message });
    }
});

app.get('/api/models', async (req, res) => {
    try {
        const models = await sql`
            SELECT id, name, file_url as "fileUrl", cloudinary_id as "cloudinaryId", type,
                   thumbnail_url as "thumbnailUrl", thumbnail_cloudinary_id as "thumbnailCloudinaryId",
                   created_at as "createdAt"
            FROM models 
            ORDER BY created_at DESC
        `;
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

        const result = await sql`
            INSERT INTO renders (title, subtitle, image_url, cloudinary_id)
            VALUES (${title || ''}, ${subtitle || ''}, ${req.file.path}, ${req.file.filename})
            RETURNING id, title, subtitle, image_url as "imageUrl", cloudinary_id as "cloudinaryId", created_at as "createdAt"
        `;

        res.status(201).json(result[0]);
    } catch (err) {
        console.error('Render Upload Error:', err);
        const errorMessage = (err.message && err.message.includes('size'))
            ? 'File size too large for Cloudinary (Max 10MB)'
            : (err.message || 'Upload failed');
        res.status(500).json({ error: errorMessage });
    }
});

app.post('/api/upload/model', upload.fields([{ name: 'modelFile', maxCount: 1 }, { name: 'thumbnailFile', maxCount: 1 }]), async (req, res) => {
    console.log('UPLOAD MODEL ATTEMPT:', { body: req.body, files: req.files ? Object.keys(req.files) : 'NONE' });
    try {
        const { name } = req.body;

        if (!req.files || !req.files['modelFile']) {
            console.warn('Upload failed: No model file in request');
            return res.status(400).json({ error: 'No model file uploaded' });
        }

        const modelFile = req.files['modelFile'][0];
        const thumbnailFile = req.files['thumbnailFile'] ? req.files['thumbnailFile'][0] : null;

        const result = await sql`
            INSERT INTO models (name, file_url, cloudinary_id, thumbnail_url, thumbnail_cloudinary_id)
            VALUES (
                ${name || ''}, 
                ${modelFile.path}, 
                ${modelFile.filename},
                ${thumbnailFile ? thumbnailFile.path : null},
                ${thumbnailFile ? thumbnailFile.filename : null}
            )
            RETURNING id, name, file_url as "fileUrl", cloudinary_id as "cloudinaryId", 
                      thumbnail_url as "thumbnailUrl", thumbnail_cloudinary_id as "thumbnailCloudinaryId",
                      created_at as "createdAt"
        `;

        res.status(201).json(result[0]);
    } catch (err) {
        console.error('Model Upload Error:', err);
        const errorMessage = (err.message && err.message.includes('size'))
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

        const result = await sql`
            INSERT INTO messages (name, email, message)
            VALUES (${name}, ${email}, ${message})
            RETURNING id
        `;

        res.status(201).json({ success: true, id: result[0].id });
    } catch (err) {
        console.error('Contact Error:', err);
        res.status(500).json({ error: 'Failed to save message' });
    }
});

// --- DELETE ROUTES ---

app.delete('/api/delete/render/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const renders = await sql`SELECT cloudinary_id FROM renders WHERE id = ${id}`;
        if (renders.length === 0) {
            return res.status(404).json({ error: 'Render not found' });
        }

        const render = renders[0];
        if (render.cloudinary_id) {
            await cloudinary.uploader.destroy(render.cloudinary_id);
        }

        await sql`DELETE FROM renders WHERE id = ${id}`;
        res.json({ success: true, message: 'Render deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/delete/model/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const models = await sql`SELECT cloudinary_id, thumbnail_cloudinary_id FROM models WHERE id = ${id}`;
        if (models.length === 0) {
            return res.status(404).json({ error: 'Model not found' });
        }

        const model = models[0];
        if (model.cloudinary_id) {
            await cloudinary.uploader.destroy(model.cloudinary_id, { resource_type: 'raw' });
        }
        if (model.thumbnail_cloudinary_id) {
            await cloudinary.uploader.destroy(model.thumbnail_cloudinary_id);
        }

        await sql`DELETE FROM models WHERE id = ${id}`;
        res.json({ success: true, message: 'Model deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Health / Status
app.get('/api', async (req, res) => {
    let dbStatus = 'Unknown';
    try {
        await sql`SELECT 1`;
        dbStatus = 'Connected';
    } catch (e) {
        dbStatus = 'Disconnected';
    }

    res.json({
        status: 'Online',
        message: 'Full Admin API (NeonDB PostgreSQL) is running',
        database: dbStatus,
        error: dbError ? dbError.message : null
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('SERVER ERROR:', err);
    res.status(err.status || 500).json({
        error: 'Server Error',
        message: err.message || 'Unknown error',
        details: err.toString()
    });
});

const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`);
});

export default app;
