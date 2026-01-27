
import { run } from './api/db.js';

const migrate = async () => {
    try {
        console.log('Migrating database...');

        // Add imageUrl column for thumbnail URL
        try {
            await run('ALTER TABLE models ADD COLUMN thumbnailUrl TEXT');
            console.log('Added thumbnailUrl column.');
        } catch (err) {
            if (err.message.includes('duplicate column name')) {
                console.log('thumbnailUrl column already exists.');
            } else {
                console.error('Error adding thumbnailUrl:', err.message);
            }
        }

        // Add thumbnailCloudinaryId column
        try {
            await run('ALTER TABLE models ADD COLUMN thumbnailCloudinaryId TEXT');
            console.log('Added thumbnailCloudinaryId column.');
        } catch (err) {
            if (err.message.includes('duplicate column name')) {
                console.log('thumbnailCloudinaryId column already exists.');
            } else {
                console.error('Error adding thumbnailCloudinaryId:', err.message);
            }
        }

        console.log('Migration complete.');
    } catch (err) {
        console.error('Migration failed:', err);
    }
};

migrate();
