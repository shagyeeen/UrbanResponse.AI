'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { Plus, Minus, Maximize2 } from 'lucide-react';

const regions = [
    { id: 'north', name: 'North Chennai', x: 150, y: 150, risk: 45 },
    { id: 'central', name: 'Central Chennai', x: 350, y: 200, risk: 88 },
    { id: 'tnagar', name: 'T Nagar District', x: 300, y: 300, risk: 40 },
    { id: 'guindy', name: 'Guindy Junction', x: 450, y: 280, risk: 75 },
    { id: 'adyar', name: 'Adyar Region', x: 550, y: 350, risk: 72 },
    { id: 'velachery', name: 'Velachery Delta', x: 500, y: 450, risk: 60 },
    { id: 'omr', name: 'OMR Corridor', x: 750, y: 420, risk: 85 },
    { id: 'anna_nagar', name: 'Anna Nagar West', x: 200, y: 280, risk: 20 },
];

export default function ChennaiHeatmap() {
    const [scale, setScale] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3));
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
    const handleReset = () => setScale(1);

    return (
        <div className="glass-card rounded-2xl p-6 h-full min-h-[550px] flex flex-col relative overflow-hidden group">
            <div className="mb-6 flex justify-between items-start z-20">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        Chennai City Infrastructure Heatmap
                    </h3>
                    <p className="text-[10px] text-gray-400 font-mono tracking-widest mt-1 uppercase italic">Geo-spatial AI Risk Assessment Overlay</p>
                </div>
                <div className="flex gap-4">
                    <div className="px-3 py-1 glass-card rounded-md text-[9px] font-mono text-white/50">SEC: 12-B</div>
                    <div className="px-3 py-1 glass-card rounded-md text-[9px] font-mono text-neon-purple animate-pulse">SCANNING...</div>
                </div>
            </div>

            <div
                ref={containerRef}
                className="flex-1 relative bg-[#0a0515]/30 rounded-xl border border-white/5 overflow-hidden cursor-grab active:cursor-grabbing"
            >
                {/* Futuristic Map Grid (Fixed) */}
                <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
                    <svg className="w-full h-full">
                        <pattern id="map-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(168,85,247,0.4)" strokeWidth="0.5" />
                            <circle cx="0" cy="0" r="1" fill="rgba(168,85,247,0.4)" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#map-grid)" />
                    </svg>
                </div>

                {/* Draggable & Scalable Layers */}
                <motion.div
                    drag
                    dragConstraints={containerRef}
                    animate={{ scale }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="absolute inset-0 flex items-center justify-center p-32"
                    style={{ transformOrigin: 'center' }}
                >
                    <svg
                        viewBox="120 120 660 360"
                        preserveAspectRatio="xMidYMid meet"
                        className="w-full h-full drop-shadow-[0_0_50px_rgba(168,85,247,0.1)] pointer-events-none"
                    >
                        {regions.map((region) => (
                            <motion.g
                                key={region.id}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                {/* Risk Pulse Ring */}
                                <motion.circle
                                    cx={region.x}
                                    cy={region.y}
                                    r={30 + region.risk / 3}
                                    fill={region.risk > 70 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(168, 85, 247, 0.2)'}
                                    animate={{
                                        r: [30 + region.risk / 3, 45 + region.risk / 3, 30 + region.risk / 3],
                                        opacity: [0.3, 0.5, 0.3]
                                    }}
                                    transition={{ duration: 2.5, repeat: Infinity }}
                                />

                                {/* Core Point */}
                                <circle
                                    cx={region.x}
                                    cy={region.y}
                                    r="6"
                                    fill={region.risk > 70 ? '#EF4444' : '#A855F7'}
                                />

                                {/* Data Label */}
                                <foreignObject x={region.x + 15} y={region.y - 30} width="180" height="60">
                                    <div className="flex flex-col text-[11px] font-mono leading-tight tracking-tighter">
                                        <span className="text-white font-black opacity-100 uppercase drop-shadow-md">{region.name}</span>
                                        <span className={region.risk > 70 ? 'text-red-400 font-black' : 'text-neon-purple font-bold'}>
                                            SYS_RISK: {region.risk}%
                                        </span>
                                    </div>
                                </foreignObject>
                            </motion.g>
                        ))}

                        {/* Simulated Road Networks */}
                        <motion.path
                            d="M 150 150 L 350 200 L 450 280 L 550 350 L 750 420 M 550 350 L 500 450 M 200 280 L 300 300 L 450 280"
                            fill="none"
                            stroke="rgba(168,85,247,0.3)"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                            className="animate-[dash_30s_linear_infinite]"
                        />
                    </svg>
                </motion.div>

                {/* Controls Overlay */}
                <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-30">
                    <button
                        onClick={handleZoomIn}
                        className="w-10 h-10 glass-card rounded-lg flex items-center justify-center text-white hover:bg-neon-purple/20 transition-all active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleZoomOut}
                        className="w-10 h-10 glass-card rounded-lg flex items-center justify-center text-white hover:bg-neon-purple/20 transition-all active:scale-95"
                    >
                        <Minus className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleReset}
                        className="w-10 h-10 glass-card rounded-lg flex items-center justify-center text-white hover:bg-neon-purple/20 transition-all active:scale-95"
                    >
                        <Maximize2 className="w-5 h-5" />
                    </button>
                </div>

                {/* Legend (Fixed in corner) */}
                <div className="absolute top-4 right-4 space-y-3 glass-card p-4 rounded-xl border-white/5 bg-black/40 z-20 pointer-events-none">
                    <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1">Status Legend</p>
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]" />
                        <span className="text-[10px] text-gray-300 font-mono uppercase tracking-tight">Critical Hazard</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-neon-purple shadow-[0_0_10px_#A855F7]" />
                        <span className="text-[10px] text-gray-300 font-mono uppercase tracking-tight">Active Ops</span>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes dash {
          from { stroke-dashoffset: 200; }
          to { stroke-dashoffset: 0; }
        }
      `}} />
        </div>
    );
}

