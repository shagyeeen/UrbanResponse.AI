'use client';

import { motion } from 'framer-motion';
import { Users, Target, Rocket, GraduationCap, Building2, UserCircle2 } from 'lucide-react';

const team = [
    { name: 'Sineshana S J', role: 'Project Lead and UI/UX' },
    { name: 'Tharikasini M S', role: 'Data Analyst' },
    { name: 'Shagin Dharshanth', role: 'Developer' }
];

export default function AboutPage() {
    return (
        <div className="space-y-16 pb-32">
            {/* Hero Section */}
            <section className="text-center space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border-neon-purple/20 text-neon-purple text-[10px] font-mono font-bold uppercase tracking-widest"
                >
                    <Rocket className="w-3 h-3" />
                    Powered by Urban Intelligence
                </motion.div>
                <h1 className="text-5xl font-black text-white tracking-tighter uppercase">
                    Our Vision & <span className="text-neon-purple text-glow">Mission</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed font-medium">
                    Powering the Future of Urban Intelligence. UrbanGuard AI is a demonstration of how modern technology
                    can safeguard the critical infrastructure that keeps our cities moving.
                </p>
            </section>

            {/* Team Collective */}
            <section className="glass-card p-12 rounded-[40px] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Building2 className="w-64 h-64 text-neon-purple" />
                </div>

                <div className="max-w-3xl space-y-6 relative z-10">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight">
                        Smart Nova <span className="text-neon-purple">Collective</span>
                    </h2>
                    <p className="text-gray-400 leading-relaxed italic text-lg">
                        "Project Architecture & Execution"
                    </p>
                    <p className="text-gray-400 leading-relaxed text-sm">
                        Formed at the intersection of innovation and urban resilience, <strong>Smart Nova</strong> is a specialized collective from
                        <strong> Sri Krishna College of Technology</strong>, dedicated to engineering the next generation of smart city infrastructure.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 relative z-10">
                    {team.map((member, i) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 glass-card rounded-2xl border-white/5 hover:border-neon-purple/30 transition-all flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-neon-purple/10 flex items-center justify-center text-neon-purple mb-4">
                                <UserCircle2 className="w-8 h-8" />
                            </div>
                            <h4 className="text-lg font-bold text-white">{member.name}</h4>
                            <p className="text-xs text-purple-400 font-mono mt-2 uppercase tracking-widest">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Academic Excellence & Values */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section className="glass-card p-10 rounded-3xl space-y-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <GraduationCap className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">Academic Excellence</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        As students of the Information Technology department, we continuously explore modern tools and technologies
                        to create useful and user-friendly digital applications. This project is a part of our effort to gain
                        hands-on experience and contribute meaningful ideas through technology.
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        We are passionate about learning new technologies and applying them to build practical solutions
                        that can help people in their daily lives. Through this project, we aim to demonstrate our skills in
                        web development, problem solving, and innovative thinking.
                    </p>
                </section>

                <section className="glass-card p-10 rounded-3xl space-y-8">
                    <div className="w-12 h-12 rounded-xl bg-neon-purple/20 flex items-center justify-center text-neon-purple">
                        <Target className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">Our Core Values</h3>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-1 h-12 bg-neon-purple rounded-full shrink-0" />
                            <div>
                                <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-1">Innovation First</h4>
                                <p className="text-gray-500 text-[11px] leading-relaxed italic">"Pushing the boundaries of what's possible with AI and real-time data."</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-1 h-12 bg-blue-500 rounded-full shrink-0" />
                            <div>
                                <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-1">Resilience Build</h4>
                                <p className="text-gray-500 text-[11px] leading-relaxed italic">"Building tools to protect and optimize the cities of tomorrow."</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-1 h-12 bg-lavender rounded-full shrink-0" />
                            <div>
                                <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-1">Institutional Pride</h4>
                                <p className="text-gray-500 text-[11px] leading-relaxed italic">"Proudly representing Sri Krishna College of Technology, Coimbatore."</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Footer Institution */}
            <footer className="text-center py-12 border-t border-white/5">
                <p className="text-[10px] text-gray-600 font-mono tracking-[0.5em] uppercase">
                    Sri Krishna College of Technology, Coimbatore © 2026
                </p>
            </footer>
        </div>
    );
}
