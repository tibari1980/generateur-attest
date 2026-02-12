"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight, Loader2, AlertCircle, Shield } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const router = useRouter();
    const { theme } = useTheme();
    const isLight = theme === "light";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            setLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            await updateProfile(userCredential.user, {
                displayName: formData.name,
            });

            router.push("/");
        } catch (err: any) {
            console.error("Signup error:", err);
            let errorMessage = "Une erreur est survenue lors de l'inscription.";
            if (err.code === 'auth/email-already-in-use') {
                errorMessage = "Cet email est déjà utilisé.";
            } else if (err.code === 'auth/weak-password') {
                errorMessage = "Le mot de passe doit contenir au moins 6 caractères.";
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = (fieldName: string): React.CSSProperties => ({
        width: '100%',
        backgroundColor: isLight ? '#ffffff' : 'rgba(0, 0, 0, 0.4)',
        border: `1px solid ${focusedField === fieldName ? 'rgba(99, 102, 241, 0.5)' : (isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.08)')}`,
        borderRadius: '12px',
        paddingLeft: '44px',
        paddingRight: '16px',
        paddingTop: '14px',
        paddingBottom: '14px',
        color: isLight ? '#0f172a' : '#f9fafb',
        fontSize: '0.95rem',
        outline: 'none',
        transition: 'all 0.3s ease',
        boxShadow: focusedField === fieldName ? '0 0 0 3px rgba(99, 102, 241, 0.1), 0 0 20px rgba(99, 102, 241, 0.05)' : 'none',
        boxSizing: 'border-box' as const,
    });

    const iconStyle = (fieldName: string): React.CSSProperties => ({
        position: 'absolute' as const,
        left: '14px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: focusedField === fieldName ? '#6366f1' : (isLight ? '#94a3b8' : '#6b7280'),
        transition: 'color 0.3s',
    });

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 1rem',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Background glow elements */}
            <div style={{
                position: 'absolute',
                top: '10%',
                left: '20%',
                width: '400px',
                height: '400px',
                background: isLight ? 'radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute',
                bottom: '10%',
                right: '20%',
                width: '350px',
                height: '350px',
                background: isLight ? 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none',
            }} />

            {/* Card */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                maxWidth: '460px',
                backgroundColor: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(17, 24, 39, 0.6)',
                backdropFilter: 'blur(20px)',
                border: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                padding: '40px',
                boxShadow: isLight ? '0 25px 60px rgba(0, 0, 0, 0.08)' : '0 25px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.03) inset',
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        background: isLight ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)' : 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
                        border: '1px solid rgba(99, 102, 241, 0.2)',
                        marginBottom: '20px',
                    }}>
                        <Shield size={26} color="#6366f1" />
                    </div>
                    <h1 style={{
                        fontSize: '1.75rem',
                        fontWeight: 700,
                        color: isLight ? '#0f172a' : '#f9fafb',
                        marginBottom: '8px',
                        letterSpacing: '-0.02em',
                    }}>
                        Créer un compte
                    </h1>
                    <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
                        Rejoignez JL Cloud pour gérer vos documents.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div style={{
                        marginBottom: '24px',
                        padding: '14px 16px',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(239, 68, 68, 0.08)',
                        border: '1px solid rgba(239, 68, 68, 0.15)',
                        color: '#f87171',
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}>
                        <AlertCircle size={18} style={{ flexShrink: 0 }} />
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {/* Name */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '0.8rem',
                                fontWeight: 500,
                                color: isLight ? '#64748b' : '#9ca3af',
                                marginBottom: '8px',
                                marginLeft: '2px',
                            }}>
                                Nom complet
                            </label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={iconStyle('name')} />
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    style={inputStyle('name')}
                                    placeholder="Jean Dupont"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '0.8rem',
                                fontWeight: 500,
                                color: isLight ? '#64748b' : '#9ca3af',
                                marginBottom: '8px',
                                marginLeft: '2px',
                            }}>
                                Email
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={iconStyle('email')} />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    style={inputStyle('email')}
                                    placeholder="jean@exemple.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '0.8rem',
                                fontWeight: 500,
                                color: isLight ? '#64748b' : '#9ca3af',
                                marginBottom: '8px',
                                marginLeft: '2px',
                            }}>
                                Mot de passe
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={iconStyle('password')} />
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    style={inputStyle('password')}
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '0.8rem',
                                fontWeight: 500,
                                color: isLight ? '#64748b' : '#9ca3af',
                                marginBottom: '8px',
                                marginLeft: '2px',
                            }}>
                                Confirmer mot de passe
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={iconStyle('confirmPassword')} />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('confirmPassword')}
                                    onBlur={() => setFocusedField(null)}
                                    style={inputStyle('confirmPassword')}
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            marginTop: '28px',
                            padding: '14px',
                            borderRadius: '12px',
                            border: 'none',
                            background: loading ? 'rgba(99, 102, 241, 0.5)' : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                            color: '#fff',
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            cursor: loading ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            transition: 'all 0.3s ease',
                            boxShadow: loading ? 'none' : '0 4px 14px rgba(99, 102, 241, 0.35)',
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.4)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!loading) {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 14px rgba(99, 102, 241, 0.35)';
                            }
                        }}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Création en cours...
                            </>
                        ) : (
                            <>
                                S&apos;inscrire
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    margin: '28px 0',
                }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.06)' }} />
                    <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>ou</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.06)' }} />
                </div>

                {/* Link */}
                <div style={{ textAlign: 'center', fontSize: '0.9rem', color: '#9ca3af' }}>
                    Déjà un compte ?{" "}
                    <Link
                        href="/auth/signin"
                        style={{
                            color: '#818cf8',
                            fontWeight: 500,
                            textDecoration: 'none',
                            transition: 'color 0.2s',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#a5b4fc'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#818cf8'; }}
                    >
                        Se connecter
                    </Link>
                </div>
            </div>
        </div>
    );
}
