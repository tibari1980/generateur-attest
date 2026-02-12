import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contactez-nous",
    description: "Une question ? Besoin d'aide pour vos attestations ? Contactez l'équipe JL Cloud.",
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
