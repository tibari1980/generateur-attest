import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "JL Cloud - Générateur de documents administratifs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #030712 0%, #1e1b4b 50%, #030712 100%)",
                    fontFamily: "sans-serif",
                }}
            >
                {/* Decorative orbs */}
                <div
                    style={{
                        position: "absolute",
                        top: "10%",
                        right: "15%",
                        width: "300px",
                        height: "300px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)",
                        filter: "blur(60px)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "10%",
                        left: "15%",
                        width: "250px",
                        height: "250px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 70%)",
                        filter: "blur(50px)",
                    }}
                />

                {/* Logo */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        marginBottom: "24px",
                    }}
                >
                    <div
                        style={{
                            width: "64px",
                            height: "64px",
                            borderRadius: "16px",
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: "28px",
                            fontWeight: "bold",
                            boxShadow: "0 0 40px rgba(99, 102, 241, 0.5)",
                        }}
                    >
                        JL
                    </div>
                    <div
                        style={{
                            fontSize: "48px",
                            fontWeight: "bold",
                            color: "white",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        JL Cloud
                    </div>
                </div>

                {/* Tagline */}
                <div
                    style={{
                        fontSize: "28px",
                        color: "#a5b4fc",
                        fontWeight: "500",
                        marginBottom: "16px",
                    }}
                >
                    Vos documents administratifs simplifiés
                </div>

                {/* Description */}
                <div
                    style={{
                        fontSize: "18px",
                        color: "#9ca3af",
                        maxWidth: "600px",
                        textAlign: "center",
                        lineHeight: "1.6",
                    }}
                >
                    Générez vos attestations en quelques secondes. Gratuit, rapide et sécurisé.
                </div>

                {/* Bottom bar */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "40px",
                        display: "flex",
                        alignItems: "center",
                        gap: "24px",
                        color: "#6b7280",
                        fontSize: "16px",
                    }}
                >
                    <span>✓ 100% Gratuit</span>
                    <span>•</span>
                    <span>✓ Sans inscription</span>
                    <span>•</span>
                    <span>✓ PDF instantané</span>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
