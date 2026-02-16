import { Briefcase, GraduationCap, Home, User, Car, Heart, ShieldCheck, Mail } from "lucide-react";

export interface AttestationType {
    id: string;
    title: string;
    description: string;
    category: string;
    icon: any;
    isPopular?: boolean;
}

export const ATTESTATION_CATEGORIES = [
    { id: 'all', title: 'Tous', icon: null },
    { id: 'prefecture', title: 'Préfecture / Titre de séjour', icon: ShieldCheck },
    { id: 'travail', title: 'Travail / Employeur', icon: Briefcase },
    { id: 'vie_personnelle', title: 'Vie personnelle', icon: User },
    { id: 'etudes', title: 'Études / Formation', icon: GraduationCap },
    { id: 'domicile', title: 'Domicile / Hébergement', icon: Home },
];

export const ATTESTATIONS: AttestationType[] = [
    {
        id: "attestation_travail",
        title: "Attestation de Travail",
        description: "Certifie qu'un employé travaille ou a travaillé dans une entreprise.",
        category: "travail",
        icon: Briefcase,
        isPopular: true
    },
    {
        id: "attestation_stage",
        title: "Attestation de Stage",
        description: "Document certifiant la réalisation d'un stage au sein d'un organisme.",
        category: "travail",
        icon: GraduationCap
    },
    {
        id: "attestation_honneur",
        title: "Attestation sur l'Honneur",
        description: "Déclaration simplifiée pour certifier un fait ou une situation.",
        category: "vie_personnelle",
        icon: ShieldCheck,
        isPopular: true
    },
    {
        id: "justificatif_domicile",
        title: "Justificatif de Domicile",
        description: "Document attestant de votre lieu de résidence habituelle.",
        category: "domicile",
        icon: Home,
        isPopular: true
    },
    {
        id: "certificat_scolarite",
        title: "Certificat de Scolarité",
        description: "Preuve d'inscription dans un établissement d'enseignement.",
        category: "etudes",
        icon: GraduationCap
    },
    {
        id: "lettre_recommandation",
        title: "Lettre de Recommandation",
        description: "Soutien pour une candidature basé sur votre expérience passée.",
        category: "travail",
        icon: Mail
    },
    {
        id: "attestation_hebergement",
        title: "Attestation d'Hébergement",
        description: "Certifie que vous hébergez quelqu'un à votre domicile.",
        category: "domicile",
        icon: Home,
        isPopular: true
    },
    {
        id: "attestation_vie_commune",
        title: "Attestation de vie commune",
        description: "Document pour prouver une vie de couple, souvent pour la préfecture.",
        category: "prefecture",
        icon: Heart,
        isPopular: true
    }
];
