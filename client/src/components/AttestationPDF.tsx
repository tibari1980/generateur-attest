import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { getDocumentTitle, getFormattedDate } from '../utils/attestationUtils';

// Register fonts if needed, otherwise use built-in Helvetica
// Font.register({ family: 'Roboto', src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf' });

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 40, // Reduced from 50
        fontFamily: 'Helvetica',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20, // Reduced from 40
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        paddingBottom: 10, // Reduced from 20
    },
    logo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4F46E5', // Indigo-600
    },
    date: {
        fontSize: 10,
        color: '#6B7280', // Gray-500
        textAlign: 'right',
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30, // Reduced from 40
        textTransform: 'uppercase',
        textDecoration: 'underline',
    },
    content: {
        fontSize: 11, // Reduced from 12
        lineHeight: 1.5, // Reduced from 1.8
        marginBottom: 15, // Reduced from 20
        textAlign: 'justify',
    },
    bold: {
        fontWeight: 'bold',
        fontFamily: 'Helvetica-Bold',
    },
    signatureContainer: {
        marginTop: 40, // Reduced from 60
        alignSelf: 'flex-end',
        width: 200,
    },
    signatureText: {
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: 'Helvetica-Bold',
    },
    signatureBox: {
        height: 80,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#D1D5DB', // Gray-300
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9FAFB', // Gray-50
    },
    signaturePlaceholder: {
        fontSize: 10,
        color: '#9CA3AF', // Gray-400
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 50,
        right: 50,
        textAlign: 'center',
        fontSize: 8,
        color: '#9CA3AF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingTop: 10,
    },
});

interface AttestationPDFProps {
    data: {
        documentType: string;
        civility?: string;
        nom: string;
        prenom: string;
        dateNaissance?: string;
        lieuNaissance?: string;
        poste: string;
        entreprise: string;
        dateDebut: string;
        dateFin?: string;
        address?: string;
        representativeName?: string;
        establishment?: string;
        level?: string;
        academicYear?: string;
        recommenderPosition?: string;
        relation?: string;
        hostDob?: string;
        hostPob?: string;
        hostedDob?: string;
        hostedPob?: string;
        partnerName?: string;
        partnerFirstname?: string;
        partnerDob?: string;
        partnerPob?: string;
        nationality?: string;
        partnerNationality?: string;
        relationshipType?: string;
        city?: string;
        signatureDate?: string;
    };
}

