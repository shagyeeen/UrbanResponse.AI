import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import pool from '@/lib/db';

const CSV_PATH = path.join(process.cwd(), 'public/data/chennai-infrastructure.csv');

export async function GET() {
    try {
        // Try TiDB first if host is configured
        if (process.env.TIDB_HOST) {
            const [rows] = await pool.query('SELECT * FROM assets ORDER BY priority ASC');
            return NextResponse.json(rows);
        }

        // Fallback to CSV
        return NextResponse.json({ error: 'TiDB not configured' }, { status: 404 });
    } catch (error) {
        console.error('TiDB Fetch Error:', error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const assets = await request.json();

        // 1. Try TiDB Update
        if (process.env.TIDB_HOST) {
            const connection = await pool.getConnection();
            try {
                await connection.beginTransaction();
                for (const asset of assets) {
                    await connection.execute(
                        `INSERT INTO assets (asset_id, asset_type, name, location, progress, criticality, priority, status)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                         ON DUPLICATE KEY UPDATE 
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
                            asset.priority_rank || 0,
                            asset.status
                        ]
                    );
                }
                await connection.commit();
            } catch (err) {
                await connection.rollback();
                throw err;
            } finally {
                connection.release();
            }
        }

        // 2. Always update CSV for redundancy/local dev
        let csvContent = 'asset_id,asset_type,name,location,progress,criticality,priority,status\n';
        assets.forEach((asset: any) => {
            const row = [
                asset.asset_id,
                asset.asset_type,
                `"${asset.name}"`,
                `"${asset.location}"`,
                asset.progress,
                asset.criticality,
                asset.priority_rank || 0,
                `"${asset.status}"`
            ].join(',');
            csvContent += row + '\n';
        });

        const filePath = path.join(process.cwd(), 'src', 'data', 'chennai-infrastructure.csv');
        const publicFilePath = path.join(process.cwd(), 'public', 'data', 'chennai-infrastructure.csv');

        fs.writeFileSync(filePath, csvContent);
        if (fs.existsSync(path.dirname(publicFilePath))) {
            fs.writeFileSync(publicFilePath, csvContent);
        }

        return NextResponse.json({ success: true, db_synced: !!process.env.TIDB_HOST });
    } catch (error) {
        console.error('Sync Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to sync' }, { status: 500 });
    }
}
