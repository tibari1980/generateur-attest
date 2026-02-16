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
        // Financial Support
        amount?: string;
        duration?: string;
        beneficiaryName?: string;
        beneficiaryFirstName?: string;
        // Non-Polygamy
        // Non-Polygamy
        maritalStatus?: string;
        marriageDate?: string;
        // Concordance
        doc1Type?: string;
        doc1Name?: string;
        doc1Firstname?: string;
        doc2Type?: string;
        doc2Name?: string;
        doc2Firstname?: string;
        discordanceType?: string;
        // Work
        contractType?: string;
        trialPeriod?: string;
        salaryAmount?: string;
        salaryType?: string;
        salaryFrequency?: string;
        salaryGross?: string;
        salaryNet?: string;
        bonuses?: string;
        remoteDays?: string;
        remoteFixedDays?: string;
        remoteLocation?: string;
        // Personal
        profession?: string;
        witnessLink?: string;
        facts?: string;
        mandataireNom?: string;
        mandatairePrenom?: string;
        mandataireAdresse?: string;
        mandateObject?: string;
        mandateDuration?: string;
        exPartnerNom?: string;
        exPartnerPrenom?: string;
        exPartnerAdresse?: string;
        separationDate?: string;
        // Education
        trainingTitle?: string;
        trainingHours?: string;
        assiduityRate?: string;
        diplomaTitle?: string;
        diplomaSpeciality?: string;
        diplomaSession?: string;
        diplomaMention?: string;
        examList?: string;
        // Domicile
        rentPeriod?: string;
        rentAmount?: string;
        chargesAmount?: string;
        paymentDate?: string;
        entryDate?: string;
        currentRentAmount?: string;
        departureDate?: string;
        paymentStatus?: string;
        newAddress?: string;
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

        case "attestation_financiere":
            return {
                title: "ATTESTATION DE PRISE EN CHARGE FINANCIÈRE",
                intro: "",
                subject: "",
                details: `Je soussigné(e), ${subjectString},\n` +
                    `demeurant à ${data.address || "[Adresse complète]"},\n\n` +
                    `M'engage sur l'honneur à subvenir aux besoins financiers de :\n\n` +
                    `M. / Mme ${data.beneficiaryFirstName || "[Prénom]"} ${data.beneficiaryName || "[Nom]"},\n` +
                    `pour ses frais de vie (hébergement, nourriture, soins, etc.)\n` +
                    `${data.amount ? `à hauteur de ${data.amount}€ par mois` : "de manière régulière et suffisante"}` +
                    `${data.duration ? ` pour une durée de ${data.duration}` : ""}.\n\n` +
                    `Cet engagement prend effet à compter du ${formatDate(data.dateDebut)}.`
            };

        case "attestation_non_polygamie":
            const statusLabel = data.maritalStatus === 'marie' ? "Marié(e)" :
                data.maritalStatus === 'divorce' ? "Divorcé(e)" :
                    data.maritalStatus === 'veuf' ? "Veuf / Veuve" : "Célibataire";

            return {
                title: "ATTESTATION DE NON-POLYGAMIE",
                intro: "",
                subject: "",
                details: `Je soussigné(e), ${subjectString},\n` +
                    `demeurant à ${data.address || "[Adresse complète]"},\n\n` +
                    `Déclare sur l'honneur ne pas vivre en état de polygamie en France.\n\n` +
                    `Situation matrimoniale : ${statusLabel}\n` +
                    `${data.maritalStatus === 'marie' && data.marriageDate ? `Date de mariage : ${formatDate(data.marriageDate)}\n` : ""}` +
                    `\nJe suis conscient(e) que cette attestation est établie pour servir et valoir ce que de droit.`
            };

        case "attestation_residence":
            return {
                title: "ATTESTATION DE RÉSIDENCE",
                intro: "",
                subject: "",
                details: `Je soussigné(e), ${subjectString},\n` +
                    `demeurant au ${data.address || "[Adresse complète]"},\n\n` +
                    `Atteste sur l'honneur résider effectivement et de manière habituelle à l'adresse susmentionnée\n` +
                    `depuis le ${formatDate(data.dateDebut)}.\n\n` +
                    `J'ai connaissance des sanctions pénales encourues par l'auteur d'une fausse attestation.`
            };

        case "attestation_respect_principes":
            return {
                title: "ENGAGEMENT À RESPECTER LES PRINCIPES DE LA RÉPUBLIQUE",
                intro: "",
                subject: "",
                details: `Je soussigné(e), ${subjectString},\n` +
                    `demeurant au ${data.address || "[Adresse complète]"},\n\n` +
                    `M'engage solennellement à respecter les principes de la République française, à savoir :\n\n` +
                    `1. La liberté personnelle\n` +
                    `2. La liberté d'expression et de conscience\n` +
                    `3. L'égalité entre les femmes et les hommes\n` +
                    `4. La dignité de la personne humaine\n` +
                    `5. La devise et les symboles de la République\n` +
                    `6. L'intégrité territoriale\n` +
                    `7. La laïcité\n\n` +
                    `Je déclare respecter ces principes et ne pas agir contre eux.`
            };

        case "attestation_concordance":
            return {
                title: "ATTESTATION DE CONCORDANCE D'IDENTITÉ",
                intro: "",
                subject: "",
                details: `Je soussigné(e), ${subjectString},\n` +
                    `demeurant au ${data.address || "[Adresse complète]"},\n\n` +
                    `Atteste sur l'honneur que les documents suivants désignent bien ma personne, malgré les différences constatées :\n\n` +
                    `DOCUMENT 1 (${data.doc1Type || "Document A"}) :\n` +
                    `Nom : ${data.doc1Name || "..."} / Prénom : ${data.doc1Firstname || "..."}\n\n` +
                    `DOCUMENT 2 (${data.doc2Type || "Document B"}) :\n` +
                    `Nom : ${data.doc2Name || "..."} / Prénom : ${data.doc2Firstname || "..."}\n\n` +
                    `Nature de la différence : ${data.discordanceType || "..."}.\n\n` +
                    `Ces variations désignent une seule et même personne physique (moi-même).`
            };

        case "attestation_promesse_embauche":
            return {
                title: "PROMESSE D'EMBAUCHE",
                intro: `Nous soussignés, ${data.entreprise || "[Entreprise]"}, représentés par ${data.representativeName || "[Nom]"},`,
                subject: `Objet : Promesse d'embauche`,
                details: `Avons le plaisir de confirmer notre intention d'embaucher :\n\n` +
                    `M. / Mme ${data.prenom || "[Prénom]"} ${data.nom || "[Nom]"}\n\n` +
                    `Au poste de : ${data.poste || "[Poste]"}\n` +
                    `Type de contrat : ${data.contractType || "CDI"}\n` +
                    `Date de début : ${formatDate(data.dateDebut)}\n` +
                    `Période d'essai : ${data.trialPeriod || "Non spécifiée"}\n` +
                    `Rémunération : ${data.salaryAmount || "..."} € ${data.salaryType || "Brut"} / ${data.salaryFrequency || "Mensuel"}.\n\n` +
                    `Cette promesse est faite sous réserve de la fourniture des documents administratifs nécessaires.`
            };

        case "attestation_salaire":
            return {
                title: "ATTESTATION DE SALAIRE",
                intro: "",
                subject: "",
                details: `Je soussigné(e), ${data.representativeName || "[Nom]"}, agissant pour le compte de ${data.entreprise || "[Entreprise]"}, certifie que :\n\n` +
                    `M. / Mme ${data.prenom || "[Prénom]"} ${data.nom || "[Nom]"}\n` +
                    `Est employé(e) au sein de notre société depuis le ${formatDate(data.dateDebut)} en qualité de ${data.poste || "[Poste]"}.\n\n` +
                    `Sa rémunération actuelle est établie comme suit :\n` +
                    `- Salaire Brut Mensuel : ${data.salaryGross || "..."} €\n` +
                    `- Salaire Net Mensuel : ${data.salaryNet || "..."} €\n` +
                    `${data.bonuses ? `- Primes / Avantages : ${data.bonuses}\n` : ""}\n` +
                    `Je certifie également que l'intéressé(e) n'est ni en période d'essai, ni en préavis de démission ou de licenciement.`
            };

        case "attestation_teletravail":
            return {
                title: "ATTESTATION DE TÉLÉTRAVAIL",
                intro: "",
                subject: "",
                details: `Je soussigné(e), ${data.representativeName || "[Nom]"}, représentant ${data.entreprise || "[Entreprise]"}, atteste que :\n\n` +
                    `M. / Mme ${data.prenom || "[Prénom]"} ${data.nom || "[Nom]"}\n` +
                    `Occupant le poste de ${data.poste || "[Poste]"},\n\n` +
                    `Est autorisé(e) à exercer ses fonctions en télétravail selon les modalités suivantes :\n\n` +
                    `- Volume : ${data.remoteDays || "..."} jours par semaine\n` +
                    `- Jours fixes : ${data.remoteFixedDays || "Non définis"}\n` +
                    `- Lieu autorisé : ${data.remoteLocation || "Domicile"}\n\n` +
                    `Cette organisation est effective à compter de la signature de la présente.`
            };

        case "attestation_temoin":
            return {
                title: "ATTESTATION DE TÉMOIN (Article 202 CPC)",
                intro: "",
                subject: "",
                details: `Je soussigné(e), ${subjectString},\n` +
                    `Exerçant la profession de : ${data.profession || "[Profession]"},\n` +
                    `Lien avec les parties : ${data.witnessLink || "Aucun"}.\n\n` +
                    `Déclare avoir pris connaissance que cette attestation est établie en vue de sa production en justice et que toute fausse déclaration de ma part m'exposerait à des sanctions pénales.\n\n` +
                    `ATTESTE SUR L'HONNEUR LES FAITS SUIVANTS :\n\n` +
                    `${data.facts || "[Description précise et objective des faits constatés...]"}\n\n` +
                    `Fait pour servir et valoir ce que de droit.`
            };

        case "attestation_procuration":
            return {
                title: "PROCURATION",
                intro: "",
                subject: "",
                details: `Je soussigné(e), ${subjectString},\n` +
                    `Donne par la présente POUVOIR à :\n` +
                    `M. / Mme ${data.mandatairePrenom || "[Prénom]"} ${data.mandataireNom || "[Nom]"},\n` +
                    `Demeurant à : ${data.mandataireAdresse || "[Adresse du mandataire]"},\n\n` +
                    `Pour effectuer en mon nom et pour mon compte les démarches suivantes :\n` +
                    `${data.mandateObject || "[Objet de la procuration]"}\n\n` +
                    `${data.mandateDuration ? `Cette procuration est valable : ${data.mandateDuration}.` : "Cette procuration est valable pour une durée indéterminée jusqu'à révocation."}\n\n` +
                    `Bon pour pouvoir.`
            };

        case "attestation_separation":
            return {
                title: "ATTESTATION DE SÉPARATION SUR L'HONNEUR",
                intro: "",
                subject: "",
                details: `Je soussigné(e), ${subjectString},\n` +
                    `Demeurant au ${data.address || "[Adresse complète]"},\n\n` +
                    `Déclare sur l'honneur être séparé(e) de fait de :\n` +
                    `M. / Mme ${data.exPartnerPrenom || "[Prénom]"} ${data.exPartnerNom || "[Nom]"}\n` +
                    `${data.exPartnerAdresse ? `Résidant actuellement à : ${data.exPartnerAdresse}\n` : ""}\n` +
                    `Depuis le : ${formatDate(data.separationDate)}.\n\n` +
                    `Nous ne partageons plus de vie commune ni de résidence conjugale depuis cette date.\n\n` +
                    `J'ai connaissance des sanctions pénales encourues en cas de fausse déclaration.`
            };

        case "attestation_assiduite":
            return {
                title: "ATTESTATION D'ASSIDUITÉ",
                intro: `Je soussigné(e), ${data.representativeName || "[Nom du Responsable]"}, agissant en qualité de ${data.poste || "Directeur"},`,
                subject: `${data.civility === "Madame" ? "Mme" : "M."} ${data.prenom || "[Prénom]"} ${data.nom || "[Nom]"}${data.dateNaissance && data.lieuNaissance ? `, né(e) le ${formatDate(data.dateNaissance)} à ${data.lieuNaissance}` : ""},`,
                details: `A suivi la formation intitulée :\n\n` +
                    `${data.trainingTitle || "[Titre de la formation]"}\n\n` +
                    `Durant la période du ${formatDate(data.dateDebut)} au ${formatDate(data.dateFin)}, pour un volume horaire total de ${data.trainingHours || "..."} heures.\n\n` +
                    `Taux d'assiduité : ${data.assiduityRate || "100%"}.\n\n` +
                    `Cette attestation est délivrée pour valoir ce que de droit.`,
            };

        case "attestation_reussite":
            return {
                title: "ATTESTATION DE RÉUSSITE",
                intro: `Je soussigné(e), ${data.representativeName || "[Nom du Responsable]"}, ${data.poste || "Directeur"}, certifie que :`,
                subject: `${data.civility === "Madame" ? "Mme" : "M."} ${data.prenom || "[Prénom]"} ${data.nom || "[Nom]"}\n` +
                    `Né(e) le ${formatDate(data.dateNaissance)} à ${data.lieuNaissance || "[Lieu de Naissance]"},`,
                details: `A été déclaré(e) ADMIS(E) au diplôme suivant :\n\n` +
                    `${data.diplomaTitle || "[Intitulé du Diplôme]"}\n` +
                    `${data.diplomaSpeciality ? `Spécialité : ${data.diplomaSpeciality}\n` : ""}\n` +
                    `Session : ${data.diplomaSession || "..."}\n` +
                    `${data.diplomaMention ? `Mention : ${data.diplomaMention}\n` : ""}\n\n` +
                    `Ce certificat est délivré à titre provisoire en attendant la remise du diplôme définitif.`,
            };

        case "attestation_examen":
            return {
                title: "ATTESTATION DE PRÉSENCE À L'EXAMEN",
                intro: `Je soussigné(e), ${data.representativeName || "[Nom du Responsable]"}, représentant l'établissement ${data.entreprise || "[Nom de l'Etablissement]"},`,
                subject: `Certifie que l'étudiant(e) ${data.prenom || "[Prénom]"} ${data.nom || "[Nom]"},\n` +
                    `Né(e) le ${formatDate(data.dateNaissance)} à ${data.lieuNaissance || "[Lieu de Naissance]"},`,
                details: `S'est présenté(e) aux épreuves d'examen suivantes :\n\n` +
                    `${data.examList || "[Liste des épreuves]"}\n\n` +
                    `La présente attestation est délivrée pour justifier de sa présence aux horaires indiqués.`,
            };

        case "quittance_loyer":
            return {
                title: "QUITTANCE DE LOYER",
                intro: `Je soussigné(e), ${data.representativeName || "[Nom du Propriétaire]"}, propriétaire du logement situé au ${data.address || "[Adresse du logement]"},`,
                subject: `Certifie avoir reçu de ${data.civility === "Madame" ? "Mme" : "M."} ${data.prenom || "[Prénom]"} ${data.nom || "[Nom]"}, locataire du logement susmentionné,`,
                details: `La somme de ${(parseFloat(data.rentAmount || "0") + parseFloat(data.chargesAmount || "0")).toFixed(2)} € (dont ${data.rentAmount || "..."} € de loyer et ${data.chargesAmount || "..."} € de charges).\n\n` +
                    `Pour le paiement du loyer et des charges de la période : ${data.rentPeriod || "[Mois / Année]"}.\n\n` +
                    `Paiement effectué le : ${formatDate(data.paymentDate)}.\n\n` +
                    `Cette quittance annule tous les reçus qui auraient pu être donnés pour acompte versé sur la présente période.`,
            };

        case "attestation_loyer_ajour":
            return {
                title: "ATTESTATION DE LOYER À JOUR",
                intro: `Je soussigné(e), ${data.representativeName || "[Nom du Propriétaire]"}, propriétaire du logement situé au ${data.address || "[Adresse du logement]"},`,
                subject: `Certifie que ${data.civility === "Madame" ? "Mme" : "M."} ${data.prenom || "[Prénom]"} ${data.nom || "[Nom]"} occupe ce logement depuis le ${formatDate(data.entryDate)}.`,
                details: `Le locataire est à jour du paiement de ses loyers et charges à la date de signature de la présente attestation.\n\n` +
                    `${data.currentRentAmount ? `Montant du loyer actuel (Charges Comprises) : ${data.currentRentAmount} €.\n\n` : ""}` +
                    `Cette attestation est délivrée à la demande de l'intéressé(e) pour servir et valoir ce que de droit.`,
            };

        case "attestation_fin_bail":
            return {
                title: "ATTESTATION DE FIN DE BAIL",
                intro: `Je soussigné(e), ${data.representativeName || "[Nom du Propriétaire]"}, propriétaire du logement situé au ${data.address || "[Adresse du logement]"},`,
                subject: `Certifie que ${data.civility === "Madame" ? "Mme" : "M."} ${data.prenom || "[Prénom]"} ${data.nom || "[Nom]"} a libéré les lieux le ${formatDate(data.departureDate)}.`,
                details: `L'état des lieux de sortie a été réalisé et les clés ont été remises.\n\n` +
                    `${data.newAddress ? `Nouvelle adresse déclarée : ${data.newAddress}.\n\n` : ""}` +
                    `${data.paymentStatus ? `Situation du compte : ${data.paymentStatus}.\n\n` : ""}` +
                    `Le locataire est libre de tout engagement locatif concernant ce logement.`,
            };

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
                                        data.documentType === 'attestation_financiere' ? "Le Garant" :
                                            data.documentType === 'attestation_non_polygamie' ? "Le Déclarant" :
                                                data.documentType === 'attestation_residence' ? "Le Déclarant" :
                                                    data.documentType === 'attestation_respect_principes' ? "Le Signataire" :
                                                        data.documentType === 'attestation_concordance' ? "Le Déclarant" :
                                                            data.documentType === 'attestation_promesse_embauche' ? "Pour l'Employeur" :
                                                                data.documentType === 'attestation_salaire' ? "L'Employeur" :
                                                                    data.documentType === 'attestation_teletravail' ? "L'Employeur" :
                                                                        data.documentType === 'attestation_temoin' ? "Le Témoin" :
                                                                            data.documentType === 'attestation_procuration' ? "Le Mandant" :
                                                                                data.documentType === 'attestation_separation' ? "Le Déclarant" :
                                                                                    data.documentType === 'certificat_scolarite' ? "Le Directeur" :
                                                                                        data.documentType === 'lettre_recommandation' ? "Le Recommandant" :
                                                                                            data.documentType === 'attestation_assiduite' ? "Le Responsable de Formation" :
                                                                                                data.documentType === 'attestation_reussite' ? "Le Président du Jury" :
                                                                                                    data.documentType === 'attestation_examen' ? "L'Administration" :
                                                                                                        ['quittance_loyer', 'attestation_loyer_ajour', 'attestation_fin_bail'].includes(data.documentType) ? "Le Propriétaire / Bailleur" :
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
