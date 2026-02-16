import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Politique de Confidentialité",
    description: "Découvrez comment JL Cloud protège vos données personnelles. Aucune donnée n'est stockée sur nos serveurs, tout est traité localement.",
};

export default function PrivacyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
