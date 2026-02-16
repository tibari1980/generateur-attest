import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Conditions Générales d'Utilisation",
    description: "Consultez les conditions générales d'utilisation de JL Cloud. Informations sur les services, responsabilités et propriété intellectuelle.",
};

export default function TermsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
