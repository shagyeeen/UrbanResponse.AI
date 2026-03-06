'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: number;
    health: number;
    issues: number;
    icon: LucideIcon;
    color: string;
}

export default function StatCard({ label, value, health, issues, icon: Icon, color }: StatCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-card p-5 rounded-2xl relative overflow-hidden group"
        >
            <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg bg-${color}/10 border border-${color}/20 group-hover:shadow-[0_0_15px_rgba(var(--color-${color}),0.3)] transition-all`}>
                    <Icon className={`w-5 h-5 text-neon-purple`} />
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">{label}</p>
                    <p className="text-2xl font-bold text-white">{value}</p>
                </div>
            </div>

            <div className="space-y-3">
                <div>
                    <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-gray-400">Health Status</span>
                        <span className={health > 70 ? 'text-green-400' : health > 40 ? 'text-yellow-400' : 'text-red-400'}>{health}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${health}%` }}
                            className={`h-full bg-gradient-to-r from-deep-purple to-neon-purple`}
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center text-[10px]">
                    <span className="text-gray-400">Active Issues</span>
                    <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                        {issues} Reports
                    </span>
                </div>
            </div>

            {/* Decorative background element */}
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon size={80} />
            </div>
        </motion.div>
    );
}
