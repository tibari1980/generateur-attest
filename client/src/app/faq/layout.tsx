import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "FAQ - Questions Fréquentes",
    description: "Trouvez les réponses à vos questions sur JL Cloud : gratuité, sécurité des données, validité juridique et compatibilité mobile.",
};

export default function FAQLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
