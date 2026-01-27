import { neon } from '@neondatabase/serverless';

// Lazy initialization - create client only when needed
let sql = null;

const getSQL = () => {
    if (!sql) {
        if (!process.env.DATABASE_URL) {
            throw new Error('DATABASE_URL environment variable is not set');
        }
        sql = neon(process.env.DATABASE_URL);
    }
    return sql;
};

// Initialize tables if they don't exist
const initializeTables = async () => {
    try {
        console.log('Initializing PostgreSQL tables...');
        const query = getSQL();

        // Renders table
        await query`
            CREATE TABLE IF NOT EXISTS renders (
                id SERIAL PRIMARY KEY,
                title TEXT DEFAULT '',
                subtitle TEXT DEFAULT '',
                image_url TEXT NOT NULL,
                cloudinary_id TEXT NOT NULL,
                sort_order INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

        // Models table
        await query`
            CREATE TABLE IF NOT EXISTS models (
                id SERIAL PRIMARY KEY,
                name TEXT DEFAULT '',
                file_url TEXT NOT NULL,
                cloudinary_id TEXT NOT NULL,
                type TEXT DEFAULT 'glb',
                thumbnail_url TEXT,
                thumbnail_cloudinary_id TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

        // Messages table
        await query`
            CREATE TABLE IF NOT EXISTS messages (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                is_read BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

        console.log('PostgreSQL tables initialized successfully.');
    } catch (error) {
        console.error('Error initializing tables:', error.message);
        throw error;
    }
};

// Export getter function instead of sql directly
export { getSQL, initializeTables };
