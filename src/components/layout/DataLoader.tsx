'use client';

import { useEffect } from 'react';
import { useAssetStore } from '@/store/useAssetStore';
import Papa from 'papaparse';

export default function DataLoader() {
    const { assets, setAssets, recalculatePriority } = useAssetStore();

    useEffect(() => {
        // Only load if assets are empty
        if (assets.length === 0) {
            const loadData = async () => {
                try {
                    // 1. Try fetching from TiDB API
                    const apiResponse = await fetch('/api/assets');
                    if (apiResponse.ok) {
                        const data = await apiResponse.json();
                        setAssets(data);
                        recalculatePriority();
                        return;
                    }

                    // 2. Fallback to raw CSV if API is not yet configured
                    const response = await fetch('/data/chennai-infrastructure.csv');
                    const csvText = await response.text();

                    Papa.parse(csvText, {
                        header: true,
                        dynamicTyping: true,
                        skipEmptyLines: true,
                        complete: (results: Papa.ParseResult<any>) => {
                            setAssets(results.data as any[]);
                            recalculatePriority();
                        },
                    });
                } catch (err) {
                    console.error("Data Loading Error:", err);
                }
            };
            loadData();
        }
    }, [assets.length, setAssets, recalculatePriority]);

    return null;
}