// Helper to format subject string
const getSubjectString = (data: any) => {
    const civility = data.civility === "Madame" ? "Mme" : "M.";
    let subject = `${civility} ${data.prenom || "[Prénom]"} ${data.nom || "[Nom]"}`;

    if (data.dateNaissance && data.lieuNaissance) {
        const dateParts = data.dateNaissance.split('-');
        const formattedDate = dateParts.length === 3 ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` : data.dateNaissance;
        subject += `, né(e) le ${formattedDate} à ${data.lieuNaissance}`;
    }

    return subject;
};

const getPdfContent = (type: string, data: any) => {
    const subjectString = getSubjectString(data);

    // Helper to format a date string from YYYY-MM-DD to DD/MM/YYYY
    const formatDate = (d: string) => d ? d.split('-').reverse().join('/') : "[Date]";

    switch (type) {
        case "attestation_travail":
            return {
                title: "ATTESTATION DE TRAVAIL",
                intro: `Je soussigné(e), ${data.representativeName || "[Nom du Représentant]"}, agissant en qualité de Directeur chez ${data.entreprise || "[Nom de l'entreprise]"}, certifie que :`,
                subject: subjectString,
                details: `Est employé(e) au sein de notre société en qualité de ${data.poste || "[Poste Occupé]"} depuis le ${formatDate(data.dateDebut)}${data.dateFin ? ` jusqu'au ${formatDate(data.dateFin)}` : " et est toujours en poste à ce jour"}.`,
            };

        case "attestation_stage":
            return {
                title: "ATTESTATION DE STAGE",
                intro: `Je soussigné(e), ${data.representativeName || "[Nom du Représentant]"}, agissant en qualité de Directeur chez ${data.entreprise || "[Nom de l'entreprise]"}, atteste que :`,
                subject: `${data.civility === "Madame" ? "L'étudiante" : "L'étudiant"} ${data.prenom || "[Prénom]"} ${data.nom || "[Nom]"}${(data.dateNaissance && data.lieuNaissance) ? `, né(e) le ${formatDate(data.dateNaissance)} à ${data.lieuNaissance}` : ""}`,
                details: `A effectué un stage conventionné au sein de notre entreprise en tant que ${data.poste || "[Poste Occupé]"} du ${formatDate(data.dateDebut)} au ${formatDate(data.dateFin)}.`,
            };

        case "justificatif_domicile":
            return {
                title: "JUSTIFICATIF DE DOMICILE",
                intro: `Je soussigné(e), ${data.representativeName || "[Nom du Hébergeant]"}, demeurant à ${data.address || "[Adresse du logement]"}, atteste sur l'honneur héberger à titre gratuit :`,
                subject: subjectString,
                details: `A mon domicile ci-dessus mentionné, et ce depuis le ${formatDate(data.dateDebut)}.`,
            };

        case "attestation_honneur":
            return {
                title: "ATTESTATION SUR L'HONNEUR",
                intro: "",
                subject: "",
                details: `Je soussigné(e), ${subjectString},\n` +
                    `demeurant à ${data.address || "[Adresse complète]"},\n\n` +
                    `Atteste sur l'honneur l'exactitude des faits suivants :\n\n` +
                    `Que j'exerce la profession de ${data.poste || "[Profession]"} au sein de l'entreprise ${data.entreprise || "[Entreprise]"} depuis le ${formatDate(data.dateDebut)}.\n\n` +
                    `J'ai connaissance des sanctions pénales encourues par l'auteur d'une fausse attestation.`,
            };

        case "certificat_scolarite":
            return {
                title: "CERTIFICAT DE SCOLARITÉ",
                intro: `Le Directeur de l'établissement ${data.establishment || "[Nom de l'établissement]"} certifie que :`,
                subject: `${data.civility === "Madame" ? "L'étudiante" : "L'étudiant"} ${data.prenom || "[Prénom]"} ${data.nom || "[Nom]"}${(data.dateNaissance && data.lieuNaissance) ? `, né(e) le ${formatDate(data.dateNaissance)} à ${data.lieuNaissance}` : ""}`,
                details: `Est régulièrement inscrit(e) en ${data.level || "[Classe / Niveau]"} pour l'année scolaire ${data.academicYear || "[Année]"}.\n\nFait pour servir et valoir ce que de droit.`,
            };

        case "lettre_recommandation":
            return {
                title: "LETTRE DE RECOMMANDATION",
                intro: `Je soussigné(e), ${data.representativeName || "[Nom du Recommandant]"}, agissant en tant que ${data.recommenderPosition || "[Poste]"} chez ${data.entreprise || "[Entreprise]"}, recommande vivement :`,
                subject: subjectString,
                details: `J'ai eu le plaisir de superviser ce collaborateur en ma qualité de ${data.relation || "[Relation]"}.\n` +
                    `Durant la période du ${formatDate(data.dateDebut)} au ${formatDate(data.dateFin)}, il/elle a fait preuve d'un professionnalisme exemplaire, de rigueur et d'un excellent esprit d'équipe.\n\n` +
                    `Je suis convaincu(e) qu'il/elle sera un atout précieux pour toute organisation.`,
            };

        case "attestation_hebergement":
            return {
                title: "ATTESTATION D'HÉBERGEMENT",
                intro: "",
                subject: "",
                details: `Je soussigné(e), ${data.representativeName || "[Nom de l'hébergeant]"},\n` +
                    `né(e) le ${formatDate(data.hostDob)} à ${data.hostPob || "[Lieu]"},\n` +
                    `demeurant au ${data.address || "[Adresse complète]"},\n\n` +
                    `Atteste sur l'honneur héberger à mon domicile :\n\n` +
                    `${subjectString},\n` +
                    `né(e) le ${formatDate(data.hostedDob)} à ${data.hostedPob || "[Lieu]"}.\n\n` +
                    `Cet hébergement est effectué à titre gratuit, sans contrat de location ni sous-location, et ce depuis le ${formatDate(data.dateDebut)}.`,
            };

        case "attestation_vie_commune": {
            const relationshipText = data.relationshipType === 'mariés' ? "mariés" :
                data.relationshipType === 'pacsés' ? "pacsés" :
                    "concubins en union libre";

            const todayDate = formatDate(new Date().toISOString().split('T')[0]);

            return {
                title: "ATTESTATION SUR L'HONNEUR DE VIE COMMUNE",
                intro: "",
                subject: "",
                details: `Je soussigné(e) ${data.civility === "Madame" ? "Mme" : "M."} ${data.prenom} ${data.nom},\n` +
                    `né(e) le ${formatDate(data.dateNaissance)} à ${data.lieuNaissance},\n` +
                    `de nationalité ${data.nationality || "[Nationalité]"},\n` +
                    `domicilié(e) au ${data.address || "[Adresse complète]"},\n\n` +
                    `Atteste sur l'honneur vivre maritalement en communauté de vie affective et matérielle\n` +
                    `depuis le ${formatDate(data.dateDebut)} avec :\n\n` +
                    `Monsieur / Madame ${data.partnerFirstname || "[Prénom]"} ${data.partnerName || "[Nom]"},\n` +
                    `né(e) le ${formatDate(data.partnerDob)} à ${data.partnerPob || "[Lieu]"},\n` +
                    `de nationalité ${data.partnerNationality || "[Nationalité]"},\n` +
                    `domicilié(e) au même adresse : ${data.address || "[Adresse complète]"}.\n\n` +
                    `Nous sommes ${relationshipText}.\n\n` +
                    `Fait à ${data.city || "[Ville]"}, le ${data.signatureDate ? data.signatureDate : todayDate}.`
            };
        }

        default:
            return { title: "ATTESTATION", intro: "", subject: "", details: "" };
    }
};

