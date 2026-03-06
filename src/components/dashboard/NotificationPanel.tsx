'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAssetStore } from '@/store/useAssetStore';
import { AlertCircle, MapPin, X, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface NotificationPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
    const { assets } = useAssetStore();

    // Get top 5 most critical assets (highest priority score)
    const criticalAssets = [...assets]
        .sort((a, b) => b.priority_score - a.priority_score)
        .slice(0, 5);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="absolute right-0 top-14 w-80 glass-panel rounded-2xl border border-purple-500/30 p-4 z-[70] shadow-[0_0_50px_rgba(168,85,247,0.2)] overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <TrendingUp className="w-32 h-32 text-red-500" />
                        </div>

                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <div className="flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-red-500" />
                                <h3 className="text-xs font-black text-white uppercase tracking-widest">Critical Alerts</h3>
                            </div>
                            <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-full transition-colors">
                                <X className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>

                        <div className="space-y-3 relative z-10">
                            {criticalAssets.map((asset) => (
                                <Link
                                    key={asset.asset_id}
                                    href={`/admin?id=${asset.asset_id}`}
                                    onClick={onClose}
                                >
                                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-red-500/30 hover:bg-red-500/5 transition-all group">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-[10px] font-mono text-red-400">PRIORITY {Math.round(asset.priority_score)}</span>
                                            <span className="text-[8px] font-mono text-gray-600">#{asset.asset_id}</span>
                                        </div>
                                        <h4 className="text-[11px] font-bold text-white group-hover:text-red-400 transition-colors truncate">
                                            {asset.name}
                                        </h4>
                                        <div className="flex items-center gap-1.5 mt-2 text-[9px] text-gray-500">
                                            <MapPin className="w-3 h-3 text-neon-purple" />
                                            <span className="truncate">{asset.location}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/5 text-center relative z-10">
                            <Link
                                href="/priority"
                                onClick={onClose}
                                className="text-[9px] font-black text-neon-purple uppercase tracking-widest hover:text-white transition-colors"
                            >
                                View All Incidents
                            </Link>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
