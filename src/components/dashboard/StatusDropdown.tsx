'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, Shield, AlertTriangle, Zap, Activity, ShieldAlert } from 'lucide-react';
import { createPortal } from 'react-dom';

interface StatusDropdownProps {
    value: string;
    onChange: (value: string) => void;
    options: string[];
}

export default function StatusDropdown({ value, onChange, options }: StatusDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [dropUp, setDropUp] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        const handleScroll = () => setIsOpen(false);

        if (isOpen) {
            window.addEventListener('scroll', handleScroll, true);
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            window.removeEventListener('scroll', handleScroll, true);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleToggle = () => {
        if (!isOpen && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const menuHeight = 220;

            setDropUp(spaceBelow < menuHeight);
            setCoords({
                top: rect.top,
                left: rect.left,
                width: rect.width
            });
        }
        setIsOpen(!isOpen);
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Operational':
                return {
                    bg: 'bg-green-500/20',
                    text: 'text-green-400',
                    border: 'border-green-500/50',
                    glow: 'shadow-[0_0_15px_rgba(34,197,94,0.3)]',
                    icon: Activity
                };
            case 'Severely Damaged':
                return {
                    bg: 'bg-red-500/20',
                    text: 'text-red-400',
                    border: 'border-red-500/50',
                    glow: 'shadow-[0_0_15px_rgba(239,68,68,0.3)]',
                    icon: ShieldAlert
                };
            case 'Maintenance':
                return {
                    bg: 'bg-yellow-500/25',
                    text: 'text-yellow-400',
                    border: 'border-yellow-500/50',
                    glow: 'shadow-[0_0_15px_rgba(234,179,8,0.3)]',
                    icon: Shield
                };
            case 'Under Repair':
                return {
                    bg: 'bg-orange-500/20',
                    text: 'text-orange-400',
                    border: 'border-orange-500/50',
                    glow: 'shadow-[0_0_15px_rgba(249,115,22,0.3)]',
                    icon: Zap
                };
            case 'Faulty':
                return {
                    bg: 'bg-purple-500/20',
                    text: 'text-purple-400',
                    border: 'border-purple-500/50',
                    glow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]',
                    icon: AlertTriangle
                };
            default:
                return {
                    bg: 'bg-white/10',
                    text: 'text-gray-200',
                    border: 'border-white/20',
                    glow: '',
                    icon: Shield
                };
        }
    };

    const currentStyles = getStatusStyles(value);
    const StatusIcon = currentStyles.icon;

    const dropdownMenu = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: dropUp ? 5 : -5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: dropUp ? 5 : -5 }}
                    style={{
                        position: 'fixed',
                        top: dropUp ? coords.top - 5 : coords.top + (containerRef.current?.offsetHeight || 0) + 5,
                        left: coords.left,
                        width: coords.width,
                        transform: dropUp ? 'translateY(-100%)' : 'none',
                    }}
                    className="z-[99999] rounded-xl border border-white/20 p-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden bg-[#1A0B2E] border-opacity-30 backdrop-blur-2xl"
                >
                    {options.map((opt) => {
                        const optStyles = getStatusStyles(opt);
                        const OptIcon = optStyles.icon;
                        const isSelected = opt === value;

                        return (
                            <button
                                key={opt}
                                onClick={() => {
                                    onChange(opt);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-200 mb-1 last:mb-0 ${isSelected
                                    ? `${optStyles.bg} ${optStyles.text} border border-white/10`
                                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <div className="flex items-center gap-2.5">
                                    <OptIcon className={`w-3.5 h-3.5 ${isSelected ? optStyles.text : 'text-gray-500'}`} />
                                    {opt}
                                </div>
                                {isSelected && <Check className="w-3 h-3" />}
                            </button>
                        );
                    })}
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <div className="relative inline-block w-44" ref={containerRef}>
            <button
                onClick={handleToggle}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${currentStyles.bg} ${currentStyles.text} ${currentStyles.border} ${currentStyles.glow} hover:bg-opacity-40 active:scale-95`}
            >
                <div className="flex items-center gap-2">
                    <StatusIcon className="w-3.5 h-3.5" />
                    <span>{value}</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {mounted && typeof document !== 'undefined' && createPortal(dropdownMenu, document.body)}
        </div>
    );
}
