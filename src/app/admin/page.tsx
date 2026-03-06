'use client';

import { motion } from 'framer-motion';
import { useAssetStore } from '@/store/useAssetStore';
import { RefreshCcw, Search, X, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import StatusDropdown from '@/components/dashboard/StatusDropdown';

function AdminPanelContent() {
    const { assets, updateAsset, recalculatePriority, syncWithCSV, isSyncing } = useAssetStore();
    const searchParams = useSearchParams();
    const highlightId = searchParams.get('id');

    const [searchTerm, setSearchTerm] = useState(highlightId || '');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const statuses = [
        'Operational',
        'Maintenance',
        'Under Repair',
        'Faulty',
        'Severely Damaged'
    ];

    const handleUpdate = (id: string, field: string, value: string | number) => {
        updateAsset(id, { [field]: value });
    };

    const filteredAssets = assets?.filter(a =>
        a.asset_id?.toString().includes(searchTerm) ||
        a.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.asset_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.status?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);
    const paginatedAssets = filteredAssets.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset to page 1 when search changing
    const handleSearchChange = (val: string) => {
        setSearchTerm(val);
        setCurrentPage(1);
    };

    return (
        <div className="space-y-8 pb-32">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                        {highlightId ? <AlertCircle className="text-red-500 w-8 h-8 animate-pulse" /> : null}
                        Internal <span className="text-neon-purple">Override</span> Console
                    </h2>
                    <p className="text-[10px] text-gray-400 font-mono tracking-widest mt-1 uppercase italic">
                        {highlightId ? `URGENT RESPONSE MODE: EDITING UNIT_ID ${highlightId}` : 'INFRASTRUCTURE MODIFICATION INTERFACE'}
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="glass-card flex items-center px-4 py-2 rounded-xl border-white/10">
                        <Search className="w-4 h-4 text-gray-500 mr-2" />
                        <input
                            type="text"
                            placeholder="Filter by ID/Name..."
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="bg-transparent border-none focus:ring-0 text-xs text-white placeholder:text-gray-600 font-mono"
                        />
                        {searchTerm && (
                            <button onClick={() => handleSearchChange('')}><X className="w-3 h-3 text-gray-500" /></button>
                        )}
                    </div>
                    <button
                        onClick={async () => {
                            recalculatePriority();
                            try {
                                await syncWithCSV();
                                alert('Global Infrastructure Database Synchronized Successfully.');
                            } catch (e) {
                                alert('Synchronization Failed. Please check system logs.');
                            }
                        }}
                        disabled={isSyncing}
                        className={`flex items-center gap-2 px-4 py-2 glass-card rounded-xl text-xs font-bold text-white transition-all border-purple-500/20 group ${isSyncing ? 'opacity-50 cursor-wait' : 'hover:bg-neon-purple/20'}`}
                    >
                        <RefreshCcw className={`w-4 h-4 text-neon-purple ${isSyncing ? 'animate-spin' : 'group-active:rotate-180 transition-transform'}`} />
                        {isSyncing ? 'Syncing...' : 'Sync All'}
                    </button>
                </div>
            </div>

            <div className="glass-card rounded-[32px] overflow-hidden border border-white/5 shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/5">
                                <th className="p-5 text-[10px] font-mono text-gray-500 uppercase tracking-widest">Asset Details</th>
                                <th className="p-5 text-[10px] font-mono text-gray-500 uppercase tracking-widest">Location</th>
                                <th className="p-5 text-[10px] font-mono text-gray-500 uppercase tracking-widest">Global Status</th>
                                <th className="p-5 text-[10px] font-mono text-gray-500 uppercase tracking-widest">Criticality</th>
                                <th className="p-5 text-[10px] font-mono text-gray-500 uppercase tracking-widest text-right">Priority Score</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {paginatedAssets.map((asset) => {
                                const isHighlighted = highlightId === asset.asset_id.toString();
                                return (
                                    <motion.tr
                                        key={asset.asset_id}
                                        layout
                                        className={`${isHighlighted ? 'bg-neon-purple/20 border-l-4 border-l-neon-purple shadow-[inset_0_0_20px_rgba(168,85,247,0.1)]' : 'hover:bg-white/5 transition-colors'} group`}
                                    >
                                        <td className="p-5">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-gray-600 uppercase font-black tracking-tight">{asset.asset_type}</span>
                                                <span className="text-sm font-bold text-white">{asset.name}</span>
                                                <span className="text-[9px] font-mono text-purple-500/60 mt-0.5">#{asset.asset_id}</span>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <span className="text-xs text-gray-400 font-medium">{asset.location}</span>
                                        </td>
                                        <td className="p-5">
                                            <StatusDropdown
                                                value={asset.status}
                                                options={statuses}
                                                onChange={(val) => handleUpdate(asset.asset_id, 'status', val)}
                                            />
                                        </td>
                                        <td className="p-5 tabular-nums">
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex justify-between text-[9px] font-mono">
                                                    <span className="text-gray-600">CRITICALITY</span>
                                                    <span className="text-white">{asset.criticality}%</span>
                                                </div>
                                                <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                                                    <div className="h-full bg-deep-purple" style={{ width: `${asset.criticality}%` }} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5 text-right font-mono">
                                            <span className={`text-sm font-black ${asset.priority_rank === 1 ? 'text-red-500 text-glow' : 'text-neon-purple'}`}>
                                                {Math.round(asset.priority_score)}
                                            </span>
                                            <span className="text-[10px] text-gray-600 ml-2">RANK #{asset.priority_rank}</span>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="px-6 py-4 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                            Showing {Math.min(filteredAssets.length, (currentPage - 1) * itemsPerPage + 1)} - {Math.min(filteredAssets.length, currentPage * itemsPerPage)} of {filteredAssets.length} Units
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-lg glass-card border-white/10 text-white transition-all ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-neon-purple/20'}`}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <div className="px-4 py-2 glass-card rounded-xl border-white/10 text-[10px] font-black text-white uppercase tracking-widest">
                            Page <span className="text-neon-purple text-glow">{currentPage}</span> <span className="text-gray-600">of</span> {totalPages || 1}
                        </div>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className={`p-2 rounded-lg glass-card border-white/10 text-white transition-all ${currentPage === totalPages || totalPages === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-neon-purple/20'}`}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 p-8 glass-card rounded-3xl border-l-4 border-l-neon-purple relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <RefreshCcw className="w-32 h-32" />
                </div>
                <div className="w-12 h-12 rounded-2xl bg-neon-purple/10 flex items-center justify-center text-neon-purple shrink-0">
                    <RefreshCcw className="w-6 h-6 animate-spin-slow" />
                </div>
                <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-widest">Autonomous Sync engaged</h4>
                    <p className="text-[11px] text-gray-500 font-mono tracking-tight max-w-xl italic mt-1 leading-relaxed">
                        Changes made in this terminal will auto-propagate to the global Chennai infrastructure grid. Asset progress is re-mapped based on status changes, and priority rankings are recalculated in real-time using the priority-v4.1 algorithm.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function AdminPanel() {
    return (
        <Suspense fallback={<div className="text-white font-mono p-8">Loading Override Console...</div>}>
            <AdminPanelContent />
        </Suspense>
    );
}
