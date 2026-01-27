
import { run } from './api/db.js';

const seed = async () => {
    try {
        console.log('Seeding fake model...');
        await run(`
            INSERT INTO models (name, fileUrl, cloudinaryId, type)
            VALUES (?, ?, ?, ?)
        `, ['Fake Delete Test', 'http://example.com/fake.glb', 'fake_cloud_id', 'glb']);
        console.log('Seeded fake model successfully.');
    } catch (err) {
        console.error('Seeding failed:', err);
    }
};

seed();
