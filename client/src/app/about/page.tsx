"use client";

import { motion } from "framer-motion";
import { CheckCircle, Users, Globe, Award } from "lucide-react";
import Link from "next/link";


export default function AboutPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="container py-20">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto"
            >
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Notre Mission : <br />
                        <span className="text-gradient">Simplifier l'Administratif</span>
                    </h1>
                    <p className="text-xl text-[var(--muted)]">
                        JL Cloud est né d'un constat simple : obtenir des documents administratifs ne devrait jamais être une corvée.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <div className="glass-panel p-8">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <Globe className="text-[var(--primary)]" />
                            Une Vision Moderne
                        </h2>
                        <p className="text-[var(--muted)] leading-relaxed">
                            Nous croyons en un monde où la bureaucratie est invisible. Grâce à l'automatisation intelligente et à la sécurité de pointe, nous transformons des processus complexes en actions simples et instantanées.
                        </p>
                    </div>
                    <div className="glass-panel p-8">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <Users className="text-[var(--accent)]" />
                            Pour Tous
                        </h2>
                        <p className="text-[var(--muted)] leading-relaxed">
                            Que vous soyez un particulier ayant besoin d'un justificatif urgent, ou une entreprise gérant des centaines de collaborateurs, Attestio est conçu pour vous faire gagner un temps précieux.
                        </p>
                    </div>
                </motion.div>

                {/* Values Section */}
                <motion.div variants={itemVariants} className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-10">Nos Valeurs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "Transparence", desc: "Aucun frais caché, aucune donnée revendue." },
                            { title: "Rapidité", desc: "Le temps est votre ressource la plus précieuse." },
                            { title: "Excellence", desc: "Des documents conformes aux standards les plus stricts." }
                        ].map((val, idx) => (
                            <div key={idx} className="p-6 rounded-lg border border-[var(--border)] bg-[rgba(255,255,255,0.02)] text-center">
                                <Award className="mx-auto mb-4 text-[var(--foreground)]" size={32} />
                                <h3 className="text-xl font-semibold mb-2">{val.title}</h3>
                                <p className="text-sm text-[var(--muted)]">{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div variants={itemVariants} className="text-center p-12 glass-panel border-[var(--primary)] border-opacity-30 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[var(--primary)] opacity-5 pointer-events-none" />
                    <h2 className="text-3xl font-bold mb-6">Prêt à gagner du temps ?</h2>
                    <p className="text-[var(--muted)] mb-8 max-w-lg mx-auto">
                        Rejoignez les milliers d'utilisateurs qui ont déjà simplifié leur vie administrative avec Attestio.
                    </p>
                    <Link href="/#generate" className="btn btn-primary">
                        Générer mon attestation maintenant
                    </Link>
                </motion.div>

            </motion.div>
        </div>
    );
}
