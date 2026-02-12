"use client";

import { Star, Quote, MessageSquarePlus } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useRef, useState } from "react";
import { getApprovedTestimonials, Testimonial, getTestimonialStats } from "@/services/testimonials";
import TestimonialForm from "./TestimonialForm";
import StarRating from "./StarRating";

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

function AnimatedCounter({ target, suffix = "", inView }: { target: number; suffix?: string; inView: boolean }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [inView, target]);

    return <>{count.toLocaleString('fr-FR')}{suffix}</>;
}

export default function SocialProof() {
    const { theme } = useTheme();
    const isLight = theme === "light";
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef);

    // Dynamic testimonials state
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [statsData, setStatsData] = useState({ averageRating: 4.9, count: 4, label: "4.9/5" });
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    // Load testimonials and stats from Firestore
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                // Parallel fetch for better performance
                const [testimonialsData, stats] = await Promise.all([
                    getApprovedTestimonials(6),
                    getTestimonialStats()
                ]);

                setTestimonials(testimonialsData);

                if (stats.count > 0) {
                    setStatsData({
                        averageRating: stats.averageRating,
                        count: stats.count,
                        label: `${stats.averageRating}/5`
                    });
                }
            } catch (error) {
                console.error("Error loading social proof data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const handleFormSuccess = async () => {
        // Reload testimonials and stats after successful submission
        const [testimonialsData, stats] = await Promise.all([
            getApprovedTestimonials(6),
            getTestimonialStats()
        ]);
        setTestimonials(testimonialsData);
        if (stats.count > 0) {
            setStatsData({
                averageRating: stats.averageRating,
                count: stats.count,
                label: `${stats.averageRating}/5`
            });
        }
    };

    const stats = [
        {
            value: 15000 + (statsData.count * 12), // Simulation: chaque avis = ~12 documents générés
            suffix: "+",
            label: "Documents générés"
        },
        {
            value: statsData.averageRating,
            suffix: "/5",
            label: `Note moyenne (${statsData.count} avis)`
        },
        { value: 100, suffix: "%", label: "Conforme RGPD" },
        { value: 24, suffix: "/7", label: "Disponibilité" },
    ];

    return (
        <>
            {/* Testimonial Form Modal */}
            {showForm && (
                <TestimonialForm
                    onClose={() => setShowForm(false)}
                    onSuccess={handleFormSuccess}
                />
            )}

            <section ref={sectionRef} style={{
                padding: '6rem 0',
                borderTop: isLight ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.05)',
                borderBottom: isLight ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.05)',
                background: isLight ? 'rgba(241, 245, 249, 0.5)' : 'rgba(0, 0, 0, 0.2)',
            }}>
                <div className="container">
                    {/* Stats Row */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '5rem',
                    }}>
                        {stats.map((stat, index) => (
                            <div key={index} style={{
                                textAlign: 'center',
                                padding: '2rem 1.5rem',
                                borderRadius: '1rem',
                                background: isLight ? 'rgba(255, 255, 255, 0.7)' : 'rgba(17, 24, 39, 0.4)',
                                backdropFilter: 'blur(12px)',
                                border: isLight ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.06)',
                                opacity: inView ? 1 : 0,
                                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                                transition: `all 0.6s ease-out ${index * 0.15}s`,
                            }}>
                                <div className="text-gradient" style={{
                                    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                                    fontWeight: 800,
                                    marginBottom: '0.5rem',
                                    lineHeight: 1,
                                }}>
                                    <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={inView} />
                                </div>
                                <div style={{
                                    fontSize: '0.85rem',
                                    color: 'var(--muted)',
                                    fontWeight: 500,
                                }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Section Title */}
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '3rem',
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.8s ease-out 0.3s',
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
                            Témoignages
                        </span>
                        <h2 style={{
                            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                            fontWeight: 800,
                            color: 'var(--foreground)',
                            lineHeight: 1.15,
                            marginBottom: '1rem',
                        }}>
                            Ils nous font <span className="text-gradient">confiance</span>
                        </h2>

                        {/* Add Review Button */}
                        <button
                            onClick={() => setShowForm(true)}
                            className="btn-primary"
                            style={{
                                marginTop: '1.5rem',
                                padding: '0.875rem 2rem',
                                borderRadius: '0.75rem',
                                border: 'none',
                                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                                color: '#ffffff',
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                transition: 'all 0.3s',
                            }}
                        >
                            <MessageSquarePlus size={20} />
                            Laisser un avis
                        </button>
                    </div>

                    {/* Testimonials */}
                    {isLoading ? (
                        // Loading skeleton
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '1.5rem',
                        }}>
                            {[1, 2, 3].map((i) => (
                                <div key={i} style={{
                                    padding: '2rem',
                                    borderRadius: '1rem',
                                    background: isLight ? 'rgba(255, 255, 255, 0.7)' : 'rgba(17, 24, 39, 0.4)',
                                    backdropFilter: 'blur(12px)',
                                    border: isLight ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255, 0.06)',
                                    minHeight: '250px',
                                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                                }}>
                                    <div style={{
                                        width: '60%',
                                        height: '20px',
                                        background: isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
                                        borderRadius: '4px',
                                        marginBottom: '1rem',
                                    }}></div>
                                    <div style={{
                                        width: '100%',
                                        height: '80px',
                                        background: isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
                                        borderRadius: '4px',
                                    }}></div>
                                </div>
                            ))}
                        </div>
                    ) : testimonials.length > 0 ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '1.5rem',
                        }}>
                            {testimonials.map((t, index) => (
                                <div key={t.id || index} style={{
                                    padding: '2rem',
                                    borderRadius: '1rem',
                                    background: isLight ? 'rgba(255, 255, 255, 0.7)' : 'rgba(17, 24, 39, 0.4)',
                                    border: isLight ? '1px solid rgba(99, 102, 241, 0.1)' : '1px solid rgba(99, 102, 241, 0.15)',
                                    boxShadow: inView ? '0 10px 40px -10px rgba(0,0,0,0.1)' : 'none',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    opacity: inView ? 1 : 0,
                                    transform: inView ? 'translateY(0)' : 'translateY(20px)',
                                    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.1 + index * 0.1}s`,
                                }} className="testimonial-card">
                                    {/* Gradient overlay on hover */}
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(168, 85, 247, 0.05))',
                                        opacity: 0,
                                        transition: 'opacity 0.3s',
                                    }} className="hover-gradient" />
                                    {/* Quote watermark */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '1.5rem',
                                        right: '1.5rem',
                                        opacity: isLight ? 0.05 : 0.1,
                                        transform: 'rotate(10deg)',
                                        pointerEvents: 'none',
                                    }}>
                                        <Quote size={80} color="#6366f1" fill="currentColor" />
                                    </div>

                                    {/* Stars */}
                                    <div style={{ marginBottom: '1.25rem', position: 'relative', zIndex: 1 }}>
                                        <StarRating rating={t.rating} readonly size={18} />
                                    </div>

                                    {/* Quote text */}
                                    <p style={{
                                        fontSize: '1.05rem',
                                        lineHeight: 1.6,
                                        color: 'var(--foreground)',
                                        fontStyle: 'italic',
                                        marginBottom: '1.75rem',
                                        opacity: 0.9,
                                        position: 'relative',
                                        zIndex: 1,
                                    }}>
                                        "{t.comment}"
                                    </p>

                                    {/* Author */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{
                                            width: '44px',
                                            height: '44px',
                                            borderRadius: '50%',
                                            background: t.gradient || 'linear-gradient(135deg, #6366f1, #a855f7)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#fff',
                                            fontWeight: 700,
                                            fontSize: '1.1rem',
                                        }}>
                                            {t.initial || t.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--foreground)' }}>
                                                {t.name}
                                            </div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                                                {t.role}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // Empty state
                        <div style={{
                            textAlign: 'center',
                            padding: '4rem 2rem',
                            color: 'var(--muted)',
                        }}>
                            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                                Aucun témoignage pour le moment
                            </p>
                            <p style={{ fontSize: '0.9rem' }}>
                                Soyez le premier à partager votre expérience !
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <style jsx>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                .testimonial-card:hover {
                    transform: translateY(-5px) !important;
                    box-shadow: 0 20px 40px -15px rgba(99, 102, 241, 0.2) !important;
                    border-color: rgba(99, 102, 241, 0.3) !important;
                }
                .testimonial-card:hover .hover-gradient {
                    opacity: 1 !important;
                }
            `}</style>
        </>
    );
}
