"use client";

import { X, Send } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import StarRating from "./StarRating";
import { submitTestimonial } from "@/services/testimonials";

import { useAuth } from "@/context/AuthContext";

interface TestimonialFormProps {
    onClose: () => void;
    onSuccess?: () => void;
}

export default function TestimonialForm({ onClose, onSuccess }: TestimonialFormProps) {
    const { theme } = useTheme();
    const { user } = useAuth();
    const isLight = theme === "light";

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        email: "",
        rating: 0,
        comment: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = "Le nom est requis";
        } else if (formData.name.length < 2) {
            newErrors.name = "Le nom doit contenir au moins 2 caractères";
        }

        if (!formData.role.trim()) {
            newErrors.role = "Le rôle/profession est requis";
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email invalide";
        }

        if (formData.rating === 0) {
            newErrors.rating = "Veuillez sélectionner une note";
        }

        if (!formData.comment.trim()) {
            newErrors.comment = "Le commentaire est requis";
        } else if (formData.comment.length < 10) {
            newErrors.comment = "Le commentaire doit contenir au moins 10 caractères";
        } else if (formData.comment.length > 500) {
            newErrors.comment = "Le commentaire ne doit pas dépasser 500 caractères";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitMessage(null);

        const payload: any = {
            name: formData.name.trim(),
            role: formData.role.trim(),
            rating: formData.rating,
            comment: formData.comment.trim(),
        };

        if (formData.email.trim()) {
            payload.email = formData.email.trim();
        }

        if (user) {
            payload.userId = user.uid;
        }

        const result = await submitTestimonial(payload);

        setIsSubmitting(false);

        if (result.success) {
            setSubmitMessage({ type: 'success', text: result.message });
            setTimeout(() => {
                onSuccess?.();
                onClose();
            }, 2000);
        } else {
            setSubmitMessage({ type: 'error', text: result.message });
        }
    };

    const handleChange = (field: string, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem',
        }} onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()} style={{
                background: isLight ? '#ffffff' : '#1f2937',
                borderRadius: '1.5rem',
                padding: '2.5rem',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
                border: isLight ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--muted)',
                        transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--foreground)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}
                >
                    <X size={24} />
                </button>

                {/* Header */}
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{
                        fontSize: '1.875rem',
                        fontWeight: 800,
                        color: 'var(--foreground)',
                        marginBottom: '0.5rem',
                    }}>
                        Partagez votre <span className="text-gradient">expérience</span>
                    </h2>
                    <p style={{
                        color: 'var(--muted)',
                        fontSize: '0.95rem',
                    }}>
                        Votre avis nous aide à améliorer nos services
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            color: 'var(--foreground)',
                        }}>
                            Nom complet <span style={{ color: '#ef4444' }}>*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="Marie Dupont"
                            style={{
                                width: '100%',
                                padding: '0.875rem 1rem',
                                borderRadius: '0.75rem',
                                border: errors.name
                                    ? '2px solid #ef4444'
                                    : isLight ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.1)',
                                background: isLight ? '#f9fafb' : '#111827',
                                color: 'var(--foreground)',
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: 'all 0.2s',
                            }}
                            onFocus={(e) => {
                                if (!errors.name) {
                                    e.currentTarget.style.borderColor = '#6366f1';
                                }
                            }}
                            onBlur={(e) => {
                                if (!errors.name) {
                                    e.currentTarget.style.borderColor = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';
                                }
                            }}
                        />
                        {errors.name && (
                            <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Role */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            color: 'var(--foreground)',
                        }}>
                            Profession / Rôle <span style={{ color: '#ef4444' }}>*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.role}
                            onChange={(e) => handleChange('role', e.target.value)}
                            placeholder="Consultante RH"
                            style={{
                                width: '100%',
                                padding: '0.875rem 1rem',
                                borderRadius: '0.75rem',
                                border: errors.role
                                    ? '2px solid #ef4444'
                                    : isLight ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.1)',
                                background: isLight ? '#f9fafb' : '#111827',
                                color: 'var(--foreground)',
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: 'all 0.2s',
                            }}
                            onFocus={(e) => {
                                if (!errors.role) {
                                    e.currentTarget.style.borderColor = '#6366f1';
                                }
                            }}
                            onBlur={(e) => {
                                if (!errors.role) {
                                    e.currentTarget.style.borderColor = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';
                                }
                            }}
                        />
                        {errors.role && (
                            <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                                {errors.role}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            color: 'var(--foreground)',
                        }}>
                            Email <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(optionnel)</span>
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="marie.dupont@example.com"
                            style={{
                                width: '100%',
                                padding: '0.875rem 1rem',
                                borderRadius: '0.75rem',
                                border: errors.email
                                    ? '2px solid #ef4444'
                                    : isLight ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.1)',
                                background: isLight ? '#f9fafb' : '#111827',
                                color: 'var(--foreground)',
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: 'all 0.2s',
                            }}
                            onFocus={(e) => {
                                if (!errors.email) {
                                    e.currentTarget.style.borderColor = '#6366f1';
                                }
                            }}
                            onBlur={(e) => {
                                if (!errors.email) {
                                    e.currentTarget.style.borderColor = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';
                                }
                            }}
                        />
                        {errors.email && (
                            <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Rating */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.75rem',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            color: 'var(--foreground)',
                        }}>
                            Votre note <span style={{ color: '#ef4444' }}>*</span>
                        </label>
                        <StarRating
                            rating={formData.rating}
                            onRatingChange={(rating) => handleChange('rating', rating)}
                            size={32}
                        />
                        {errors.rating && (
                            <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                                {errors.rating}
                            </p>
                        )}
                    </div>

                    {/* Comment */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            color: 'var(--foreground)',
                        }}>
                            Votre avis <span style={{ color: '#ef4444' }}>*</span>
                        </label>
                        <textarea
                            value={formData.comment}
                            onChange={(e) => handleChange('comment', e.target.value)}
                            placeholder="Partagez votre expérience avec JL Cloud..."
                            rows={5}
                            style={{
                                width: '100%',
                                padding: '0.875rem 1rem',
                                borderRadius: '0.75rem',
                                border: errors.comment
                                    ? '2px solid #ef4444'
                                    : isLight ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.1)',
                                background: isLight ? '#f9fafb' : '#111827',
                                color: 'var(--foreground)',
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: 'all 0.2s',
                                resize: 'vertical',
                                fontFamily: 'inherit',
                            }}
                            onFocus={(e) => {
                                if (!errors.comment) {
                                    e.currentTarget.style.borderColor = '#6366f1';
                                }
                            }}
                            onBlur={(e) => {
                                if (!errors.comment) {
                                    e.currentTarget.style.borderColor = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';
                                }
                            }}
                        />
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '0.25rem',
                        }}>
                            {errors.comment ? (
                                <p style={{ color: '#ef4444', fontSize: '0.8rem' }}>
                                    {errors.comment}
                                </p>
                            ) : (
                                <span></span>
                            )}
                            <span style={{
                                fontSize: '0.8rem',
                                color: 'var(--muted)',
                            }}>
                                {formData.comment.length}/500
                            </span>
                        </div>
                    </div>

                    {/* Submit Message */}
                    {submitMessage && (
                        <div style={{
                            padding: '1rem',
                            borderRadius: '0.75rem',
                            marginBottom: '1.5rem',
                            background: submitMessage.type === 'success'
                                ? 'rgba(16, 185, 129, 0.1)'
                                : 'rgba(239, 68, 68, 0.1)',
                            border: `1px solid ${submitMessage.type === 'success' ? '#10b981' : '#ef4444'}`,
                            color: submitMessage.type === 'success' ? '#10b981' : '#ef4444',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                        }}>
                            {submitMessage.text}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            borderRadius: '0.75rem',
                            border: 'none',
                            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                            color: '#ffffff',
                            fontSize: '1rem',
                            fontWeight: 700,
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            opacity: isSubmitting ? 0.6 : 1,
                            transition: 'all 0.3s',
                        }}
                    >
                        {isSubmitting ? (
                            <>
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    border: '3px solid rgba(255,255,255,0.3)',
                                    borderTop: '3px solid #ffffff',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite',
                                }}></div>
                                Envoi en cours...
                            </>
                        ) : (
                            <>
                                <Send size={20} />
                                Envoyer mon avis
                            </>
                        )}
                    </button>
                </form>

                <style jsx>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        </div>
    );
}
