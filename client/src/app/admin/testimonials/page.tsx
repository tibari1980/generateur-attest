"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
    getAllTestimonials,
    updateTestimonialStatus,
    deleteTestimonial,
    Testimonial
} from "@/services/testimonials";
import StarRating from "@/components/StarRating";
import { Check, X, Trash2, Clock, CheckCircle, XCircle } from "lucide-react";

export default function AdminTestimonialsPage() {
    const { theme } = useTheme();
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const isLight = theme === "light";

    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
    const [processingId, setProcessingId] = useState<string | null>(null);

    useEffect(() => {
        // Redirect if not authenticated or not admin
        if (!authLoading) {
            if (!user) {
                router.push('/auth/signin');
            } else if (user.email !== 'tibarinewdzign@gmail.com') {
                router.push('/'); // Redirect unauthorized users to home
            }
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user) {
            loadTestimonials();
        }
    }, [user]);

    const loadTestimonials = async () => {
        setIsLoading(true);
        const data = await getAllTestimonials();
        setTestimonials(data);
        setIsLoading(false);
    };

    const handleApprove = async (id: string) => {
        setProcessingId(id);
        const result = await updateTestimonialStatus(id, 'approved');
        if (result.success) {
            await loadTestimonials();
        }
        setProcessingId(null);
    };

    const handleReject = async (id: string) => {
        setProcessingId(id);
        const result = await updateTestimonialStatus(id, 'rejected');
        if (result.success) {
            await loadTestimonials();
        }
        setProcessingId(null);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) return;

        setProcessingId(id);
        const result = await deleteTestimonial(id);
        if (result.success) {
            await loadTestimonials();
        }
        setProcessingId(null);
    };

    const filteredTestimonials = testimonials.filter(t => {
        if (filter === 'all') return true;
        return t.status === filter;
    });

    const getStatusBadge = (status: string) => {
        const styles = {
            pending: { bg: 'rgba(251, 191, 36, 0.1)', border: '#f59e0b', color: '#f59e0b', icon: Clock },
            approved: { bg: 'rgba(16, 185, 129, 0.1)', border: '#10b981', color: '#10b981', icon: CheckCircle },
            rejected: { bg: 'rgba(239, 68, 68, 0.1)', border: '#ef4444', color: '#ef4444', icon: XCircle },
        };

        const style = styles[status as keyof typeof styles];
        const Icon = style.icon;

        return (
            <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                padding: '0.375rem 0.75rem',
                borderRadius: '9999px',
                background: style.bg,
                border: `1px solid ${style.border}`,
                color: style.color,
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'capitalize',
            }}>
                <Icon size={14} />
                {status === 'pending' ? 'En attente' : status === 'approved' ? 'Approuvé' : 'Rejeté'}
            </span>
        );
    };

    if (authLoading || !user) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    border: '4px solid rgba(99, 102, 241, 0.2)',
                    borderTop: '4px solid #6366f1',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                }}></div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            padding: '2rem 1rem',
            background: isLight ? '#f9fafb' : '#0f172a',
        }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{
                        fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                        fontWeight: 800,
                        color: 'var(--foreground)',
                        marginBottom: '0.5rem',
                    }}>
                        Gestion des <span className="text-gradient">Témoignages</span>
                    </h1>
                    <p style={{ color: 'var(--muted)', fontSize: '1rem' }}>
                        Modérez et gérez les avis des utilisateurs
                    </p>
                </div>

                {/* Filters */}
                <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    marginBottom: '2rem',
                    flexWrap: 'wrap',
                }}>
                    {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: '0.625rem 1.25rem',
                                borderRadius: '0.5rem',
                                border: filter === f
                                    ? '2px solid #6366f1'
                                    : isLight ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.1)',
                                background: filter === f
                                    ? 'rgba(99, 102, 241, 0.1)'
                                    : isLight ? '#ffffff' : '#1f2937',
                                color: filter === f ? '#6366f1' : 'var(--foreground)',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                textTransform: 'capitalize',
                            }}
                        >
                            {f === 'all' ? 'Tous' : f === 'pending' ? 'En attente' : f === 'approved' ? 'Approuvés' : 'Rejetés'}
                            {' '}
                            ({testimonials.filter(t => f === 'all' || t.status === f).length})
                        </button>
                    ))}
                </div>

                {/* Testimonials List */}
                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '4rem' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            border: '4px solid rgba(99, 102, 241, 0.2)',
                            borderTop: '4px solid #6366f1',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            margin: '0 auto',
                        }}></div>
                    </div>
                ) : filteredTestimonials.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '4rem 2rem',
                        background: isLight ? '#ffffff' : '#1f2937',
                        borderRadius: '1rem',
                        border: isLight ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.1)',
                    }}>
                        <p style={{ color: 'var(--muted)', fontSize: '1.1rem' }}>
                            Aucun témoignage {filter !== 'all' ? `${filter === 'pending' ? 'en attente' : filter === 'approved' ? 'approuvé' : 'rejeté'}` : ''}
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {filteredTestimonials.map((testimonial) => (
                            <div key={testimonial.id} style={{
                                padding: '1.5rem',
                                borderRadius: '1rem',
                                background: isLight ? '#ffffff' : '#1f2937',
                                border: isLight ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.1)',
                                opacity: processingId === testimonial.id ? 0.6 : 1,
                                transition: 'all 0.3s',
                            }}>
                                {/* Header */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '1rem',
                                    flexWrap: 'wrap',
                                    gap: '1rem',
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            marginBottom: '0.5rem',
                                        }}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                background: testimonial.gradient || 'linear-gradient(135deg, #6366f1, #a855f7)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#fff',
                                                fontWeight: 700,
                                                fontSize: '1rem',
                                            }}>
                                                {testimonial.initial || testimonial.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div style={{
                                                    fontWeight: 600,
                                                    fontSize: '1rem',
                                                    color: 'var(--foreground)',
                                                }}>
                                                    {testimonial.name}
                                                </div>
                                                <div style={{
                                                    fontSize: '0.85rem',
                                                    color: 'var(--muted)',
                                                }}>
                                                    {testimonial.role}
                                                    {testimonial.email && ` • ${testimonial.email}`}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ marginBottom: '0.5rem' }}>
                                            <StarRating rating={testimonial.rating} readonly size={16} />
                                        </div>
                                    </div>
                                    <div>
                                        {getStatusBadge(testimonial.status)}
                                    </div>
                                </div>

                                {/* Comment */}
                                <p style={{
                                    fontSize: '0.95rem',
                                    lineHeight: 1.6,
                                    color: 'var(--foreground)',
                                    marginBottom: '1rem',
                                    fontStyle: 'italic',
                                }}>
                                    "{testimonial.comment}"
                                </p>

                                {/* Date */}
                                <div style={{
                                    fontSize: '0.8rem',
                                    color: 'var(--muted)',
                                    marginBottom: '1rem',
                                }}>
                                    Soumis le {testimonial.createdAt instanceof Date
                                        ? testimonial.createdAt.toLocaleDateString('fr-FR')
                                        : new Date(testimonial.createdAt.seconds * 1000).toLocaleDateString('fr-FR')}
                                </div>

                                {/* Actions */}
                                <div style={{
                                    display: 'flex',
                                    gap: '0.75rem',
                                    flexWrap: 'wrap',
                                }}>
                                    {testimonial.status !== 'approved' && (
                                        <button
                                            onClick={() => handleApprove(testimonial.id!)}
                                            disabled={processingId === testimonial.id}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                borderRadius: '0.5rem',
                                                border: '1px solid #10b981',
                                                background: 'rgba(16, 185, 129, 0.1)',
                                                color: '#10b981',
                                                fontSize: '0.875rem',
                                                fontWeight: 600,
                                                cursor: processingId === testimonial.id ? 'not-allowed' : 'pointer',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                transition: 'all 0.2s',
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'}
                                        >
                                            <Check size={16} />
                                            Approuver
                                        </button>
                                    )}
                                    {testimonial.status !== 'rejected' && (
                                        <button
                                            onClick={() => handleReject(testimonial.id!)}
                                            disabled={processingId === testimonial.id}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                borderRadius: '0.5rem',
                                                border: '1px solid #f59e0b',
                                                background: 'rgba(245, 158, 11, 0.1)',
                                                color: '#f59e0b',
                                                fontSize: '0.875rem',
                                                fontWeight: 600,
                                                cursor: processingId === testimonial.id ? 'not-allowed' : 'pointer',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                transition: 'all 0.2s',
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(245, 158, 11, 0.2)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(245, 158, 11, 0.1)'}
                                        >
                                            <X size={16} />
                                            Rejeter
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(testimonial.id!)}
                                        disabled={processingId === testimonial.id}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            borderRadius: '0.5rem',
                                            border: '1px solid #ef4444',
                                            background: 'rgba(239, 68, 68, 0.05)',
                                            color: '#ef4444',
                                            fontSize: '0.875rem',
                                            fontWeight: 600,
                                            cursor: processingId === testimonial.id ? 'not-allowed' : 'pointer',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            transition: 'all 0.2s',
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)'}
                                    >
                                        <Trash2 size={16} />
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
