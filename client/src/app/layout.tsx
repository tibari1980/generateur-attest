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
  metadataBase: new URL('https://jl-cloud.com'), // Remplacez par votre domaine réel
  title: {
    default: "JL Cloud | Vos documents administratifs simplifiés",
    template: "%s | JL Cloud"
  },
  description: "Générez vos attestations et documents administratifs en quelques secondes avec JL Cloud. Simple, rapide et sécurisé.",
  keywords: ["générateur attestation", "documents administratifs", "attestation employeur", "justificatif domicile", "jl cloud", "administration simplifiée"],
  authors: [{ name: "JL Cloud Team" }],
  creator: "JL Cloud",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://jl-cloud.com",
    siteName: "JL Cloud",
    title: "JL Cloud | Vos documents administratifs simplifiés",
    description: "La solution la plus simple pour générer vos documents administratifs en ligne.",
    images: [
      {
        url: "/og-image.jpg", // Assurez-vous d'avoir une image Open Graph
        width: 1200,
        height: 630,
        alt: "JL Cloud - Générateur de documents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JL Cloud | Vos documents administratifs simplifiés",
    description: "Générez vos attestations en quelques secondes.",
    images: ["/og-image.jpg"],
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

