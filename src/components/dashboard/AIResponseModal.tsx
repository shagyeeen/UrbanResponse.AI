'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Brain, Clock, ShieldCheck, Hammer, Send, AlertTriangle } from 'lucide-react';

interface AIResponseModalProps {
    isOpen: boolean;
    onClose: () => void;
    response: string;
    assetName: string;
}

export default function AIResponseModal({ isOpen, onClose, response, assetName }: AIResponseModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-2xl glass-card rounded-[32px] overflow-hidden border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.2)]"
                >
                    <div className="p-8 space-y-6">
                        <header className="flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                                    <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                                    AI <span className="text-neon-purple">Strategic</span> Response
                                </h3>
                                <p className="text-[10px] text-gray-500 font-mono tracking-widest mt-1 uppercase">
                                    Strategic Mitigation for: <span className="text-white">{assetName}</span>
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/5 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </header>

                        <div className="max-h-[60vh] overflow-y-auto no-scrollbar space-y-6 pr-4">
                            <div className="prose prose-invert prose-xs max-w-none prose-p:text-gray-400 prose-headings:text-white prose-headings:font-black prose-headings:uppercase prose-headings:tracking-widest prose-headings:text-[11px] prose-strong:text-neon-purple">
                                <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/5 whitespace-pre-line leading-relaxed text-xs">
                                    {response || "Generating tactical response..."}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 glass-card rounded-2xl border-white/5 flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-neon-purple" />
                                    <div className="flex flex-col">
                                        <span className="text-[8px] text-gray-500 uppercase font-mono">ESTIMATED WINDOW</span>
                                        <span className="text-[10px] text-white font-bold">Priority-v4.1 Calculation</span>
                                    </div>
                                </div>
                                <div className="p-4 glass-card rounded-2xl border-white/5 flex items-center gap-3">
                                    <ShieldCheck className="w-5 h-5 text-green-500" />
                                    <div className="flex flex-col">
                                        <span className="text-[8px] text-gray-500 uppercase font-mono">SAFETY PROTOCOL</span>
                                        <span className="text-[10px] text-white font-bold">Standard Urban-Guard AI</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <footer className="pt-4 border-t border-white/5 flex justify-end">
                            <button
                                onClick={onClose}
                                className="px-6 py-2.5 rounded-full bg-neon-purple text-white text-[10px] font-black uppercase tracking-widest hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all active:scale-95"
                            >
                                Acknowledge Strategy
                            </button>
                        </footer>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
