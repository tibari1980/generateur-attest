"use client";

import {
    Menu,
    X,
    ChevronDown,
    ChevronRight,
    LogOut,
    Settings,
    User as UserIcon,
    Trash2,
    Sun,
    Moon,
    LayoutDashboard
} from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import DeleteAccountModal from "./DeleteAccountModal";

export default function Header() {
    const { user, signOut } = useAuth();
    const { theme, toggleTheme } = useTheme(); // Theme toggle restored in menu
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const pathname = usePathname();
    const userMenuRef = useRef<HTMLDivElement>(null);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close user menu on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const isLight = theme === "light";

    const navLinks = [
        { href: "/#how-it-works", label: "Comment ça marche" },
        { href: "/about", label: "À propos" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <>
            <DeleteAccountModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
            />

            <header style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                transition: 'all 0.3s ease',
                background: (pathname === "/" && !isScrolled)
                    ? 'transparent'
                    : (isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(3, 7, 18, 0.95)'),
                backdropFilter: (pathname === "/" && !isScrolled) ? 'none' : 'blur(8px)',
                borderBottom: (pathname === "/" && !isScrolled)
                    ? '1px solid transparent'
                    : (isLight ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.05)'),
                fontFamily: "'Inter', sans-serif",
            }}>
                <div className="container mx-auto px-4" style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                    {/* Logo */}
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <Logo size={42} showText={true} isLight={isLight} />
                    </Link>

                    {/* Desktop Navigation - Using inline styles for reliable spacing */}
                    <nav className="hidden md:flex" style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                style={{
                                    fontSize: '1.2rem',
                                    fontWeight: 500,
                                    color: isLight ? '#4b5563' : '#9ca3af', // Gray-600 / Gray-400
                                    transition: 'color 0.2s',
                                    textDecoration: 'none',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = isLight ? '#000' : '#fff';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = isLight ? '#4b5563' : '#9ca3af';
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions Group */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

                        {/* Mobile Menu Toggle Removed as per user request */}

                        {/* User / Auth Buttons */}
                        <div className="hidden md:block">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                {user ? (
                                    <>
                                        <button
                                            onClick={toggleTheme}
                                            aria-label={isLight ? "Passer en mode sombre" : "Passer en mode clair"}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                background: isLight ? '#f3f4f6' : 'rgba(255,255,255,0.05)',
                                                border: isLight ? '1px solid #e5e7eb' : '1px solid rgba(255,255,255,0.1)',
                                                color: isLight ? '#374151' : '#e5e7eb',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = isLight ? '#e5e7eb' : 'rgba(255,255,255,0.1)';
                                                e.currentTarget.style.transform = 'scale(1.05)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = isLight ? '#f3f4f6' : 'rgba(255,255,255,0.05)';
                                                e.currentTarget.style.transform = 'scale(1)';
                                            }}
                                            title={isLight ? "Passer en mode sombre" : "Passer en mode clair"}
                                        >
                                            {isLight ? <Moon size={20} /> : <Sun size={20} />}
                                        </button>

                                        <div className="relative" ref={userMenuRef} style={{ display: 'flex', alignItems: 'center' }}>
                                            <button
                                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '12px',
                                                    background: isLight ? '#f3f4f6' : 'rgba(255,255,255,0.05)',
                                                    border: isLight ? '1px solid #e5e7eb' : '1px solid rgba(255,255,255,0.1)',
                                                    padding: '6px 6px 6px 16px',
                                                    borderRadius: '9999px',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                    color: isLight ? '#374151' : '#e5e7eb',
                                                }}
                                            >
                                                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                                                    Mon compte
                                                </span>
                                                <div style={{
                                                    width: '32px',
                                                    height: '32px',
                                                    borderRadius: '50%',
                                                    background: '#e0e7ff', // Indigo-100
                                                    color: '#4f46e5', // Indigo-600
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '0.875rem',
                                                    fontWeight: 'bold',
                                                }}>
                                                    {user.email?.charAt(0).toUpperCase()}
                                                </div>
                                            </button>

                                            {/* Dropdown - Premium & Robust */}
                                            {isUserMenuOpen && (
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: '100%',
                                                        right: 0,
                                                        marginTop: '8px',
                                                        width: '260px',
                                                        borderRadius: '16px',
                                                        backgroundColor: isLight ? '#ffffff' : '#111827',
                                                        border: isLight ? '1px solid #e5e7eb' : '1px solid #374151',
                                                        boxShadow: isLight
                                                            ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                                                            : '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
                                                        overflow: 'hidden',
                                                        animation: 'slide-up-fade 0.2s ease-out',
                                                        zIndex: 100
                                                    }}
                                                >
                                                    <div style={{
                                                        padding: '16px',
                                                        borderBottom: isLight ? '1px solid #f3f4f6' : '1px solid #1f2937'
                                                    }}>
                                                        <p style={{
                                                            fontSize: '0.75rem',
                                                            fontWeight: 600,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.05em',
                                                            color: '#9ca3af',
                                                            marginBottom: '4px'
                                                        }}>
                                                            Connecté en tant que
                                                        </p>
                                                        <p style={{
                                                            fontSize: '0.9rem',
                                                            fontWeight: 500,
                                                            color: isLight ? '#111827' : '#ffffff',
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis'
                                                        }}>
                                                            {user.email}
                                                        </p>
                                                    </div>

                                                    <div style={{ padding: '8px' }}>
                                                        {user.email === 'tibarinewdzign@gmail.com' && (
                                                            <Link
                                                                href="/admin/testimonials"
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '12px',
                                                                    padding: '10px 12px',
                                                                    borderRadius: '8px',
                                                                    fontSize: '0.9rem',
                                                                    fontWeight: 500,
                                                                    color: isLight ? '#4f46e5' : '#6366f1',
                                                                    textDecoration: 'none',
                                                                    transition: 'background-color 0.2s',
                                                                    background: isLight ? 'rgba(79, 70, 229, 0.05)' : 'rgba(99, 102, 241, 0.1)',
                                                                    marginBottom: '4px',
                                                                }}
                                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isLight ? 'rgba(79, 70, 229, 0.1)' : 'rgba(99, 102, 241, 0.2)'}
                                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isLight ? 'rgba(79, 70, 229, 0.05)' : 'rgba(99, 102, 241, 0.1)'}
                                                            >
                                                                <LayoutDashboard size={18} />
                                                                Administration
                                                            </Link>
                                                        )}

                                                        <Link
                                                            href="/profile"
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '12px',
                                                                padding: '10px 12px',
                                                                borderRadius: '8px',
                                                                fontSize: '0.9rem',
                                                                fontWeight: 500,
                                                                color: isLight ? '#374151' : '#e5e7eb',
                                                                textDecoration: 'none',
                                                                transition: 'background-color 0.2s'
                                                            }}
                                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isLight ? '#f9fafb' : '#1f2937'}
                                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                        >
                                                            <UserIcon size={18} />
                                                            Mon Profil
                                                        </Link>

                                                        <button
                                                            onClick={() => { setIsUserMenuOpen(false); setIsDeleteModalOpen(true); }}
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '12px',
                                                                width: '100%',
                                                                padding: '10px 12px',
                                                                borderRadius: '8px',
                                                                fontSize: '0.9rem',
                                                                fontWeight: 500,
                                                                color: isLight ? '#374151' : '#e5e7eb',
                                                                textDecoration: 'none',
                                                                background: 'transparent',
                                                                border: 'none',
                                                                cursor: 'pointer',
                                                                textAlign: 'left',
                                                                transition: 'background-color 0.2s'
                                                            }}
                                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isLight ? '#f9fafb' : '#1f2937'}
                                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                        >
                                                            <Settings size={18} />
                                                            Paramètres
                                                        </button>

                                                        <div style={{
                                                            height: '1px',
                                                            backgroundColor: isLight ? '#f3f4f6' : 'rgba(255,255,255,0.05)',
                                                            margin: '4px 0'
                                                        }}></div>

                                                        <button
                                                            onClick={signOut}
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '12px',
                                                                width: '100%',
                                                                padding: '10px 12px',
                                                                borderRadius: '8px',
                                                                fontSize: '0.9rem',
                                                                fontWeight: 500,
                                                                color: '#ef4444',
                                                                background: 'transparent',
                                                                border: 'none',
                                                                cursor: 'pointer',
                                                                textAlign: 'left',
                                                                transition: 'background-color 0.2s'
                                                            }}
                                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isLight ? '#fef2f2' : 'rgba(239, 68, 68, 0.1)'}
                                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                        >
                                                            <LogOut size={18} />
                                                            Déconnexion
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <Link href="/auth/signin" style={{
                                            fontSize: '1.1rem',
                                            fontWeight: 500,
                                            color: isLight ? '#1f2937' : '#e5e7eb',
                                            textDecoration: 'none',
                                        }}>
                                            Se connecter
                                        </Link>
                                        <Link href="/auth/signup" style={{
                                            padding: '10px 24px',
                                            backgroundColor: '#4f46e5',
                                            color: 'white',
                                            borderRadius: '8px',
                                            fontSize: '1.1rem',
                                            fontWeight: 600,
                                            textDecoration: 'none',
                                            boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.1), 0 2px 4px -1px rgba(79, 70, 229, 0.06)',
                                            transition: 'background-color 0.2s',
                                        }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4338ca'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
                                        >
                                            Commencer
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: isLight ? '#ffffff' : '#030712',
                        zIndex: 40,
                        padding: '100px 24px 24px 24px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px',
                    }}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 600,
                                    color: isLight ? '#111827' : '#ffffff',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingBottom: '16px',
                                    borderBottom: isLight ? '1px solid #f3f4f6' : '1px solid #1f2937'
                                }}
                            >
                                {link.label}
                                <ChevronRight size={20} color={isLight ? '#9ca3af' : '#6b7280'} />
                            </Link>
                        ))}

                        {!user ? (
                            <div style={{ display: 'grid', gap: '16px', marginTop: '24px' }}>
                                <Link href="/auth/signin" style={{
                                    textAlign: 'center',
                                    padding: '14px',
                                    borderRadius: '12px',
                                    border: isLight ? '1px solid #e5e7eb' : '1px solid #374151',
                                    color: isLight ? '#111827' : '#ffffff',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                }}>
                                    Se connecter
                                </Link>
                                <Link href="/auth/signup" style={{
                                    textAlign: 'center',
                                    padding: '14px',
                                    borderRadius: '12px',
                                    backgroundColor: '#4f46e5',
                                    color: 'white',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.1)',
                                }}>
                                    Commencer gratuitement
                                </Link>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
                                {user.email === 'tibarinewdzign@gmail.com' && (
                                    <Link href="/admin/testimonials" style={{ display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none', color: '#6366f1' }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                            color: '#6366f1',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <LayoutDashboard size={20} />
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: 600, color: '#6366f1', margin: 0 }}>Administration</p>
                                            <p style={{ fontSize: '0.875rem', color: isLight ? '#6b7280' : '#9ca3af', margin: 0 }}>Gérer les avis</p>
                                        </div>
                                    </Link>
                                )}
                                <Link href="/profile" style={{ display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        backgroundColor: '#e0e7ff',
                                        color: '#4f46e5',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold',
                                    }}>
                                        {user.email?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 600, color: isLight ? '#111827' : '#ffffff', margin: 0 }}>Mon Compte</p>
                                        <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>{user.email}</p>
                                    </div>
                                </Link>
                                <button onClick={signOut} style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#ef4444',
                                    fontWeight: 500,
                                    textAlign: 'left',
                                    padding: '8px 0',
                                    cursor: 'pointer',
                                    fontSize: '1rem'
                                }}>
                                    Se déconnecter
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </header>
        </>
    );
}
