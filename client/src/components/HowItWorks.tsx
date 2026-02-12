"use client";

import { motion } from "framer-motion";
import { ListChecks, Zap, Mail, Download } from "lucide-react";

export default function HowItWorks() {
    const steps = [
        {
            icon: <ListChecks size={32} />,
            title: "1. Remplissez",
            desc: "Complétez le formulaire avec vos informations en quelques secondes.",
        },
        {
            icon: <Zap size={32} />,
            title: "2. Générez",
            desc: "Notre système crée votre document instantanément.",
        },
        {
            icon: <Mail size={32} />,
            title: "3. Recevez",
            desc: "Obtenez votre attestation signée directement par email.",
        },
    ];

    return (
        <section id="how-it-works" className="container py-20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--accent)] opacity-5 blur-[100px] rounded-full pointer-events-none" />

            <div className="text-center mb-16 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Comment ça marche ?</h2>
                <p className="text-[var(--muted)] max-w-2xl mx-auto">
                    Un processus simplifié pour vous faire gagner du temps.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {steps.map((step, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.2 }}
                        className="glass-panel p-8 text-center flex flex-col items-center hover:bg-[rgba(255,255,255,0.03)] transition-colors border-t border-[rgba(255,255,255,0.1)]"
                    >
                        <div className="mb-6 p-4 rounded-full bg-[rgba(255,255,255,0.05)] text-[var(--primary)] border border-[rgba(255,255,255,0.1)] shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                            {step.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                        <p className="text-[var(--muted)]">{step.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
