'use client';

import { motion } from 'framer-motion';
import ChennaiHeatmap from '@/components/dashboard/Heatmap';
import { Map as MapIcon, Shield } from 'lucide-react';

export default function HeatmapPage() {
    return (
        <div className="space-y-8 pb-20">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                        <MapIcon className="w-8 h-8 text-neon-purple" />
                        City <span className="text-neon-purple text-glow">Heatmap</span>
                    </h2>
                    <p className="text-[10px] text-gray-400 font-mono tracking-widest mt-1 uppercase">GEO-SPATIAL RISK DISTRIBUTION | CHENNAI METRO AREA</p>
                </div>
                <div className="flex gap-4">
                    <div className="px-4 py-2 glass-card rounded-lg text-[10px] font-mono font-bold text-neon-purple">ACTIVE SCAN: 100%</div>
                    <div className="px-4 py-2 glass-card rounded-lg text-[10px] font-mono font-bold text-green-400 text-glow">SIGNAL: STABLE</div>
                </div>
            </div>

            <div className="w-full h-[700px]">
                <ChennaiHeatmap />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card p-6 rounded-2xl border-l-4 border-l-neon-purple">
                    <h4 className="text-sm font-black text-white uppercase mb-4 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-neon-purple" />
                        Regional Risk Analysis
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                        The AI engine is currently synthesizing real-time data from 12,400+ sensors across the city. High-intensity pulse zones indicate areas with critical infrastructure decay or active hazards. Central Chennai continues to show peak risk levels due to concurrent pipeline and road maintenance.
                    </p>
                </div>
                <div className="glass-card p-6 rounded-2xl border-l-4 border-l-deep-purple font-mono uppercase">
                    <h4 className="text-sm font-black text-white mb-4">Coordinate Telemetry</h4>
                    <div className="space-y-2 text-[10px]">
                        <div className="flex justify-between">
                            <span className="text-gray-500">North Chennai Buffer</span>
                            <span className="text-white">LAT: 13.1147 / LON: 80.2872</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">OMR Corridor Sync</span>
                            <span className="text-white">LAT: 12.8954 / LON: 80.2241</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">T Nagar Grid Status</span>
                            <span className="text-white text-neon-purple text-glow">NOMINAL</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
