"use client";

import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function NotFound() {
    const { theme } = useTheme();
    const isLight = theme === "light";

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            fontFamily: "'Inter', sans-serif",
        }}>
            <div style={{
                textAlign: 'center',
                maxWidth: '580px',
            }}>
                {/* 404 Number */}
                <div style={{
                    fontSize: 'clamp(6rem, 15vw, 10rem)',
                    fontWeight: 900,
                    lineHeight: 1,
                    background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    animation: 'gradient-shift 4s ease infinite',
                    marginBottom: '1rem',
                    letterSpacing: '-0.05em',
                }}>
                    404
                </div>

                {/* Title */}
                <h1 style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                    fontWeight: 700,
                    color: isLight ? '#111827' : '#f9fafb',
                    marginBottom: '1rem',
                }}>
                    Page introuvable
                </h1>

                {/* Description */}
                <p style={{
                    fontSize: '1.1rem',
                    color: isLight ? '#6b7280' : '#9ca3af',
                    lineHeight: 1.7,
                    marginBottom: '2.5rem',
                }}>
                    Oups ! La page que vous recherchez n&apos;existe pas ou a été déplacée.
                    Pas de panique, vous pouvez retourner à l&apos;accueil.
                </p>

                {/* Action Buttons */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                }}>
                    <Link href="/" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.875rem 2rem',
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        color: '#fff',
                        borderRadius: '12px',
                        fontWeight: 600,
                        fontSize: '1rem',
                        textDecoration: 'none',
                        boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)',
                        transition: 'all 0.3s ease',
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 0 50px rgba(99, 102, 241, 0.45)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 0 30px rgba(99, 102, 241, 0.3)';
                        }}
                    >
                        <Home size={18} />
                        Retour à l&apos;accueil
                    </Link>

                    <Link href="/contact" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.875rem 2rem',
                        background: isLight ? '#f3f4f6' : 'rgba(255,255,255,0.05)',
                        color: isLight ? '#374151' : '#e5e7eb',
                        border: isLight ? '1px solid #e5e7eb' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        fontWeight: 600,
                        fontSize: '1rem',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.background = isLight ? '#e5e7eb' : 'rgba(255,255,255,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.background = isLight ? '#f3f4f6' : 'rgba(255,255,255,0.05)';
                        }}
                    >
                        Nous contacter
                    </Link>
                </div>

                {/* Decorative elements */}
                <div style={{
                    marginTop: '3rem',
                    fontSize: '0.85rem',
                    color: isLight ? '#9ca3af' : '#6b7280',
                }}>
                    Erreur 404 · JL Cloud
                </div>
            </div>

            {/* CSS Animation */}
            <style>{`
                @keyframes gradient-shift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
            `}</style>
        </div>
    );
}
