'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAssetStore } from '@/store/useAssetStore';
import StatCard from '@/components/dashboard/StatCard';
import PriorityPanel from '@/components/dashboard/PriorityPanel';
import ChennaiHeatmap from '@/components/dashboard/Heatmap';
import AssetGrid from '@/components/dashboard/AssetGrid';
import {
  Waves,
  TrafficCone,
  Lightbulb,
  Droplet,
  Zap,
  Shield,
  BarChart3,
  Sparkles,
  Search,
  Bell,
  LayoutDashboard,
  Construction as BridgeIcon,
  Route,
  Activity,
  ShieldCheck
} from 'lucide-react';
import Papa from 'papaparse';

type TabType = 'OVERVIEW' | 'Bridge' | 'Road' | 'Drainage' | 'Pipeline' | 'Street Light' | 'Traffic Light';

export default function Dashboard() {
  const { assets, setAssets, recalculatePriority } = useAssetStore();
  const [activeTab, setActiveTab] = useState<TabType>('OVERVIEW');

  useEffect(() => {
    const loadCSV = async () => {
      try {
        const response = await fetch('/data/chennai-infrastructure.csv');
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results: Papa.ParseResult<any>) => {
            setAssets(results.data as any[]);
            recalculatePriority();
          },
        });
      } catch (err) {
        console.error("CSV Loading Error:", err);
      }
    };
    loadCSV();
  }, [setAssets, recalculatePriority]);

  const tabs: { type: TabType; label: string; icon: any }[] = [
    { type: 'OVERVIEW', label: 'Overview', icon: LayoutDashboard },
    { type: 'Bridge', label: 'Bridges', icon: BridgeIcon },
    { type: 'Road', label: 'Roadways', icon: Route },
    { type: 'Drainage', label: 'Drainage', icon: Waves },
    { type: 'Pipeline', label: 'Pipelines', icon: Droplet },
    { type: 'Street Light', label: 'Lighting', icon: Lightbulb },
    { type: 'Traffic Light', label: 'Traffic Hubs', icon: Zap },
  ];

  const getAssetCount = (type: string) => assets.filter(a => a.asset_type === type).length;

  return (
    <div className="space-y-8 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-neon-purple animate-pulse shadow-[0_0_10px_#A855F7]" />
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">Global Status: YELLOW STANDBY</span>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tight uppercase">
            CHENNAI OPS <span className="text-neon-purple text-glow">COMMAND</span>
          </h2>
          <p className="text-gray-400 font-mono text-[10px] mt-2 tracking-wider">
            SYSTEM-WIDE SCAN COMPLETE | DATA SYNC STATUS: CSV-NATIVE ({assets.length} ASSETS)
          </p>
        </motion.div>

        <div className="flex gap-4">
          <div className="glass-card flex items-center px-4 py-2 rounded-full border-purple-500/20 group">
            <Search className="w-4 h-4 text-purple-400 group-focus-within:text-neon-purple transition-all" />
            <input
              type="text"
              placeholder="Query Assets..."
              className="bg-transparent border-none focus:ring-0 text-xs w-32 placeholder:text-gray-600 font-mono text-white ml-2"
            />
          </div>
          <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center border-purple-500/20 relative cursor-pointer hover:bg-neon-purple/20 transition-all">
            <Bell className="w-5 h-5 text-purple-400" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1A0B2E] animate-pulse" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.type;
          const count = getAssetCount(tab.type);
          return (
            <button
              key={tab.type}
              onClick={() => setActiveTab(tab.type)}
              className={`flex items-center gap-3 px-6 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 relative ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
            >
              <tab.icon className={`w-4 h-4 ${isActive ? 'text-neon-purple' : 'text-gray-600'}`} />
              <span className="text-xs font-bold uppercase tracking-widest">{tab.label}</span>
              {tab.type !== 'OVERVIEW' && count > 0 && (
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${isActive ? 'bg-neon-purple text-white' : 'bg-white/5 text-gray-500'}`}>
                  {count}
                </span>
              )}
              {isActive && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-purple-500/10 border border-purple-500/20 rounded-full -z-10 shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'OVERVIEW' ? (
          <motion.div
            key="overview"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex flex-col items-center justify-center py-32 glass-card rounded-3xl border border-dashed border-white/10"
          >
            <div className="w-16 h-16 rounded-full bg-neon-purple/10 flex items-center justify-center text-neon-purple mb-6 animate-pulse">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tighter">Strategic Overview Platform</h3>
            <p className="text-gray-500 text-sm max-w-lg text-center font-mono uppercase tracking-[0.2em] leading-relaxed px-4">
              Universal monitoring engaged. Please select a specific infrastructure sector above for granular telemetry or use the sidebar to access spatial risk overlays and incident priority queues.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-3 lowercase">
                  <Activity className="w-5 h-5 text-neon-purple" />
                  {activeTab} stats
                </h3>
                <p className="text-[10px] text-gray-400 font-mono tracking-widest mt-1">REAL-TIME TELEMETRY STREAM | ACTIVE RESPONSE STATUS</p>
              </div>
              <div className="flex gap-3">
                <div className="px-4 py-2 glass-card rounded-lg text-[10px] font-mono font-bold text-green-400">STATUS: OPTIMAL</div>
              </div>
            </div>
            <AssetGrid assets={assets} type={activeTab} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
