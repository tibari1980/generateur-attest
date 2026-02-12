"use client";

import { useState } from "react";
import Link from "next/link";
import { Twitter, Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { subscribeToNewsletter } from "../services/newsletter";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        setMessage("");

        const response = await subscribeToNewsletter(email);

        if (response.success) {
            setStatus("success");
            setEmail("");
            setMessage(response.message);
            setTimeout(() => {
                setStatus("idle");
                setMessage("");
            }, 5000);
        } else {
            setStatus("error");
            setMessage(response.message);
            setTimeout(() => {
                setStatus("idle");
                setMessage("");
            }, 5000);
        }
    };

    return (
        <footer style={{
            marginTop: 'auto',
            paddingTop: '4rem',
            paddingBottom: '2rem',
            borderTop: '1px solid var(--border)',
            background: 'var(--background)',
        }}>
            <div className="container" style={{ padding: '0 1.5rem' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '3rem',
                    marginBottom: '3rem',
                }}>
                    {/* Brand Column */}
                    <div>
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                            <Logo size={34} showText={true} />
                        </Link>
                        <p style={{
                            fontSize: '0.875rem',
                            lineHeight: 1.7,
                            color: 'var(--muted)',
                            marginBottom: '1.5rem',
                            maxWidth: '260px'
                        }}>
                            La solution professionnelle pour générer vos documents administratifs en quelques clics. Rapide, sécurisé et conforme.
                        </p>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            {[
                                { Icon: Twitter, label: "Twitter" },
                                { Icon: Github, label: "GitHub" },
                                { Icon: Linkedin, label: "LinkedIn" }
                            ].map(({ Icon, label }, i) => (
                                <a key={i} href="#"
                                    onClick={(e) => e.preventDefault()}
                                    aria-label={label}
                                    style={{
                                        width: '34px',
                                        height: '34px',
                                        borderRadius: '50%',
                                        background: 'rgba(99, 102, 241, 0.08)',
                                        border: '1px solid rgba(99, 102, 241, 0.15)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--muted)',
                                        transition: 'all 0.3s',
                                        textDecoration: 'none',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(99, 102, 241, 0.15)';
                                        e.currentTarget.style.color = '#6366f1';
                                        e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(99, 102, 241, 0.08)';
                                        e.currentTarget.style.color = 'var(--muted)';
                                        e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.15)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Service */}
                    <div>
                        <h4 style={{
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            color: 'var(--foreground)',
                            marginBottom: '1.25rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                        }}>Service</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[
                                { label: "Générateur", href: "/" },
                                { label: "À propos", href: "/about" },
                                { label: "Contact", href: "/contact" },
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link href={link.href} style={{
                                        color: 'var(--muted)',
                                        fontSize: '0.9rem',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s',
                                        display: 'inline-block'
                                    }}
                                        onMouseEnter={(e) => { e.currentTarget.style.color = '#6366f1'; e.currentTarget.style.transform = 'translateX(2px)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Légal */}
                    <div>
                        <h4 style={{
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            color: 'var(--foreground)',
                            marginBottom: '1.25rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                        }}>Légal</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[
                                { label: "Confidentialité", href: "/privacy" },
                                { label: "CGU", href: "/terms" },
                                { label: "FAQ", href: "/faq" },
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link href={link.href} style={{
                                        color: 'var(--muted)',
                                        fontSize: '0.9rem',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s',
                                        display: 'inline-block'
                                    }}
                                        onMouseEnter={(e) => { e.currentTarget.style.color = '#6366f1'; e.currentTarget.style.transform = 'translateX(2px)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 style={{
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            color: 'var(--foreground)',
                            marginBottom: '1.25rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                        }}>Restez informé</h4>
                        <p style={{
                            fontSize: '0.8rem',
                            color: 'var(--muted)',
                            marginBottom: '1rem',
                            lineHeight: 1.6,
                        }}>
                            Recevez nos dernières mises à jour directement dans votre boîte mail.
                        </p>
                        <form style={{ display: 'flex', gap: '0.5rem' }} onSubmit={handleNewsletterSubmit}>
                            <input
                                type="email"
                                placeholder="Votre email"
                                aria-label="Adresse email pour la newsletter"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === 'loading' || status === 'success'}
                                style={{
                                    flex: 1,
                                    padding: '0.6rem 0.75rem',
                                    borderRadius: '0.5rem',
                                    border: status === 'error' ? '1px solid #ef4444' : '1px solid var(--border)',
                                    background: 'var(--input)',
                                    color: 'var(--foreground)',
                                    fontSize: '0.85rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                    opacity: status === 'loading' ? 0.7 : 1
                                }}
                            />
                            <button
                                type="submit"
                                aria-label="S'inscrire à la newsletter"
                                disabled={status === 'loading' || status === 'success'}
                                style={{
                                    padding: '0.6rem 1rem',
                                    borderRadius: '0.5rem',
                                    border: 'none',
                                    background: status === 'success' ? '#10b981' : status === 'error' ? '#ef4444' : 'var(--gradient-primary)',
                                    color: '#fff',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    fontSize: '0.85rem',
                                    opacity: status === 'loading' ? 0.7 : 1,
                                    minWidth: '46px'
                                }}>
                                {status === 'loading' ? '...' : status === 'success' ? '✓' : status === 'error' ? '!' : '→'}
                            </button>
                        </form>
                        {message && (
                            <p style={{
                                color: status === 'success' ? '#10b981' : '#ef4444',
                                fontSize: '0.75rem',
                                marginTop: '0.5rem',
                                animation: 'fadeIn 0.5s'
                            }}>
                                {message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{
                    borderTop: '1px solid var(--border)',
                    marginTop: '2rem',
                    paddingTop: '2rem',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    color: 'var(--muted)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                }}>
                    <p>© {new Date().getFullYear()} JL Cloud. Tous droits réservés.</p>
                    <p style={{ fontSize: '0.75rem', marginTop: '0.2rem', opacity: 0.7 }}>
                        Développé avec <span style={{ color: '#ef4444' }}>❤</span> par <strong style={{ color: 'var(--foreground)' }}>ZEROUAL Tibari</strong> — Ingénieur Full-Stack
                    </p>
                </div>
            </div>
        </footer>
    );
}
