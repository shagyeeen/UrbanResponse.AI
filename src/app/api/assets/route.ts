import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const assets = await request.json();

        // Header
        let csvContent = 'asset_id,asset_type,name,location,progress,criticality,priority,status\n';

        // Rows
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

        // Update both locations to ensure consistency
        fs.writeFileSync(filePath, csvContent);
        if (fs.existsSync(path.dirname(publicFilePath))) {
            fs.writeFileSync(publicFilePath, csvContent);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error writing CSV:', error);
        return NextResponse.json({ success: false, error: 'Failed to write CSV' }, { status: 500 });
    }
}
