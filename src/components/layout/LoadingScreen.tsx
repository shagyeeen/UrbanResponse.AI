'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const loadingSteps = [
    "Initializing City Intelligence Network...",
    "Connecting Infrastructure Data Streams...",
    "Analyzing Chennai Urban Assets...",
];

export default function LoadingScreen() {
    const [step, setStep] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const stepInterval = setInterval(() => {
            setStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
        }, 1500);

        const loaderTimeout = setTimeout(() => {
            setIsVisible(false);
        }, 5000);

        return () => {
            clearInterval(stepInterval);
            clearTimeout(loaderTimeout);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-[#0a0515] flex flex-col items-center justify-center"
        >
            {/* Neural Network Pattern Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0,transparent_70%)]" />
                <svg className="w-full h-full">
                    <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                        <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(168,85,247,0.1)" strokeWidth="0.5" />
                        <circle cx="0" cy="0" r="1.5" fill="rgba(168,85,247,0.2)" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Futuristic Logo Design */}
            <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="relative mb-12"
            >
                <div className="w-32 h-32 rounded-3xl border-2 border-neon-purple glass-panel flex items-center justify-center rotate-45 shadow-[0_0_50px_rgba(168,85,247,0.4)]">
                    <div className="-rotate-45 text-4xl font-black text-white text-glow">
                        UA
                    </div>
                </div>
                <div className="absolute -inset-4 border border-lavender/30 rounded-[40px] animate-ping opacity-20" />
            </motion.div>

            <div className="max-w-md w-full px-8 text-center space-y-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
                    URBAN RESPONSE.AI
                </h2>

                <div className="h-1 bg-white/5 rounded-full overflow-hidden relative">
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '0%' }}
                        transition={{ duration: 4.5, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-r from-deep-purple to-neon-purple shadow-[0_0_15px_rgba(168,85,247,1)]"
                    />
                </div>

                <AnimatePresence mode="wait">
                    <motion.p
                        key={step}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-xs font-mono text-purple-400 tracking-widest uppercase"
                    >
                        {loadingSteps[step]}
                    </motion.p>
                </AnimatePresence>
            </div>

            {/* Floating Particles Simulation */}
            <div className="absolute inset-x-0 bottom-20 flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ scaleY: [1, 2, 1], opacity: [0.2, 0.8, 0.2] }}
                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                        className="w-0.5 h-12 bg-neon-purple blur-[1px]"
                    />
                ))}
            </div>
        </motion.div>
    );
}
