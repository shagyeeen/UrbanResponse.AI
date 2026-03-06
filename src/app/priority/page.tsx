'use client';

import { motion, AnimatePresence } from 'framer-motion';
import PriorityPanel from '@/components/dashboard/PriorityPanel';
import { useAssetStore } from '@/store/useAssetStore';
import {
    AlertTriangle,
    TrendingUp,
    Zap,
    ArrowUpDown,
    Search,
    ChevronLeft,
    ChevronRight,
    Activity,
    Layers,
    ListFilter
} from 'lucide-react';
import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function PriorityPage() {
    const { assets } = useAssetStore();

    // Inventory Table State
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState<string>('priority_score');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [groupBy, setGroupBy] = useState<'none' | 'type' | 'status'>('none');
    const itemsPerPage = 10;

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('desc');
        }
        setCurrentPage(1);
    };

    const filteredAndSortedAssets = useMemo(() => {
        if (!assets) return [];
        let result = assets.filter(a =>
            a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.asset_id.toString().includes(searchTerm)
        );

        if (sortField) {
            result.sort((a: any, b: any) => {
                let v1 = a[sortField];
                let v2 = b[sortField];
                if (typeof v1 === 'string') {
                    return sortOrder === 'asc' ? v1.localeCompare(v2) : v2.localeCompare(v1);
                }
                return sortOrder === 'asc' ? v1 - v2 : v2 - v1;
            });
        }
        return result;
    }, [assets, searchTerm, sortField, sortOrder]);

    const groups = useMemo(() => {
        if (groupBy === 'none') return { 'All Monitored Units': filteredAndSortedAssets };

        return filteredAndSortedAssets.reduce((acc: any, asset) => {
            const key = groupBy === 'type' ? asset.asset_type : asset.status;
            if (!acc[key]) acc[key] = [];
            acc[key].push(asset);
            return acc;
        }, {});
    }, [filteredAndSortedAssets, groupBy]);

    const totalPages = Math.ceil(filteredAndSortedAssets.length / itemsPerPage);

    const getPaginatedItems = (items: any[]) => {
        if (groupBy !== 'none') return items; // Show full groups when grouped
        const start = (currentPage - 1) * itemsPerPage;
        return items.slice(start, start + itemsPerPage);
    };

    return (
        <div className="space-y-8 pb-32">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                        <AlertTriangle className="w-8 h-8 text-red-500" />
                        Command <span className="text-red-500 text-glow">Prioritization</span>
                    </h2>
                    <p className="text-[10px] text-gray-400 font-mono tracking-widest mt-1 uppercase italic">GRID STRESS ANALYSIS | INCIDENT QUEUE V4.1</p>
                </motion.div>
                <div className="flex gap-4">
                    <div className="px-4 py-2 glass-card rounded-lg text-[10px] font-mono font-bold text-red-400 border border-red-500/20">THREAT LEVEL: MODERATE</div>
                    <div className="px-4 py-2 glass-card rounded-lg text-[10px] font-mono font-bold text-neon-purple text-glow animate-pulse border border-neon-purple/20">LIVE TELEMETRY ACTIVE</div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 flex flex-col gap-8">
                    {/* Decision Logic Card */}
                    <div className="glass-card p-10 rounded-3xl border-l-4 border-l-red-500 bg-red-500/5 relative overflow-hidden group">
                        <TrendingUp className="w-24 h-24 text-red-500/5 absolute -bottom-6 -right-6 mix-blend-overlay" />
                        <h3 className="text-xl font-black text-white uppercase mb-4 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-yellow-400" />
                            AI Prioritization Engine
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-2xl mb-6">
                            Ranking is dynamically adjusted using a <strong className="text-white">70/30 weight</strong> between structural criticality and operational health.
                            Assets with a Priority Index <span className="text-red-500">&gt; 85</span> trigger automatic resource dispatch warnings.
                        </p>
                        <div className="flex gap-3 font-mono text-[9px] uppercase tracking-wider">
                            <div className="px-2 py-1 bg-white/5 rounded border border-white/10 text-gray-400">Sync: Local DB</div>
                            <div className="px-2 py-1 bg-white/5 rounded border border-white/10 text-neon-purple">Algorithm: Weighted Risk</div>
                        </div>
                    </div>

                    {/* Resource Distribution */}
                    <div className="glass-card p-10 rounded-3xl relative overflow-hidden border border-white/5">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Layers className="w-32 h-32" />
                        </div>
                        <h4 className="text-sm font-black text-white uppercase mb-8 tracking-widest">Active Fleet Allocation</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {[
                                { label: 'Heavy Maintenance Units', value: 72, color: 'bg-neon-purple' },
                                { label: 'Personnel Dispatch', value: 85, color: 'bg-red-500' },
                            ].map((item) => (
                                <div key={item.label} className="space-y-3">
                                    <div className="flex justify-between text-[10px] uppercase font-mono text-gray-400">
                                        <span>{item.label}</span>
                                        <span className="text-white font-black">{item.value}%</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.value}%` }}
                                            className={`h-full ${item.color} shadow-[0_0_10px_currentColor]`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4">
                    <PriorityPanel />
                </div>
            </div>

            {/* Global Inventory with Pagination */}
            <div className="mt-16 space-y-6">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                            <Activity className="w-6 h-6 text-neon-purple" />
                            Global <span className="text-neon-purple">Incident</span> Inventory
                        </h3>
                        <p className="text-[10px] text-gray-500 font-mono tracking-widest mt-1 uppercase italic">Database Query Index | Total {assets?.length || 0} Units</p>
                    </div>

                    <div className="flex flex-wrap gap-4 w-full lg:w-auto">
                        <div className="glass-card flex-1 lg:flex-none flex items-center px-4 py-2 rounded-xl border-white/10 group focus-within:border-neon-purple/50">
                            <Search className="w-4 h-4 text-gray-500 mr-2" />
                            <input
                                type="text"
                                placeholder="Search inventory..."
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                className="bg-transparent border-none focus:ring-0 text-xs text-white font-mono w-full lg:w-48 placeholder:text-gray-700"
                            />
                        </div>

                        <div className="flex gap-2 p-1 glass-card rounded-xl border-white/5 shrink-0">
                            <ListFilter className="w-4 h-4 text-gray-600 self-center mx-2" />
                            {(['none', 'type', 'status'] as const).map((g) => (
                                <button
                                    key={g}
                                    onClick={() => { setGroupBy(g); setCurrentPage(1); }}
                                    className={`px-3 py-1.5 rounded-lg text-[9px] uppercase font-bold transition-all ${groupBy === g ? 'bg-neon-purple text-white shadow-lg shadow-purple-500/20' : 'text-gray-500 hover:text-white'}`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-12">
                    {Object.entries(groups).map(([groupTitle, groupAssets]: [string, any], idx) => {
                        const pageItems = getPaginatedItems(groupAssets);
                        if (pageItems.length === 0 && groupBy === 'none') {
                            return <div key="empty" className="glass-card p-20 text-center text-gray-600 font-mono uppercase text-xs">No records matching search query</div>;
                        }
                        if (pageItems.length === 0) return null;

                        return (
                            <motion.div
                                key={groupTitle}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                {groupBy !== 'none' && (
                                    <h5 className="text-[11px] font-black text-purple-400 uppercase tracking-[0.4em] mb-4 flex items-center gap-4">
                                        <div className="w-8 h-[2px] bg-neon-purple/20" />
                                        {groupTitle} ({groupAssets.length})
                                    </h5>
                                )}

                                <div className="glass-card rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                                    <div className="overflow-x-auto no-scrollbar">
                                        <table className="w-full text-left border-collapse">
                                            <thead className="bg-white/[0.02] border-b border-white/5">
                                                <tr>
                                                    {[
                                                        { key: 'asset_id', label: 'Unit ID' },
                                                        { key: 'name', label: 'Designation' },
                                                        { key: 'status', label: 'State' },
                                                        { key: 'progress', label: 'Health' },
                                                        { key: 'priority_score', label: 'Index' }
                                                    ].map((col) => (
                                                        <th
                                                            key={col.key}
                                                            onClick={() => handleSort(col.key)}
                                                            className="p-5 text-[10px] font-mono text-gray-500 uppercase tracking-widest cursor-pointer hover:text-white group"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                {col.label}
                                                                <ArrowUpDown className={`w-3 h-3 transition-opacity ${sortField === col.key ? 'text-neon-purple opacity-100' : 'opacity-10 group-hover:opacity-50'}`} />
                                                            </div>
                                                        </th>
                                                    ))}
                                                    <th className="p-5 text-right font-mono text-[10px] text-gray-500 uppercase tracking-widest">Control</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/[0.02]">
                                                {pageItems.map((asset: any) => (
                                                    <tr key={asset.asset_id} className="hover:bg-white/[0.03] transition-colors group/row">
                                                        <td className="p-5 font-mono text-[10px] text-neon-purple/80 group-hover/row:text-white">#{asset.asset_id}</td>
                                                        <td className="p-5">
                                                            <div className="flex flex-col">
                                                                <span className="text-sm font-bold text-white truncate max-w-[200px]">{asset.name}</span>
                                                                <span className="text-[9px] text-gray-600 uppercase font-black tracking-tighter">{asset.asset_type}</span>
                                                            </div>
                                                        </td>
                                                        <td className="p-5">
                                                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${asset.status.toLowerCase().includes('operational') ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                                    asset.status.toLowerCase().includes('severely') ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                                        'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                                                }`}>
                                                                {asset.status}
                                                            </span>
                                                        </td>
                                                        <td className="p-5">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                                                                    <div
                                                                        className={`h-full ${asset.progress > 80 ? 'bg-green-500' : asset.progress > 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                                        style={{ width: `${asset.progress}%` }}
                                                                    />
                                                                </div>
                                                                <span className="text-[10px] font-mono text-gray-500">{asset.progress}%</span>
                                                            </div>
                                                        </td>
                                                        <td className="p-5">
                                                            <span className={`text-xs font-black font-mono ${asset.priority_score > 80 ? 'text-red-500 text-glow' : 'text-white'}`}>
                                                                {Math.round(asset.priority_score)}
                                                            </span>
                                                        </td>
                                                        <td className="p-5 text-right">
                                                            <Link
                                                                href={`/admin?id=${asset.asset_id}`}
                                                                className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest text-gray-400 hover:bg-neon-purple hover:text-white transition-all whitespace-nowrap"
                                                            >
                                                                Override
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination (Only for 'none' grouping) */}
                                    {groupBy === 'none' && totalPages > 1 && (
                                        <div className="p-6 bg-white/[0.01] border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                                            <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                                                Page <span className="text-white">{currentPage}</span> / <span className="text-white">{totalPages}</span> | Global Units: <span className="text-neon-purple">{filteredAndSortedAssets.length}</span>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                                    disabled={currentPage === 1}
                                                    className="p-2 glass-card rounded-lg disabled:opacity-5 hover:bg-white/10 text-white"
                                                >
                                                    <ChevronLeft className="w-4 h-4" />
                                                </button>

                                                <div className="flex gap-1">
                                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                                        let pNum;
                                                        if (totalPages <= 5) pNum = i + 1;
                                                        else if (currentPage <= 3) pNum = i + 1;
                                                        else if (currentPage >= totalPages - 2) pNum = totalPages - 4 + i;
                                                        else pNum = currentPage - 2 + i;

                                                        return (
                                                            <button
                                                                key={pNum}
                                                                onClick={() => setCurrentPage(pNum)}
                                                                className={`w-8 h-8 rounded-lg text-[10px] font-mono font-bold transition-all ${currentPage === pNum ? 'bg-neon-purple text-white' : 'glass-card border-white/5 text-gray-500 hover:text-white'
                                                                    }`}
                                                            >
                                                                {pNum}
                                                            </button>
                                                        );
                                                    })}
                                                </div>

                                                <button
                                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                                    disabled={currentPage === totalPages}
                                                    className="p-2 glass-card rounded-lg disabled:opacity-5 hover:bg-white/10 text-white"
                                                >
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
