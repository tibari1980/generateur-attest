"use client";

import { Clock, Shield, FileCheck, Zap, Globe, Lock } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useRef, useState } from "react";

const features = [
    {
        icon: Clock,
        color: "#6366f1",
        title: "Génération Instantanée",
        description: "Vos documents prêts en moins de 5 secondes. Fini les délais interminables et les files d'attente.",
    },
    {
        icon: Shield,
        color: "#8b5cf6",
        title: "Sécurité Maximale",
        description: "Chiffrement de bout en bout. Vos données personnelles ne sont jamais stockées ni partagées.",
    },
    {
        icon: FileCheck,
        color: "#10b981",
        title: "Juridiquement Conforme",
        description: "Modèles validés par des experts juridiques et acceptés par toutes les institutions françaises.",
    },
    {
        icon: Globe,
        color: "#3b82f6",
        title: "Accessible Partout",
        description: "Disponible 24h/24, 7j/7, depuis n'importe quel appareil. Ordinateur, tablette ou mobile.",
    },
    {
        icon: Lock,
        color: "#f59e0b",
        title: "Conforme RGPD",
        description: "Aucune donnée collectée sans votre consentement. Respect total de votre vie privée.",
    },
    {
        icon: Zap,
        color: "#ef4444",
        title: "Sans Inscription",
        description: "Commencez immédiatement. Aucun compte requis pour générer votre premier document.",
    },
];

function useInView(ref: React.RefObject<HTMLElement | null>) {
    const [inView, setInView] = useState(false);

    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold: 0.15 }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref]);

    return inView;
}

export default function Features() {
    const { theme } = useTheme();
    const isLight = theme === "light";
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef);

    return (
        <section id="how-it-works" ref={sectionRef} style={{
            padding: '6rem 0',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Background Glow */}
            <div className="animate-pulse-glow" style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
                filter: 'blur(80px)',
                transform: 'translateY(-50%) translateX(-50%)',
                pointerEvents: 'none',
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                {/* Section Header */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '4rem',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'all 0.8s ease-out',
                }}>
                    <span style={{
                        display: 'inline-block',
                        padding: '0.25rem 1rem',
                        borderRadius: '9999px',
                        background: 'rgba(99, 102, 241, 0.1)',
                        border: '1px solid rgba(99, 102, 241, 0.2)',
                        color: '#6366f1',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: '1.25rem',
                    }}>
                        Fonctionnalités
                    </span>
                    <h2 style={{
                        fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                        fontWeight: 800,
                        marginBottom: '1rem',
                        lineHeight: 1.15,
                        color: 'var(--foreground)',
                    }}>
                        Pourquoi choisir <span className="text-gradient">JL Cloud</span> ?
                    </h2>
                    <p style={{
                        fontSize: '1.15rem',
                        color: 'var(--muted)',
                        maxWidth: '600px',
                        margin: '0 auto',
                        lineHeight: 1.7,
                    }}>
                        Une interface pensée pour la simplicité, la rapidité et la fiabilité.
                    </p>
                </div>

                {/* Features Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1.5rem',
                }}>
                    {features.map((feature, index) => {
                        const IconComp = feature.icon;
                        return (
                            <div
                                key={index}
                                style={{
                                    padding: '2rem',
                                    borderRadius: '1rem',
                                    background: isLight ? 'rgba(255, 255, 255, 0.6)' : 'rgba(17, 24, 39, 0.4)',
                                    backdropFilter: 'blur(12px)',
                                    border: isLight ? '1px solid rgba(0, 0, 0, 0.06)' : '1px solid rgba(255, 255, 255, 0.06)',
                                    cursor: 'default',
                                    transition: 'all 0.4s ease',
                                    opacity: inView ? 1 : 0,
                                    transform: inView ? 'translateY(0)' : 'translateY(30px)',
                                    transitionDelay: `${index * 0.1}s`,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-6px)';
                                    e.currentTarget.style.boxShadow = `0 20px 40px ${feature.color}15, 0 0 0 1px ${feature.color}20`;
                                    e.currentTarget.style.borderColor = `${feature.color}30`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.borderColor = isLight ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.06)';
                                }}
                            >
                                {/* Icon Container */}
                                <div style={{
                                    width: '52px',
                                    height: '52px',
                                    borderRadius: '14px',
                                    background: `${feature.color}15`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1.25rem',
                                    transition: 'transform 0.3s ease',
                                }}>
                                    <IconComp size={24} style={{ color: feature.color }} />
                                </div>

                                <h3 style={{
                                    fontSize: '1.15rem',
                                    fontWeight: 700,
                                    marginBottom: '0.75rem',
                                    color: 'var(--foreground)',
                                }}>
                                    {feature.title}
                                </h3>
                                <p style={{
                                    color: 'var(--muted)',
                                    lineHeight: 1.65,
                                    fontSize: '0.95rem',
                                }}>
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
