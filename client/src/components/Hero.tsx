"use client";

import { ArrowRight, ChevronRight, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function Hero() {
    const { theme } = useTheme();
    const isLight = theme === "light";

    return (
        <section style={{
            position: 'relative',
            minHeight: '95vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            paddingTop: '5rem',
            paddingBottom: '4rem',
        }}>
            {/* Ambient Gradient Background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: isLight
                    ? 'radial-gradient(ellipse at top, rgba(99, 102, 241, 0.08) 0%, transparent 60%)'
                    : 'radial-gradient(ellipse at top, rgba(99, 102, 241, 0.15) 0%, transparent 55%)',
                pointerEvents: 'none',
            }} />

            {/* Floating Orbs */}
            <div className="animate-float" style={{
                position: 'absolute',
                top: '15%',
                left: '10%',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
            }} />
            <div className="animate-float-slow" style={{
                position: 'absolute',
                bottom: '20%',
                right: '8%',
                width: '250px',
                height: '250px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
            }} />
            <div className="animate-pulse-glow" style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                background: isLight
                    ? 'radial-gradient(circle, rgba(99, 102, 241, 0.04) 0%, transparent 60%)'
                    : 'radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, transparent 60%)',
                pointerEvents: 'none',
            }} />

            {/* Grid Pattern Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: isLight
                    ? 'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)'
                    : 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
                pointerEvents: 'none',
                maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 10, padding: '0 1rem' }}>
                <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
                    {/* Badge */}
                    <div className="animate-slide-up" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.35rem 1rem',
                        borderRadius: '9999px',
                        background: isLight ? 'rgba(99, 102, 241, 0.08)' : 'rgba(255, 255, 255, 0.05)',
                        border: isLight ? '1px solid rgba(99, 102, 241, 0.15)' : '1px solid rgba(255, 255, 255, 0.08)',
                        marginBottom: '2rem',
                        cursor: 'pointer',
                        transition: 'background 0.3s',
                    }}>
                        <Sparkles size={14} style={{ color: '#6366f1' }} />
                        <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--muted)' }}>
                            Nouvelle version 2.0 — Plus rapide que jamais
                        </span>
                        <ChevronRight size={14} style={{ color: 'var(--muted)' }} />
                    </div>

                    {/* Headline */}
                    <h1 className="animate-slide-up-delay-1" style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                        fontWeight: 800,
                        lineHeight: 1.08,
                        letterSpacing: '-0.03em',
                        marginBottom: '1.5rem',
                        color: 'var(--foreground)',
                    }}>
                        Vos documents officiels,<br />
                        <span className="animate-gradient-x" style={{
                            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 30%, #6366f1 60%, #8b5cf6 100%)',
                            backgroundSize: '200% 200%',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}>
                            sans la paperasse.
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="animate-slide-up-delay-2" style={{
                        fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                        color: 'var(--muted)',
                        marginBottom: '2.5rem',
                        maxWidth: '640px',
                        margin: '0 auto 2.5rem',
                        lineHeight: 1.7,
                    }}>
                        Générez, signez et téléchargez vos attestations en <strong style={{ color: 'var(--foreground)' }}>quelques secondes</strong>.
                        Simple, sécurisé et 100% gratuit.
                    </p>

                    {/* CTA Buttons */}
                    <div className="animate-slide-up-delay-3" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                    }}>
                        <Link href="#generate" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '1rem 2rem',
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                            color: '#fff',
                            borderRadius: '9999px',
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            textDecoration: 'none',
                            boxShadow: '0 0 40px rgba(99, 102, 241, 0.35), 0 4px 15px rgba(99, 102, 241, 0.25)',
                            transition: 'all 0.3s ease',
                            border: 'none',
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                                e.currentTarget.style.boxShadow = '0 0 60px rgba(99, 102, 241, 0.45), 0 8px 25px rgba(99, 102, 241, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.boxShadow = '0 0 40px rgba(99, 102, 241, 0.35), 0 4px 15px rgba(99, 102, 241, 0.25)';
                            }}
                        >
                            Commencer gratuitement
                            <ArrowRight size={20} />
                        </Link>
                        <Link href="#how-it-works" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '1rem 2rem',
                            background: isLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.05)',
                            color: 'var(--foreground)',
                            borderRadius: '9999px',
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            textDecoration: 'none',
                            border: isLight ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.1)',
                            transition: 'all 0.3s ease',
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = isLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.05)';
                            }}
                        >
                            Comment ça marche
                        </Link>
                    </div>

                    {/* Trust Indicators */}
                    <div className="animate-slide-up-delay-4" style={{
                        marginTop: '3.5rem',
                        paddingTop: '2rem',
                        borderTop: isLight ? '1px solid rgba(0, 0, 0, 0.06)' : '1px solid rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '2rem',
                    }}>
                        {[
                            { icon: <CheckCircle2 size={16} aria-hidden="true" style={{ color: '#10b981' }} />, text: "Sans inscription requise" },
                            { icon: <CheckCircle2 size={16} aria-hidden="true" style={{ color: '#10b981' }} />, text: "100% Gratuit" },
                            { icon: <CheckCircle2 size={16} aria-hidden="true" style={{ color: '#10b981' }} />, text: "PDF Instantané" },
                            { icon: <CheckCircle2 size={16} aria-hidden="true" style={{ color: '#10b981' }} />, text: "Juridiquement valide" },
                        ].map((item, i) => (
                            <span key={i} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: 'var(--muted)',
                                fontSize: '0.85rem',
                                fontWeight: 500,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                            }}>
                                {item.icon}
                                {item.text}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '200px',
                background: isLight
                    ? 'linear-gradient(to top, rgba(248, 250, 252, 0.8) 0%, transparent 100%)'
                    : 'linear-gradient(to top, rgba(3, 7, 18, 0.8) 0%, transparent 100%)',
                pointerEvents: 'none',
            }} />
        </section>
    );
}
