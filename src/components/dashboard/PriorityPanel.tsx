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

            <div className="space-y-4">
                {sortedAssets.map((asset, index) => (
                    <motion.div
                        key={asset.asset_id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`group glass-card p-4 rounded-xl border-l-4 ${index === 0 ? 'border-l-red-500 bg-red-500/5' :
                            index === 1 ? 'border-l-orange-500 bg-orange-500/5' :
                                'border-l-purple-500 bg-purple-500/5'
                            } transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3">
                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${index === 0 ? 'bg-red-500 text-white shadow-[0_0_10px_#ef4444]' :
                                        index === 1 ? 'bg-orange-500 text-white' :
                                            'bg-purple-900 text-purple-200'
                                        }`}>
                                        Priority {index + 1}
                                    </span>
                                    <h4 className="font-bold text-white">{asset.name}</h4>
                                    <span className="text-[10px] text-purple-400 font-mono px-2 py-0.5 rounded border border-purple-500/20">
                                        ID-{asset.asset_id}
                                    </span>
                                </div>

                                <div className="mt-3 flex items-center gap-6 text-[10px] text-gray-400 font-mono">
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="w-3 h-3 text-neon-purple" />
                                        {asset.location}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Gauge className="w-3 h-3 text-neon-purple" />
                                        Criticality: {asset.criticality}%
                                    </div>
                                </div>
                            </div>

                            <div className="text-right flex flex-col items-end gap-2">
                                <div className="text-[10px] text-gray-400 font-mono mb-1">Response Viability</div>
                                <div className="relative w-12 h-12 flex items-center justify-center">
                                    <svg className="w-full h-full -rotate-90">
                                        <circle
                                            cx="24" cy="24" r="20"
                                            className="stroke-white/5"
                                            strokeWidth="4"
                                            fill="transparent"
                                        />
                                        <motion.circle
                                            cx="24" cy="24" r="20"
                                            className={`${index === 0 ? 'stroke-red-500' : 'stroke-neon-purple'}`}
                                            strokeWidth="4"
                                            fill="transparent"
                                            strokeDasharray="125.66"
                                            initial={{ strokeDashoffset: 125.66 }}
                                            animate={{ strokeDashoffset: 125.66 - (125.66 * (100 - (asset.progress || 0)) / 100) }}
                                            transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.2 }}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <span className="absolute text-[10px] font-bold text-white leading-none">
                                        {Math.round(asset.priority_score)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-purple-500/10 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col">
                                    <span className="text-[8px] text-gray-500 uppercase tracking-tighter">Recommended Action</span>
                                    <span className="text-[10px] text-purple-300 font-medium tracking-wide italic lowercase">
                                        {asset.asset_type === 'Bridge' ? 'Deploy structural engineers' :
                                            asset.asset_type === 'Road' ? 'Redirect traffic' :
                                                asset.asset_type === 'Drainage' ? 'Send maintenance team' :
                                                    'Urgent inspection required'}
                                    </span>
                                </div>
                            </div>
                            <Link href={`/admin?id=${asset.asset_id}`} className="text-[10px] font-bold text-neon-purple border border-neon-purple/30 px-3 py-1 rounded-full hover:bg-neon-purple/10 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all">
                                INITIATE RESPONSE
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
