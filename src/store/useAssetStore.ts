import { create } from 'zustand';

export interface Asset {
    asset_id: string;
    asset_type: 'Bridge' | 'Road' | 'Drainage' | 'Pipeline' | 'Street Light' | 'Traffic Light' | 'Road Blockage';
    name: string;
    location: string;
    progress: number;
    criticality: number;
    priority_score: number;
    priority_rank: number;
    status: string;
}

interface AssetStore {
    assets: Asset[];
    setAssets: (assets: Asset[]) => void;
    updateAsset: (id: string, updates: Partial<Asset>) => void;
    recalculatePriority: () => void;
    syncWithCSV: () => Promise<void>;
}

const statusProgressMap: Record<string, number> = {
    'Operational': 100,
    'Maintenance': 80,
    'Under Repair': 50,
    'Faulty': 20,
    'Severely Damaged': 5,
};

export const useAssetStore = create<AssetStore>((set, get) => ({
    assets: [],
    setAssets: (assets) => set({
        assets: assets.map(a => ({
            ...a,
            priority_score: a.priority_score || 0,
            priority_rank: a.priority_rank || 0
        }))
    }),
    updateAsset: (id, updates) => {
        set((state) => {
            const updatedUpdates = { ...updates };
            if (updates.status && statusProgressMap[updates.status] !== undefined) {
                updatedUpdates.progress = statusProgressMap[updates.status];
            }

            return {
                assets: state.assets.map((asset) =>
                    asset.asset_id === id ? { ...asset, ...updatedUpdates } : asset
                ),
            };
        });
        get().recalculatePriority();
        get().syncWithCSV();
    },
    syncWithCSV: async () => {
        try {
            const assets = get().assets;
            await fetch('/api/assets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(assets),
            });
        } catch (err) {
            console.error("Failed to sync with CSV:", err);
        }
    },
    recalculatePriority: () => {
        set((state) => {
            const updatedAssets = state.assets.map((asset) => ({
                ...asset,
                priority_score: (asset.criticality * 0.7) + ((100 - (asset.progress || 0)) * 0.3),
            }));

            const sortedAssets = [...updatedAssets].sort((a, b) => b.priority_score - a.priority_score);

            return {
                assets: updatedAssets.map((asset) => ({
                    ...asset,
                    priority_rank: sortedAssets.findIndex(a => a.asset_id === asset.asset_id) + 1
                }))
            };
        });
    },
}));
