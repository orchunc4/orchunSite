import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

console.log('Testing NeonDB (PostgreSQL) Connection...');
console.log('URL:', process.env.DATABASE_URL ? process.env.DATABASE_URL.replace(/:([^:@]+)@/, ':****@') : 'UNDEFINED');

const run = async () => {
    try {
        const sql = neon(process.env.DATABASE_URL);
        const result = await sql`SELECT NOW()`;
        console.log('SUCCESS: Connected to NeonDB!');
        console.log('Server Time:', result[0].now);
        process.exit(0);
    } catch (err) {
        console.error('FAILURE: Could not connect.');
        console.error('Error:', err.message);
        process.exit(1);
    }
};

run();
