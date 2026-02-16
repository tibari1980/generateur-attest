import { Briefcase, GraduationCap, Home, User, Car, Heart, ShieldCheck, Mail, Scale, GitCompare, MapPin, FileSignature, Banknote, Laptop, Gavel, Key, HeartCrack, CalendarCheck, Award, ClipboardCheck, Receipt, LogOut } from "lucide-react";

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
        id: "attestation_promesse_embauche",
        title: "Promesse d'Embauche",
        description: "Document formalisant l'intention d'embaucher un candidat (avant contrat).",
        category: "travail",
        icon: FileSignature,
        isPopular: true
    },
    {
        id: "attestation_salaire",
        title: "Attestation de Salaire",
        description: "Certifie le niveau de rémunération (pour location, prêt, etc.).",
        category: "travail",
        icon: Banknote,
        isPopular: true
    },
    {
        id: "attestation_teletravail",
        title: "Attestation de Télétravail",
        description: "Autorisation formelle de travailler à distance (jours, lieux).",
        category: "travail",
        icon: Laptop,
        isPopular: false
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
        id: "attestation_temoin",
        title: "Témoignage (Article 202)",
        description: "Attestation officielle pour la justice (divorce, conflit...).",
        category: "vie_personnelle",
        icon: Gavel,
        isPopular: false
    },
    {
        id: "attestation_procuration",
        title: "Procuration",
        description: "Donner pouvoir à un tiers pour agir en votre nom (banque, colis...).",
        category: "vie_personnelle",
        icon: Key,
        isPopular: true
    },
    {
        id: "attestation_separation",
        title: "Attestation de Séparation",
        description: "Déclaration de rupture de vie commune (CAF, Impôts).",
        category: "vie_personnelle",
        icon: HeartCrack,
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
        id: "attestation_assiduite",
        title: "Attestation d'Assiduité",
        description: "Prouve la présence effective à une formation ou des cours (CROUS, Pôle Emploi).",
        category: "etudes",
        icon: CalendarCheck,
        isPopular: true
    },
    {
        id: "attestation_reussite",
        title: "Attestation de Réussite",
        description: "Certificat provisoire de diplôme (avant remise du parchemin).",
        category: "etudes",
        icon: Award,
        isPopular: true
    },
    {
        id: "attestation_examen",
        title: "Présence aux Examens",
        description: "Justificatif d'absence pour l'employeur lors d'épreuves.",
        category: "etudes",
        icon: ClipboardCheck,
        isPopular: false
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
        id: "quittance_loyer",
        title: "Quittance de Loyer",
        description: "Reçu officiel attestant du paiement du loyer et des charges.",
        category: "domicile",
        icon: Receipt,
        isPopular: true
    },
    {
        id: "attestation_loyer_ajour",
        title: "Attestation de Loyer à jour",
        description: "Prouve la régularité des paiements (dossier location).",
        category: "domicile",
        icon: ShieldCheck,
        isPopular: true
    },
    {
        id: "attestation_fin_bail",
        title: "Attestation de Fin de Bail",
        description: "Confirme le départ du locataire et la remise des clés.",
        category: "domicile",
        icon: LogOut,
        isPopular: false
    },
    {
        id: "attestation_vie_commune",
        title: "Attestation de vie commune",
        description: "Document pour prouver une vie de couple, souvent pour la préfecture.",
        category: "prefecture",
        icon: Heart,
        isPopular: true
    },
    {
        id: "attestation_financiere",
        title: "Prise en charge financière",
        description: "Engagement à subvenir aux besoins d'un proche (étudiant, famille).",
        category: "prefecture",
        icon: ShieldCheck,
        isPopular: false
    },
    {
        id: "attestation_non_polygamie",
        title: "Attestation de non-polygamie",
        description: "Déclaration sur l'honneur de non-polygamie pour les démarches administratives.",
        category: "prefecture",
        icon: User,
        isPopular: false
    },
    {
        id: "attestation_residence",
        title: "Attestation de Résidence",
        description: "Certifie que vous résidez effectivement à une adresse donnée (hors hébergement).",
        category: "prefecture",
        icon: MapPin,
        isPopular: true
    },
    {
        id: "attestation_respect_principes",
        title: "Respect des Principes",
        description: "Engagement obligatoire pour les demandes de titre de séjour (valeurs républicaines).",
        category: "prefecture",
        icon: Scale,
        isPopular: true
    },
    {
        id: "attestation_concordance",
        title: "Concordance d'Identité",
        description: "Pour justifier des différences d'orthographe ou de nom entre deux documents.",
        category: "prefecture",
        icon: GitCompare,
        isPopular: false
    }
];
