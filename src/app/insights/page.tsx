'use client';

import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, AlertCircle, CheckCircle2, Zap } from 'lucide-react';
import { generateInsightPDF } from '@/utils/pdfGenerator';

export default function AIInsights() {
    const insights = [
        {
            title: "Monsoon Preparedness Warning",
            description: "Atmospheric simulation predicts high rainfall in T Nagar. Current drainage progress at 70% may be insufficient. Recommendation: Deploy additional maintenance teams.",
            severity: "high",
            icon: AlertCircle
        },
        {
            title: "Traffic Node Optimization",
            description: "Guindy Junction signals are syncing with 85% efficiency. AI suggests recalibrating phase timings for evening peak (17:00-20:00).",
            severity: "medium",
            icon: Zap
        },
        {
            title: "Structural Integrity Status",
            description: "Adyar Bridge sensors report minimal vibration delta. No immediate structural reinforcement required despite recent high-load transport.",
            severity: "safe",
            icon: CheckCircle2
        }
    ];

    return (
        <div className="space-y-8">
            <div className="mb-12">
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">AI Data <span className="text-neon-purple uppercase">Synthesizer</span></h2>
                <p className="text-[10px] text-gray-400 font-mono tracking-widest mt-1">REAL-TIME INFRASTRUCTURE ANALYSIS ENGINE | CHENNAI UNIT v4.2</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {insights.map((insight, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`glass-card p-6 rounded-2xl border-t-4 ${insight.severity === 'high' ? 'border-t-red-500' :
                            insight.severity === 'medium' ? 'border-t-yellow-500' :
                                'border-t-green-500'
                            }`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-2 rounded-lg ${insight.severity === 'high' ? 'bg-red-500/10 text-red-500' :
                                insight.severity === 'medium' ? 'bg-yellow-500/10 text-yellow-500' :
                                    'bg-green-500/10 text-green-500'
                                }`}>
                                <insight.icon className="w-6 h-6" />
                            </div>
                            <Sparkles className="w-4 h-4 text-neon-purple animate-pulse" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{insight.title}</h3>
                        <p className="text-xs text-gray-400 leading-relaxed italic">"{insight.description}"</p>

                        <div className="mt-6 flex items-center justify-between">
                            <span className="text-[10px] text-gray-500 uppercase font-mono tracking-tighter">Confidence Score</span>
                            <span className="text-xs font-bold text-neon-purple">98.2%</span>
                        </div>
                        <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '98%' }}
                                className="h-full bg-neon-purple shadow-[0_0_10px_#A855F7]"
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="glass-card p-8 rounded-2xl mt-12 bg-gradient-to-br from-deep-purple/5 to-neon-purple/5 border border-purple-500/10 overflow-hidden relative group">
                <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto py-12">
                    <TrendingUp className="w-12 h-12 text-neon-purple mb-6 animate-bounce" />
                    <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tight">Predictive Growth Model</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-8">
                        Our neural model suggests that normalizing response times across Adyar and Velachery will improve local infrastructure longevity by <strong>14%</strong> over the next 24 months.
                    </p>
                    <button
                        onClick={() => {
                            const data = insights.map(i => ({
                                title: i.title,
                                description: i.description,
                                severity: i.severity,
                                confidence: "98.2%"
                            }));
                            generateInsightPDF(data);
                        }}
                        className="px-8 py-3 bg-neon-purple text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all active:scale-95"
                    >
                        Generate Quarterly Projection
                    </button>
                </div>

                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Sparkles size={180} />
                </div>
                <div className="absolute bottom-4 left-4 p-4 opacity-5">
                    <TrendingUp size={120} />
                </div>
            </div>
        </div>
    );
}
