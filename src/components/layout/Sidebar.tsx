'use client';

import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Database,
    Map as MapIcon,
    AlertTriangle,
    Users,
    Trophy,
    Sparkles,
    Settings,
    ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: AlertTriangle, label: 'Prioritization', href: '/priority' },
    { icon: MapIcon, label: 'City Heatmap', href: '/heatmap' },
    { icon: Sparkles, label: 'AI Insights', href: '/insights' },
    { icon: Users, label: 'About Us', href: '/about' },
    { icon: ShieldCheck, label: 'Admin Panel', href: '/admin' },
    { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="fixed left-0 top-0 h-screen w-64 glass-panel border-r border-purple-500/20 z-50 flex flex-col p-4"
        >
            <div className="mb-8 p-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-lavender bg-clip-text text-transparent text-glow">
                    URBAN RESPONSE
                </h1>
                <p className="text-[10px] text-purple-400 tracking-[0.2em] font-mono">CIY INTELLIGENCE v1.0</p>
            </div>

            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.label} href={item.href}>
                            <motion.div
                                whileHover={{ x: 5, backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${isActive ? 'bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'hover:bg-white/5'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 group-hover:text-neon-purple transition-colors ${isActive ? 'text-neon-purple' : 'text-gray-400'
                                    }`} />
                                <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                                    }`}>
                                    {item.label}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="ml-auto w-1.5 h-1.5 rounded-full bg-neon-purple shadow-[0_0_10px_#A855F7]"
                                    />
                                )}
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto p-4 glass-card rounded-xl">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-deep-purple to-neon-purple shadow-[0_0_10px_rgba(106,0,255,0.5)]" />
                    <div>
                        <p className="text-xs font-bold">Admin User</p>
                        <p className="text-[10px] text-purple-400">Chennai Ops</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
