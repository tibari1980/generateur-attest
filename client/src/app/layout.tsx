import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jl-cloud.com'),
  title: {
    default: "JL Cloud | Générateur d'Attestations et Documents Administratifs Gratuits",
    template: "%s | JL Cloud"
  },
  description: "Créez vos attestations en ligne gratuitement : Attestation d'hébergement, de travail, sur l'honneur, quittance de loyer, certificat de scolarité. Simple, rapide, sécurisé et sans inscription.",
  keywords: [
    "générateur attestation gratuit",
    "attestation hébergement",
    "attestation sur l'honneur",
    "attestation travail",
    "quittance de loyer",
    "certificat de scolarité",
    "attestation de salaire",
    "attestation pôle emploi",
    "attestation de stage",
    "documents administratifs pdf",
    "lettre de recommandation",
    "justificatif de domicile",
    "attestation de fin de bail",
    "attestation loyer à jour",
    "jl cloud"
  ],
  authors: [{ name: "JL Cloud Team" }],
  creator: "JL Cloud",
  publisher: "JL Cloud",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://jl-cloud.com",
    siteName: "JL Cloud",
    title: "JL Cloud | Générateur d'Attestations et Documents Administratifs",
    description: "La solution la plus simple pour générer vos documents administratifs en ligne. 100% Gratuit et Sécurisé.",
    images: ["/og-image.png"], // Placeholder, even if not present, useful for future
  },
  twitter: {
    card: "summary_large_image",
    title: "JL Cloud | Vos documents administratifs en 2 clics",
    description: "Générez vos attestations (Hébergement, Travail, Loyer...) en quelques secondes.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "verification_token", // Placeholder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`} suppressHydrationWarning>
        <AuthProvider>
          <ThemeProvider>
            <Header />
            <main className="flex-1 w-full flex flex-col items-center relative z-0">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

