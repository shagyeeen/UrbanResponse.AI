'use client';

import { motion } from 'framer-motion';
import { Settings, Save, RefreshCcw, Bell, Shield, Zap, Info } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
    const [syncFreq, setSyncFreq] = useState('15s');
    const [threshold, setThreshold] = useState(80);
    const [notifications, setNotifications] = useState(true);

    return (
        <div className="space-y-12 pb-32">
            <header className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                        <Settings className="w-8 h-8 text-neon-purple animate-spin-slow" />
                        System <span className="text-neon-purple text-glow">Settings</span>
                    </h2>
                    <p className="text-[10px] text-gray-400 font-mono tracking-widest mt-1 uppercase">CONTROL CENTER | CONFIGURATION PANEL v1.4</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-neon-purple text-white text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all active:scale-95">
                    <Save className="w-4 h-4" />
                    Save Changes
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Real-time Data Settings */}
                <section className="glass-card p-10 rounded-3xl space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <RefreshCcw className="w-32 h-32 text-white" />
                    </div>
                    <div className="flex items-center gap-3 text-neon-purple">
                        <RefreshCcw className="w-5 h-5" />
                        <h3 className="text-sm font-black uppercase tracking-widest">Telemetry Sync Control</h3>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Data Refresh Interval</label>
                            <div className="grid grid-cols-4 gap-3">
                                {['5s', '15s', '60s', '5m'].map((freq) => (
                                    <button
                                        key={freq}
                                        onClick={() => setSyncFreq(freq)}
                                        className={`px-4 py-3 rounded-xl border text-[11px] font-bold transition-all ${syncFreq === freq ? 'bg-neon-purple/20 border-neon-purple text-white' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                                            }`}
                                    >
                                        {freq}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-end">
                                <label className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Critical Alert Threshold</label>
                                <span className="text-xs font-bold text-neon-purple font-mono">{threshold}%</span>
                            </div>
                            <input
                                type="range"
                                min="50"
                                max="95"
                                value={threshold}
                                onChange={(e) => setThreshold(parseInt(e.target.value))}
                                className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-neon-purple"
                            />
                            <p className="text-[9px] text-gray-600 font-mono italic mt-1 leading-relaxed">
                                Assets exceeding this criticality level will trigger priority level 1 alerts in the command hub.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Security & Alerts */}
                <section className="glass-card p-10 rounded-3xl space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5 text-red-500">
                        <Shield className="w-32 h-32" />
                    </div>
                    <div className="flex items-center gap-3 text-red-500">
                        <Shield className="w-5 h-5" />
                        <h3 className="text-sm font-black uppercase tracking-widest">Alert Protocols</h3>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 glass-card rounded-2xl border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                                    <Bell className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-white uppercase tracking-widest">Global Broadcasts</h4>
                                    <p className="text-[9px] text-gray-500 font-mono">Real-time systemic failure notifications</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setNotifications(!notifications)}
                                className={`w-12 h-6 rounded-full relative transition-all ${notifications ? 'bg-red-500' : 'bg-white/10'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifications ? 'right-1' : 'left-1'}`} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 glass-card rounded-2xl border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-white uppercase tracking-widest">AI Prediction Feed</h4>
                                    <p className="text-[9px] text-gray-500 font-mono">Stream autonomous risk projections</p>
                                </div>
                            </div>
                            <button className="w-12 h-6 rounded-full bg-yellow-500 relative">
                                <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* System Information */}
                <section className="lg:col-span-2 glass-card p-10 rounded-3xl space-y-8 relative overflow-hidden border-t-4 border-t-neon-purple">
                    <div className="flex items-center gap-3 text-gray-400 font-mono uppercase text-xs tracking-[0.3em]">
                        <Info className="w-4 h-4" />
                        Core Engine Diagnostic
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 font-mono text-[10px]">
                        <div className="space-y-1">
                            <span className="text-gray-600 block uppercase">Encryption Strength</span>
                            <span className="text-white font-bold uppercase shadow-[0_0_10px_rgba(255,255,255,0.1)] px-2 py-0.5 rounded bg-white/5 border border-white/10 inline-block mt-1">AES-4096v Quantum-Secure</span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-gray-600 block uppercase">Signal Integrity</span>
                            <span className="text-green-500 font-black uppercase text-glow">100.00% Stable</span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-gray-600 block uppercase">Region Latency</span>
                            <span className="text-white font-bold uppercase transition-all hover:text-neon-purple cursor-default">CHENNAI_METRO_LINK [0.4ms]</span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-gray-600 block uppercase">Active Sensor Grid</span>
                            <span className="text-neon-purple font-black uppercase text-glow tracking-widest">12,482 NODES ONLINE</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
