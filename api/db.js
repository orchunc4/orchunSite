import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000 // 5 second timeout
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // Return error to be handled by caller
        return error;
    }
};

// --- SCHEMAS ---

const renderSchema = new mongoose.Schema({
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    imageUrl: { type: String, required: true },
    cloudinaryId: { type: String, required: true },
    order: { type: Number, default: 0 },
}, { timestamps: true });

const modelSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    fileUrl: { type: String, required: true },
    cloudinaryId: { type: String, required: true },
    type: { type: String, default: 'glb' },
    thumbnailUrl: { type: String, default: null },
    thumbnailCloudinaryId: { type: String, default: null },
}, { timestamps: true });

const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
}, { timestamps: true });

// --- MODELS ---

export const Render = mongoose.model('Render', renderSchema);
export const Model = mongoose.model('Model', modelSchema);
export const Message = mongoose.model('Message', messageSchema);

export default connectDB;