export default function AttestationPDF({ data }: AttestationPDFProps) {
    const today = getFormattedDate();
    const content = getPdfContent(data.documentType, data);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.logo}>{/* Branding removed */}</Text>
                    <View>
                        <Text style={styles.date}>Fait à Paris,</Text>
                        <Text style={styles.date}>Le {today}</Text>
                    </View>
                </View>

                {/* Title */}
                <Text style={styles.title}>{content.title}</Text>

                {/* Content */}
                <View style={styles.content}>
                    <Text>{content.intro}</Text>
                </View>

                {content.subject && (
                    <View style={{ ...styles.content, marginTop: 20, marginBottom: 20, alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Helvetica-Bold' }}>
                            {content.subject}
                        </Text>
                    </View>
                )}

                <View style={styles.content}>
                    <Text>{content.details}</Text>
                </View>

                <View style={styles.content}>
                    <Text>
                        Cette attestation est délivrée à la demande de l'intéressé(e) pour servir et valoir ce que de droit.
                    </Text>
                </View>

                <View style={styles.signatureContainer}>
                    <Text style={styles.signatureText}>
                        {data.documentType === 'justificatif_domicile' ? "Le Hébergeant" :
                            data.documentType === 'attestation_honneur' ? "Le Déclarant" :
                                data.documentType === 'attestation_hebergement' ? "L'Hébergeant" :
                                    data.documentType === 'attestation_vie_commune' ? "Les Déclarants" :
                                        data.documentType === 'certificat_scolarite' ? "Le Directeur" :
                                            data.documentType === 'lettre_recommandation' ? "Le Recommandant" :
                                                `Pour l'entreprise ${data.entreprise || "..."}`}
                    </Text>
                    <View style={styles.signatureBox}>
                        {data.signatureDate ? (
                            <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                                <Text style={{ fontFamily: 'Helvetica-Oblique', fontSize: 10, marginBottom: 4 }}>
                                    {data.documentType === 'attestation_honneur' || data.documentType === 'attestation_vie_commune'
                                        ? `${data.prenom} ${data.nom}`
                                        : data.representativeName || "Signataire"}
                                </Text>
                                {data.documentType === 'attestation_vie_commune' && (
                                    <Text style={{ fontFamily: 'Helvetica-Oblique', fontSize: 10, marginBottom: 4 }}>
                                        {`et ${data.partnerFirstname || ''} ${data.partnerName || ''}`}
                                    </Text>
                                )}
                                <Text style={{ fontSize: 8, color: '#6B7280' }}>
                                    Signé électroniquement le {data.signatureDate}
                                </Text>
                            </View>
                        ) : (
                            <Text style={styles.signaturePlaceholder}>[Cachet / Signatures]</Text>
                        )}
                    </View>
                </View>

                {/* Footer */}
                <Text style={styles.footer}>
                    Document généré automatiquement via JL Cloud - Ce document est certifié conforme aux informations saisies.
                </Text>
            </Page>
        </Document>
    );
}
