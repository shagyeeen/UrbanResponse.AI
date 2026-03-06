'use client';

import { motion } from 'framer-motion';
import { Asset } from '@/store/useAssetStore';
import { MapPin, Gauge, Shield, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

interface AssetGridProps {
    assets: Asset[];
    type: string;
}

export default function AssetGrid({ assets, type }: AssetGridProps) {
    const filteredAssets = assets.filter(a => a.asset_type === type);

    if (filteredAssets.length === 0) {
        return (
            <div className="glass-card p-20 rounded-3xl flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <Shield className="w-8 h-8 text-gray-600" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">No {type} Data Available</h4>
                <p className="text-sm text-gray-500 max-w-xs">No active infrastructure reports found for this category in the Chennai database.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map((asset, i) => (
                <motion.div
                    key={asset.asset_id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass-card p-6 rounded-2xl border border-purple-500/10 hover:border-neon-purple/30 transition-all group relative overflow-hidden"
                >
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 group-hover:scale-110 transition-transform">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${asset.status.includes('Damage') ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                asset.status.includes('Operational') ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                    'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            }`}>
                            {asset.status}
                        </span>
                    </div>

                    <div className="mb-6">
                        <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1">UNIT_ID: {asset.asset_id}</p>
                        <h4 className="text-lg font-bold text-white group-hover:text-neon-purple transition-colors">{asset.name}</h4>
                        <div className="flex items-center gap-2 text-[10px] text-purple-400 mt-1 font-mono">
                            <MapPin className="w-3 h-3" />
                            {asset.location}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-[10px] mb-1 font-mono">
                                <span className="text-gray-400 uppercase">Operational Progress</span>
                                <span className="text-white font-bold">{asset.progress}%</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${asset.progress}%` }}
                                    className="h-full bg-gradient-to-r from-deep-purple to-neon-purple"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                <div className="flex items-center gap-2 mb-1">
                                    <Gauge className="w-3 h-3 text-red-500" />
                                    <span className="text-[9px] text-gray-500 uppercase font-mono">Criticality</span>
                                </div>
                                <p className="text-sm font-bold text-white">{asset.criticality}%</p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                <div className="flex items-center gap-2 mb-1">
                                    <AlertTriangle className="w-3 h-3 text-neon-purple" />
                                    <span className="text-[9px] text-gray-500 uppercase font-mono">Priority</span>
                                </div>
                                <p className="text-sm font-bold text-white">LVL {asset.priority_rank || 'N/A'}</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[9px] font-mono">
                            <div className="flex items-center gap-1.5 text-gray-400">
                                <Clock className="w-3 h-3 text-neon-purple" />
                                LAST_SYNC: 2M AGO
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-400">
                                <CheckCircle2 className="w-3 h-3 text-green-500" />
                                VERIFIED
                            </div>
                        </div>
                    </div>

                    {/* Decorative background intensity */}
                    <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-neon-purple/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
            ))}
        </div>
    );
}
