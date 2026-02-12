"use client";

import { Cloud, FileText } from "lucide-react";
import { motion } from "framer-motion";

interface LogoProps {
    size?: number;
    showText?: boolean;
    isLight?: boolean;
}

export default function Logo({ size = 40, showText = false, isLight = false }: LogoProps) {
    const iconSize = Math.floor(size * 0.55);

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                style={{
                    position: 'relative',
                    width: `${size}px`,
                    height: `${size}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                }}>
                {/* Main Gradient Background */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)',
                    borderRadius: `${size * 0.28}px`,
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                    zIndex: -1,
                }} />

                {/* Glass Layer */}
                <div style={{
                    position: 'absolute',
                    inset: '2px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(4px)',
                    borderRadius: `${size * 0.25}px`,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    zIndex: 0,
                }} />

                {/* Combined Icons */}
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Cloud
                        size={iconSize + 4}
                        strokeWidth={2}
                        color="rgba(255,255,255,0.7)"
                        style={{ position: 'absolute' }}
                    />
                    <FileText
                        size={iconSize}
                        strokeWidth={2.5}
                        color="#fff"
                        style={{ position: 'relative', bottom: '-2px' }}
                    />
                </div>

                {/* Decorative Sparkle */}
                <motion.div
                    animate={{
                        opacity: [0.4, 1, 0.4],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        position: 'absolute',
                        top: '10%',
                        right: '10%',
                        width: '6px',
                        height: '6px',
                        background: '#fff',
                        borderRadius: '50%',
                        boxShadow: '0 0 10px #fff',
                        zIndex: 3
                    }}
                />
            </motion.div>

            {showText && (
                <span style={{
                    fontSize: `${size * 0.45}px`,
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: isLight ? '#111827' : '#ffffff',
                    fontFamily: "'Inter', sans-serif"
                }}>
                    JL Cloud
                </span>
            )}
        </div>
    );
}
