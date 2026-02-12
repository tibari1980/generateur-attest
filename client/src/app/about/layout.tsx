import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "À propos de nous",
    description: "Découvrez la mission de JL Cloud : simplifier vos démarches administratives grâce à la technologie.",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
