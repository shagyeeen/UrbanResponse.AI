import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Papa from 'papaparse';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrate() {
    const connection = await mysql.createConnection({
        host: process.env.TIDB_HOST,
        port: Number(process.env.TIDB_PORT) || 4000,
        user: process.env.TIDB_USER,
        password: process.env.TIDB_PASSWORD,
        database: process.env.TIDB_DATABASE,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        console.log('--- URBAN RESPONSE AI: TIDB MIGRATION START ---');

        // 1. Create Table
        console.log('Creating assets table...');
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS assets (
                asset_id INT PRIMARY KEY,
                asset_type VARCHAR(255),
                name VARCHAR(255),
                location VARCHAR(255),
                progress INT,
                criticality INT,
                priority INT,
                status VARCHAR(50),
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // 2. Read CSV
        console.log('Reading CSV data...');
        const csvPath = path.join(process.cwd(), 'public/data/chennai-infrastructure.csv');
        const csvFile = fs.readFileSync(csvPath, 'utf8');

        const { data } = Papa.parse(csvFile, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true
        });

        // 3. Insert Data
        console.log(`Migrating ${data.length} assets...`);
        for (const asset of data) {
            await connection.execute(
                `INSERT INTO assets (asset_id, asset_type, name, location, progress, criticality, priority, status)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE 
                    asset_type = VALUES(asset_type),
                    name = VALUES(name),
                    location = VALUES(location),
                    progress = VALUES(progress),
                    criticality = VALUES(criticality),
                    priority = VALUES(priority),
                    status = VALUES(status)`,
                [
                    asset.asset_id,
                    asset.asset_type,
                    asset.name,
                    asset.location,
                    asset.progress,
                    asset.criticality,
                    asset.priority,
                    asset.status
                ]
            );
        }

        console.log('--- MIGRATION COMPLETED SUCCESSFULLY ---');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await connection.end();
    }
}

migrate();
