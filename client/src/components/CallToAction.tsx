"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useRef, useState } from "react";

function useInView(ref: React.RefObject<HTMLElement | null>) {
    const [inView, setInView] = useState(false);
    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold: 0.2 }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref]);
    return inView;
}

export default function CallToAction() {
    const { theme } = useTheme();
    const isLight = theme === "light";
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef);

    return (
        <section ref={sectionRef} style={{
            padding: '8rem 0',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Gradient Background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: isLight
                    ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.04) 0%, rgba(139, 92, 246, 0.06) 50%, rgba(99, 102, 241, 0.04) 100%)'
                    : 'linear-gradient(135deg, rgba(99, 102, 241, 0.06) 0%, rgba(139, 92, 246, 0.08) 50%, rgba(99, 102, 241, 0.06) 100%)',
                pointerEvents: 'none',
            }} />

            {/* Floating Orbs */}
            <div className="animate-float-slow" style={{
                position: 'absolute',
                top: '10%',
                right: '15%',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
            }} />
            <div className="animate-float" style={{
                position: 'absolute',
                bottom: '10%',
                left: '15%',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                {/* CTA Card */}
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    textAlign: 'center',
                    padding: '4rem 2rem',
                    borderRadius: '2rem',
                    background: isLight
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(238,242,255,0.8) 100%)'
                        : 'linear-gradient(135deg, rgba(17, 24, 39, 0.6) 0%, rgba(30, 27, 75, 0.4) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: isLight ? '1px solid rgba(99, 102, 241, 0.1)' : '1px solid rgba(99, 102, 241, 0.15)',
                    boxShadow: isLight
                        ? '0 25px 50px rgba(99, 102, 241, 0.08)'
                        : '0 25px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.97)',
                    transition: 'all 0.8s ease-out',
                }}>
                    {/* Sparkle Badge */}
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.35rem 1rem',
                        borderRadius: '9999px',
                        background: 'rgba(99, 102, 241, 0.1)',
                        border: '1px solid rgba(99, 102, 241, 0.2)',
                        color: '#6366f1',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        marginBottom: '2rem',
                    }}>
                        <Sparkles size={14} />
                        Gratuit & sans engagement
                    </div>

                    <h2 style={{
                        fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                        fontWeight: 800,
                        marginBottom: '1.25rem',
                        lineHeight: 1.15,
                        color: 'var(--foreground)',
                    }}>
                        Prêt à simplifier votre{" "}
                        <span className="animate-gradient-x" style={{
                            background: 'linear-gradient(135deg, #6366f1, #a855f7, #6366f1)',
                            backgroundSize: '200% 200%',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}>
                            administratif
                        </span>
                        {" "}?
                    </h2>

                    <p style={{
                        fontSize: '1.15rem',
                        color: 'var(--muted)',
                        marginBottom: '2.5rem',
                        maxWidth: '500px',
                        margin: '0 auto 2.5rem',
                        lineHeight: 1.7,
                    }}>
                        Ne perdez plus de temps avec la paperasse. Générez votre document officiel maintenant.
                    </p>

                    {/* CTA Button */}
                    <Link href="#generate" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '1.1rem 2.5rem',
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        color: '#fff',
                        borderRadius: '9999px',
                        fontWeight: 700,
                        fontSize: '1.15rem',
                        textDecoration: 'none',
                        boxShadow: '0 0 40px rgba(99, 102, 241, 0.35), 0 4px 15px rgba(99, 102, 241, 0.25)',
                        transition: 'all 0.3s ease',
                        border: 'none',
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                            e.currentTarget.style.boxShadow = '0 0 60px rgba(99, 102, 241, 0.5), 0 10px 30px rgba(99, 102, 241, 0.35)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = '0 0 40px rgba(99, 102, 241, 0.35), 0 4px 15px rgba(99, 102, 241, 0.25)';
                        }}
                    >
                        Créer mon attestation
                        <ArrowRight size={22} />
                    </Link>

                    {/* Micro-text */}
                    <p style={{
                        marginTop: '1.25rem',
                        fontSize: '0.8rem',
                        color: 'var(--muted)',
                        opacity: 0.7,
                    }}>
                        Aucune carte bancaire requise · PDF téléchargeable immédiatement
                    </p>
                </div>
            </div>
        </section>
    );
}
