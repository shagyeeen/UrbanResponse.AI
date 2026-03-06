'use client';

import { motion } from 'framer-motion';
import { useAssetStore } from '@/store/useAssetStore';
import { AlertTriangle, MapPin, Gauge } from 'lucide-react';
import Link from 'next/link';

export default function PriorityPanel() {
    const { assets } = useAssetStore();

    // Check if assets are loaded
    if (!assets || assets.length === 0) return <div className="glass-card p-12 text-center text-gray-500 font-mono">Loading telemetry...</div>;

    const sortedAssets = [...assets]
        .sort((a, b) => b.priority_score - a.priority_score)
        .slice(0, 6);

    return (
        <div className="glass-card rounded-2xl p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <AlertTriangle className="text-red-500 w-5 h-5 shadow-[0_0_10px_#ef4444]" />
                        Incident Priority Panel
                    </h3>
                    <p className="text-[10px] text-gray-400 font-mono tracking-widest mt-1 uppercase">Recommended Response Operations</p>
                </div>
                <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full text-[10px] font-mono text-neon-purple animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-neon-purple" />
                    Real-time Priority Analysis
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedAssets.map((asset, index) => (
                    <motion.div
                        key={asset.asset_id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`group glass-card p-5 rounded-2xl border-l-4 ${index === 0 ? 'border-l-red-500 bg-red-500/5' :
                            index === 1 ? 'border-l-orange-500 bg-orange-500/5' :
                                'border-l-purple-500 bg-purple-500/5'
                            } transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col justify-between`}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${index === 0 ? 'bg-red-500 text-white shadow-[0_0_10px_#ef4444]' :
                                        index === 1 ? 'bg-orange-500 text-white' :
                                            'bg-purple-900 text-purple-200'
                                        }`}>
                                        P-{index + 1}
                                    </span>
                                    <span className="text-[9px] text-purple-400 font-mono px-1.5 py-0.5 rounded border border-purple-500/10">
                                        #{asset.asset_id}
                                    </span>
                                </div>
                                <h4 className="font-black text-white text-base leading-tight group-hover:text-neon-purple transition-colors truncate">
                                    {asset.name}
                                </h4>

                                <div className="mt-4 flex flex-col gap-2 text-[9px] text-gray-500 font-mono uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-3 h-3 text-neon-purple" />
                                        <span className="truncate">{asset.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Gauge className="w-3 h-3 text-neon-purple" />
                                        Crit: <span className="text-gray-300">{asset.criticality}%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="shrink-0 flex flex-col items-center">
                                <div className="relative w-14 h-14 flex items-center justify-center">
                                    <svg className="w-full h-full -rotate-90">
                                        <circle
                                            cx="28" cy="28" r="24"
                                            className="stroke-white/5"
                                            strokeWidth="3"
                                            fill="transparent"
                                        />
                                        <motion.circle
                                            cx="28" cy="28" r="24"
                                            className={`${index === 0 ? 'stroke-red-500' : 'stroke-neon-purple'}`}
                                            strokeWidth="3"
                                            fill="transparent"
                                            strokeDasharray="150.8"
                                            initial={{ strokeDashoffset: 150.8 }}
                                            animate={{ strokeDashoffset: 150.8 - (150.8 * (100 - (asset.progress || 0)) / 100) }}
                                            transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.2 }}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute flex flex-col items-center justify-center leading-none">
                                        <span className="text-xs font-black text-white">
                                            {Math.round(asset.priority_score)}
                                        </span>
                                        <span className="text-[7px] text-gray-500 uppercase mt-0.5 font-bold">IDX</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                            <div className="min-w-0">
                                <span className="text-[8px] text-gray-600 uppercase block mb-1">AI Recommendation</span>
                                <span className="text-[10px] text-purple-300 font-bold truncate block lowercase italic">
                                    {asset.asset_type === 'Bridge' ? 'Structural overhaul' :
                                        asset.asset_type === 'Road' ? 'Grid lockdown' :
                                            asset.asset_type === 'Drainage' ? 'Clear blockages' :
                                                'Emergency dispatch'}
                                </span>
                            </div>
                            <Link
                                href={`/admin?id=${asset.asset_id}`}
                                className="shrink-0 bg-white/5 hover:bg-neon-purple border border-white/10 hover:border-neon-purple px-4 py-2 rounded-xl text-[9px] font-black text-white transition-all active:scale-95 uppercase tracking-tighter"
                            >
                                Dispatch
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
