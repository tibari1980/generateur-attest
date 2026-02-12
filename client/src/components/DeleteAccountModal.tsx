"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Loader2, AlertTriangle, X, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DeleteAccountModal({ isOpen, onClose }: DeleteAccountModalProps) {
    const { deleteAccount } = useAuth();
    const [confirmationText, setConfirmationText] = useState("");
    const [password, setPassword] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Reset state when modal opens/closes
    useEffect(() => {
        if (!isOpen) {
            setConfirmationText("");
            setPassword("");
            setError(null);
            setIsDeleting(false);
        }
    }, [isOpen]);

    const confirmationKeyword = "supprimer";
    const isConfirmed = confirmationText.toLowerCase() === confirmationKeyword && password.length > 0;

    if (!isOpen || !mounted) return null;

    const handleDelete = async () => {
        if (!isConfirmed) return;
        setIsDeleting(true);
        setError(null);
        try {
            await deleteAccount(password);
            onClose();
        } catch (err: any) {
            console.error("Delete account error:", err);
            if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                setError("Mot de passe incorrect. Veuillez réessayer.");
            } else if (err.code === 'auth/too-many-requests') {
                setError("Trop de tentatives. Veuillez réessayer plus tard.");
            } else {
                setError(err.message || "Une erreur est survenue.");
            }
            setIsDeleting(false);
        }
    };

    const modalContent = (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
        }}>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(4px)',
                }}
            />

            {/* Modal */}
            <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '440px',
                backgroundColor: '#0a0a0b',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '16px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
                overflow: 'hidden',
            }}>
                {/* Header */}
                <div style={{
                    padding: '20px 24px',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'linear-gradient(to right, rgba(127, 29, 29, 0.15), transparent)',
                }}>
                    <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: '#f87171',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        margin: 0,
                    }}>
                        <div style={{
                            padding: '8px',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <AlertTriangle size={20} color="#ef4444" />
                        </div>
                        Suppression de compte
                    </h3>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#71717a',
                            cursor: 'pointer',
                            padding: '8px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                            e.currentTarget.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#71717a';
                        }}
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <p style={{ color: '#d4d4d8', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '12px' }}>
                            Vous êtes sur le point de supprimer votre compte. Cette action est{' '}
                            <strong style={{ color: '#fff' }}>irréversible</strong>.
                        </p>
                        <ul style={{
                            listStyle: 'disc',
                            paddingLeft: '20px',
                            fontSize: '0.875rem',
                            color: '#a1a1aa',
                            backgroundColor: 'rgba(255,255,255,0.03)',
                            padding: '12px 12px 12px 32px',
                            borderRadius: '8px',
                            border: '1px solid rgba(255,255,255,0.05)',
                            margin: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                        }}>
                            <li>Suppression de l&apos;historique</li>
                            <li>Suppression des attestations</li>
                            <li>Perte définitive des données</li>
                        </ul>
                    </div>

                    {/* Password field */}
                    <div>
                        <label style={{
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            color: '#a1a1aa',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginBottom: '8px',
                        }}>
                            <Lock size={12} />
                            Mot de passe
                        </label>
                        <p style={{ fontSize: '0.8rem', color: '#71717a', marginBottom: '10px' }}>
                            Entrez votre mot de passe pour vérifier votre identité.
                        </p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Votre mot de passe"
                            style={{
                                width: '100%',
                                backgroundColor: '#000',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '10px',
                                padding: '12px 16px',
                                color: '#fff',
                                fontSize: '0.875rem',
                                outline: 'none',
                                boxSizing: 'border-box',
                                transition: 'border-color 0.2s',
                            }}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)';
                                e.currentTarget.style.boxShadow = '0 0 0 2px rgba(99, 102, 241, 0.15)';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    {/* Confirmation field */}
                    <div>
                        <label style={{
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            color: '#a1a1aa',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            display: 'block',
                            marginBottom: '8px',
                        }}>
                            Confirmation
                        </label>
                        <p style={{ fontSize: '0.8rem', color: '#71717a', marginBottom: '10px' }}>
                            Tapez{' '}
                            <span style={{
                                color: '#f87171',
                                fontFamily: 'monospace',
                                backgroundColor: 'rgba(127, 29, 29, 0.2)',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                border: '1px solid rgba(127, 29, 29, 0.4)',
                                userSelect: 'all',
                            }}>
                                supprimer
                            </span>
                            {' '}pour confirmer.
                        </p>
                        <input
                            type="text"
                            value={confirmationText}
                            onChange={(e) => setConfirmationText(e.target.value)}
                            placeholder="supprimer"
                            style={{
                                width: '100%',
                                backgroundColor: '#000',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '10px',
                                padding: '12px 16px',
                                color: '#fff',
                                fontFamily: 'monospace',
                                fontSize: '0.875rem',
                                outline: 'none',
                                boxSizing: 'border-box',
                                transition: 'border-color 0.2s',
                            }}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                                e.currentTarget.style.boxShadow = '0 0 0 2px rgba(239, 68, 68, 0.15)';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    {error && (
                        <div style={{
                            backgroundColor: 'rgba(127, 29, 29, 0.2)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '10px',
                            padding: '12px',
                            fontSize: '0.875rem',
                            color: '#f87171',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '10px',
                        }}>
                            <AlertTriangle size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
                            <p style={{ margin: 0 }}>{error}</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div style={{
                    padding: '16px 24px',
                    backgroundColor: 'rgba(24, 24, 27, 0.5)',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '12px',
                }}>
                    <button
                        onClick={onClose}
                        disabled={isDeleting}
                        style={{
                            padding: '10px 16px',
                            borderRadius: '10px',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            color: '#a1a1aa',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                            e.currentTarget.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#a1a1aa';
                        }}
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={!isConfirmed || isDeleting}
                        style={{
                            padding: '10px 16px',
                            borderRadius: '10px',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            border: 'none',
                            cursor: isConfirmed && !isDeleting ? 'pointer' : 'not-allowed',
                            transition: 'all 0.2s',
                            backgroundColor: isConfirmed && !isDeleting ? '#dc2626' : 'rgba(255,255,255,0.05)',
                            color: isConfirmed && !isDeleting ? '#fff' : '#52525b',
                            boxShadow: isConfirmed && !isDeleting ? '0 4px 14px rgba(220, 38, 38, 0.3)' : 'none',
                        }}
                        onMouseEnter={(e) => {
                            if (isConfirmed && !isDeleting) {
                                e.currentTarget.style.backgroundColor = '#ef4444';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (isConfirmed && !isDeleting) {
                                e.currentTarget.style.backgroundColor = '#dc2626';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }
                        }}
                    >
                        {isDeleting ? <Loader2 size={16} className="animate-spin" /> : null}
                        Supprimer définitivement
                    </button>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
