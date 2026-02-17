import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { getDocumentTitle, getFormattedDate } from '../utils/attestationUtils';
import { AttestationFormData } from '../types/attestation';

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
    data: AttestationFormData;
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
                title: "ATTESTATION D'EMPLOYEUR",
                intro: `Je soussigné(e), ${data.representativeName || "[Nom du Signataire]"}, agissant en qualité de responsable dûment habilité(e) au sein de la société ${data.entreprise || "[Nom de l'entreprise]"}, certifie par la présente que :`,
                subject: subjectString,
                details: `Est employé(e) au sein de notre structure en qualité de ${data.poste || "[Poste Occupé]"} sous contrat à durée ${data.contractType || "indéterminée"}, et ce depuis le ${formatDate(data.dateDebut)}.\n\n` +
                    `À ce jour, ${data.civility === "Madame" ? "l'intéressée" : "l'intéressé"} n'est ni en période d'essai, ni en préavis de rupture de contrat. ${data.dateFin ? `La fin de mission est prévue pour le ${formatDate(data.dateFin)}.` : ""}\n\n` +
                    `Cette attestation est délivrée pour servir et valoir ce que de droit.`,
            };

        case "attestation_stage":
            return {
                title: "ATTESTATION DE FIN DE STAGE",
                intro: `Je soussigné(e), ${data.representativeName || "[Tuteur/Responsable]"}, agissant pour le compte de ${data.entreprise || "[Entreprise]"}, certifie que :`,
                subject: `${data.civility === "Madame" ? "Madame" : "Monsieur"} ${data.prenom || ""} ${data.nom || ""}${(data.dateNaissance && data.lieuNaissance) ? `, né(e) le ${formatDate(data.dateNaissance)} à ${data.lieuNaissance}` : ""}`,
                details: `A effectué un stage conventionné au sein de notre établissement du ${formatDate(data.dateDebut)} au ${formatDate(data.dateFin)}, en qualité de ${data.poste || "[Intitulé du stage]"}.\n\n` +
                    `Durant cette période, ${data.civility === "Madame" ? "elle" : "il"} a su faire preuve de rigueur et d'une excellente intégration. Ses missions ont été accomplies avec succès, conformément aux objectifs pédagogiques fixés.`,
            };

        case "justificatif_domicile":
            return {
                title: "ATTESTATION D'HÉBERGEMENT À TITRE GRATUIT",
                intro: `Je soussigné(e), ${data.representativeName || "[Nom du Logeur]"}, demeurant à l'adresse suivante : ${data.address || "[Adresse complète]"}, certifie sur l'honneur héberger à titre gratuit à mon domicile :`,
                subject: subjectString,
                details: `Ce logement constitue sa résidence principale et effective depuis le ${formatDate(data.dateDebut)}.\n\n` +
                    `Je joins à la présente une copie de ma pièce d'identité ainsi qu'un justificatif de domicile de moins de trois mois.\n\n` +
                    `Fait pour servir et valoir ce que de droit.`,
            };

        case "attestation_honneur":
            return {
                title: "ATTESTATION SUR L'HONNEUR",
                intro: "",
                subject: "",
                details: `Je soussigné(e), ${subjectString},\n` +
                    `demeurant au ${data.address || "[Adresse complète]"},\n\n` +
                    `Atteste sur l'honneur l'exactitude des faits suivants :\n\n` +
                    `Exerçant actuellement la profession de ${data.poste || "[Profession]"} au sein de ${data.entreprise || "[Organisme]"} depuis le ${formatDate(data.dateDebut)}.\n\n` +
                    `Je déclare avoir une parfaite connaissance des sanctions pénales encourues par l'auteur d'une fausse attestation (Article 441-7 du Code pénal).`,
            };

        case "certificat_scolarite":
            return {
                title: "CERTIFICAT DE SCOLARITÉ",
                intro: `Le Chef d'établissement de ${data.establishment || "[Établissement]"} certifie que :`,
                subject: `${data.civility === "Madame" ? "Madame" : "Monsieur"} ${data.prenom || ""} ${data.nom || ""}${(data.dateNaissance && data.lieuNaissance) ? `, né(e) le ${formatDate(data.dateNaissance)} à ${data.lieuNaissance}` : ""}`,
                details: `Est régulièrement inscrit(e) au sein de notre institution pour suivre le cursus ${data.level || "[Niveau/Filière]"} au titre de l'année universitaire ${data.academicYear || "[Année scolaire]"}.\n\n` +
                    `Ce certificat est délivré pour justifier de sa qualité de membre de la communauté étudiante.`,
            };

        case "lettre_recommandation":
            return {
                title: "LETTRE DE RECOMMANDATION PROFESSIONNELLE",
                intro: `Je soussigné(e), ${data.representativeName || "[Nom]"}, ${data.recommenderPosition || "[Poste]"} au sein de ${data.entreprise || "[Entreprise]"}, ai le plaisir de recommander vivement la candidature de :`,
                subject: subjectString,
                details: `Ayant supervisé ${data.civility === "Madame" ? "sa" : "son"} travail en tant que ${data.relation || "[Manager/Tuteur]"} du ${formatDate(data.dateDebut)} au ${formatDate(data.dateFin)}, je peux témoigner de son professionnalisme exemplaire.\n\n` +
                    `${data.prenom} a démontré une capacité d'adaptation remarquable, une rigueur constante et un sens aigu des responsabilités. Son apport a été déterminant pour la réussite de nos projets communs. Je suis convaincu(e) qu'il/elle sera un atout majeur pour votre organisation.`,
            };

        case "attestation_hebergement":
            return {
                title: "ATTESTATION D'HÉBERGEMENT SUR L'HONNEUR",
                intro: "",
                subject: "",
                details: `Je soussigné(e), ${data.representativeName || "[Hébergeant]"},\n` +
                    `né(e) le ${formatDate(data.hostDob)} à ${data.hostPob || "[Lieu]"},\n` +
                    `demeurant au ${data.address || "[Adresse complète]"},\n\n` +
                    `Certifie sur l'honneur héberger à mon domicile, à titre gratuit et permanent :\n\n` +
                    `${subjectString},\n` +
                    `né(e) le ${formatDate(data.hostedDob)} à ${data.hostedPob || "[Lieu]"}.\n\n` +
                    `Cet hébergement est effectif depuis le ${formatDate(data.dateDebut)}. Je joins les pièces justificatives nécessaires à la validité de la présente déclaration.`,
            };

        case "attestation_vie_commune": {
            const relationshipText = data.relationshipType === 'mariés' ? "mariés" :
                data.relationshipType === 'pacsés' ? "pacsés" :
                    "concubins en union libre";
            const todayDate = formatDate(new Date().toISOString().split('T')[0]);
            return {
                title: "CERTIFICAT DE VIE COMMUNE ET DE CONCUBINAGE",
                intro: "",
                subject: "",
                details: `Nous soussignés, ${data.civility === "Madame" ? "Mme" : "M."} ${data.prenom} ${data.nom} et ${data.partnerFirstname} ${data.partnerName}, demeurant à l'adresse commune suivante : ${data.address || "[Adresse complète]"},\n\n` +
                    `Déclarons solennellement sur l'honneur vivre en communauté de vie stable et continue depuis le ${formatDate(data.dateDebut)}.\n\n` +
                    `Nous attestons que notre situation est celle de ${relationshipText} et que notre foyer est basé sur une participation matérielle et affective commune. Nous avons conscience que cette déclaration engage notre responsabilité entière.`
            };
        }

        case "attestation_financiere":
            return {
                title: "ATTESTATION DE PRISE EN CHARGE FINANCIÈRE",
                intro: "",
                subject: "",
                details: `Je soussigné(e), ${subjectString},\n` +
                    `demeurant à ${data.address || "[Adresse complète]"},\n\n` +
                    `M'engage formellement et irrévocablement à subvenir à l'ensemble des besoins de :\n\n` +
                    `M./Mme ${data.beneficiaryFirstName || "[Prénom]"} ${data.beneficiaryName || "[Nom]"},\n` +
                    `notamment en ce qui concerne les frais de logement, de nourriture, de santé et de scolarité,\n` +
                    `${data.amount ? `via un versement mensuel minimal de ${data.amount}€` : "selon les besoins réels constatés"}` +
                    `${data.duration ? ` pour une période de ${data.duration}` : ""}.\n\n` +
                    `Cet engagement prend effet à compter du ${formatDate(data.dateDebut)} pour servir de garantie auprès des autorités compétentes.`
            };

        case "attestation_non_polygamie":
            return {
                title: "DÉCLARATION DE NON-POLYGAMIE",
                intro: "",
                subject: "",
                details: `Je soussigné(e), ${subjectString}, demeurant au ${data.address || "[Adresse]"},\n\n` +
                    `Déclare solennellement sur l'honneur ne pas vivre en état de polygamie sur le territoire de la République Française, conformément aux dispositions du Code de l'entrée et du séjour des étrangers.\n\n` +
                    `Je certifie que ma situation matrimoniale actuelle est celle de : ${data.maritalStatus === 'marie' ? 'Marié(e)' : data.maritalStatus === 'divorce' ? 'Divorcé(e)' : 'Célibataire'}.\n\n` +
                    `Je m'engage à signaler tout changement de situation et reconnais avoir été informé qu'une fausse déclaration entraîne le retrait de plein droit du titre de séjour.`
            };

        case "attestation_residence":
            return {
                title: "ATTESTATION DE RÉSIDENCE EFFECTIVE",
                intro: "",
                subject: "",
                details: `Je soussigné(e), ${subjectString}, certifie sur l'honneur résider de manière stable, effective et habituelle à l'adresse suivante : ${data.address || "[Adresse complète]"}.\n\n` +
                    `Cette occupation des lieux est ininterrompue depuis le ${formatDate(data.dateDebut)}. La présente est établie pour servir de justificatif administratif auprès des administrations concernées.`
            };

        case "attestation_respect_principes":
            return {
                title: "ENGAGEMENT SOLENNEL AUX PRINCIPES DE LA RÉPUBLIQUE",
                intro: "",
                subject: "",
                details: `Je soussigné(e), ${subjectString}, résidant au ${data.address},\n\n` +
                    `M'engage solennellement à respecter les principes de la République française, socles de notre contrat social :\n\n` +
                    `• La liberté individuelle et la liberté de conscience ;\n` +
                    `• L'égalité entre les femmes et les hommes ;\n` +
                    `• La dignité de la personne humaine et la fraternité ;\n` +
                    `• La laïcité et le respect des lois de la République.\n\n` +
                    `Je déclare rejeter toute forme de discrimination ou de violence et m'engage à porter ces valeurs dans mon parcours d'intégration.`
            };

        case "attestation_concordance":
            return {
                title: "ATTESTATION DE CONCORDANCE D'IDENTITÉ",
                intro: "",
                subject: "",
                details: `Je soussigné(e), ${subjectString}, atteste sur l'honneur que les identités figurant sur les documents ci-après désignés concernent une seule et même personne :\n\n` +
                    `DOCUMENT 1 (${data.doc1Type}) : ${data.doc1Firstname || ""} ${data.doc1Name || ""}\n` +
                    `DOCUMENT 2 (${data.doc2Type}) : ${data.doc2Firstname || ""} ${data.doc2Name || ""}\n\n` +
                    `La différence constatée (${data.discordanceType || "orthographe/omission"}) résulte d'une variation purement administrative. En foi de quoi, je signe la présente pour attester de ma parfaite identité physique.`
            };

        case "attestation_promesse_embauche":
            return {
                title: "PROMESSE UNILATÉRALE D'EMBAUCHE",
                intro: `La société ${data.entreprise || "[Entreprise]"}, représentée par ${data.representativeName || "[Nom]"}, s'engage par la présente à recruter :`,
                subject: `Candidat : ${data.prenom || ""} ${data.nom || ""}`,
                details: `Dans le cadre d'un contrat de travail de type ${data.contractType || "CDI"},\n` +
                    `Au poste de : ${data.poste || "[Poste]"}\n` +
                    `Date d'entrée prévue : ${formatDate(data.dateDebut)}\n` +
                    `Rémunération : ${data.salaryAmount || "..."} € ${data.salaryType || "Brut"} par ${data.salaryFrequency || "mois"}.\n\n` +
                    `Cette promesse constitue un engagement ferme de notre part, sous réserve de la validité de vos documents d'autorisation de travail. Nous nous réjouissons de vous compter prochainement parmi nos collaborateurs.`
            };

        case "attestation_salaire":
            return {
                title: "ATTESTATION DE SALAIRE ET DE FONCTIONS",
                intro: `La direction de ${data.entreprise || "[Société]"} certifie par la présente que :`,
                subject: subjectString,
                details: `Exerce ses fonctions de ${data.poste || "[Poste]"} au sein de notre établissement depuis le ${formatDate(data.dateDebut)}.\n\n` +
                    `Sa rémunération contractuelle s'élève à :\n` +
                    `• Salaire Brut Mensuel : ${data.salaryGross || "..."} €\n` +
                    `• Salaire Net Mensuel : ${data.salaryNet || "..."} €\n` +
                    `${data.bonuses ? `• Avantages & Primes : ${data.bonuses}\n` : ""}\n` +
                    `Nous attestons que ${data.civility === "Madame" ? "la salariée" : "le salarié"} est en activité à ce jour et ne fait l'objet d'aucune procédure de départ.`
            };

        case "attestation_teletravail":
            return {
                title: "ATTESTATION D'AUTORISATION DE TÉLÉTRAVAIL",
                intro: "",
                subject: "",
                details: `Je soussigné(e), ${data.representativeName || "[Signataire]"}, pour le compte de ${data.entreprise},\n` +
                    `Certifie que M. / Mme ${data.prenom} ${data.nom} bénéficie d'une organisation du travail en distanciel selon les modalités suivantes :\n\n` +
                    `• Fréquence : ${data.remoteDays || "..."}-jours par semaine ;\n` +
                    `• Jours définis : ${data.remoteFixedDays || "Flexibles"} ;\n` +
                    `• Lieu : ${data.remoteLocation || "Résidence principale"}.\n\n` +
                    `Cette attestation est délivrée pour justifier de son organisation professionnelle auprès de tout organisme tiers.`
            };

        case "attestation_temoin":
            return {
                title: "ATTESTATION DE TÉMOIGNAGE EN JUSTICE",
                intro: `Conformément à l'Article 202 du Code de Procédure Civile, je soussigné(e) :`,
                subject: subjectString,
                details: `Profession : ${data.profession || "[Profession]"}\n` +
                    `Lien avec les parties : ${data.witnessLink || "Aucun"}\n\n` +
                    `Je déclare avoir conscience que cette attestation sera produite en justice et qu'une fausse déclaration m'expose à des poursuites pénales.\n\n` +
                    `DÉCLARATION DES FAITS :\n` +
                    `${data.facts || "[Récit précis des faits constatés par le témoin...]"}\n\n` +
                    `Je certifie que les faits relatés ci-dessus sont l'expression exacte de la vérité et que j'en ai été personnellement témoin.`
            };

        case "attestation_procuration":
            return {
                title: "PROCURATION / MANDAT DE REPRÉSENTATION",
                intro: "",
                subject: "",
                details: `Je soussigné(e), ${subjectString}, donne par la présente POUVOIR à :\n` +
                    `M. / Mme ${data.mandatairePrenom} ${data.mandataireNom}, demeurant au ${data.mandataireAdresse},\n\n` +
                    `Afin de me représenter et d'agir en mon nom pour l'objet suivant :\n` +
                    `${data.mandateObject || "[Description précise de la mission]"}.\n\n` +
                    `Le mandataire est autorisé à signer tout document afférent à cette mission. ${data.mandateDuration ? `Ce mandat est valable jusqu'au ${data.mandateDuration}.` : "Ce pouvoir est consenti pour une durée déterminée par l'accomplissement de ladite mission."}`
            };

        case "attestation_separation":
            return {
                title: "DÉCLARATION SUR L'HONNEUR DE SÉPARATION DE FAIT",
                intro: "",
                subject: "",
                details: `Je soussigné(e), ${subjectString}, résidant au ${data.address},\n\n` +
                    `Déclare sur l'honneur être séparé(e) de fait, sans cohabitation matérielle ni financière, de :\n` +
                    `M. / Mme ${data.exPartnerPrenom} ${data.exPartnerNom},\n\n` +
                    `Ce changement de situation est effectif depuis le ${formatDate(data.separationDate)}. Nous attestons ne plus partager de résidence commune à ce jour et avoir engagé les démarches nécessaires à notre désolidarisation administrative.`
            };

        case "attestation_assiduite":
            return {
                title: "ATTESTATION D'ASSIDUITÉ ET DE PRÉSENCE",
                intro: `Le responsable de formation de ${data.entreprise || "[Organisme]"} certifie que :`,
                subject: subjectString,
                details: `A suivi avec assiduité le programme de formation "${data.trainingTitle || "[Titre]"}"\n` +
                    `sur la période du ${formatDate(data.dateDebut)} au ${formatDate(data.dateFin)}.\n\n` +
                    `L'apprenant a validé un volume de ${data.trainingHours || "..."} heures de présence effective, correspondant à un taux d'assiduité de ${data.assiduityRate || "100%"}.\n\n` +
                    `Fait pour valoir ce que de droit.`
            };

        case "attestation_reussite":
            return {
                title: "ATTESTATION PROVISOIRE DE RÉUSSITE",
                intro: `Le jury d'examen de ${data.entreprise || "[Etablissement]"} certifie après délibération que :`,
                subject: subjectString,
                details: `A été déclaré(e) ADMIS(E) à l'obtention du diplôme suivant :\n\n` +
                    `INTITULÉ : ${data.diplomaTitle || "[Diplôme]"}\n` +
                    `SPÉCIALITÉ : ${data.diplomaSpeciality || "N/A"}\n` +
                    `SESSION : ${data.diplomaSession || "..."} | MENTION : ${data.diplomaMention || "Assez Bien"}\n\n` +
                    `Cette attestation provisoire permet à l'intéressé(e) de faire valoir ses droits en attendant l'édition du diplôme définitif.`
            };

        case "attestation_examen":
            return {
                title: "ATTESTATION DE PRÉSENCE AUX ÉPREUVES",
                intro: `L'administration de ${data.entreprise || "[Organisme]"} certifie que :`,
                subject: subjectString,
                details: `S'est présenté(e) ce jour pour composer les épreuves suivantes :\n\n` +
                    `${data.examList || "[Détail des matières et horaires]"}\n\n` +
                    `La présente attestation est délivrée pour justifier de son absence auprès de son employeur ou de tout organisme demandeur.`
            };

        case "quittance_loyer":
            return {
                title: "QUITTANCE DE LOYER DÉFINITIVE",
                intro: `Je soussigné(e), ${data.representativeName || "[Bailleur]"}, propriétaire du bien situé au ${data.address},`,
                subject: `Locataire : ${data.prenom} ${data.nom}`,
                details: `Certifie avoir perçu le règlement intégral de la somme de ${(parseFloat(data.rentAmount || "0") + parseFloat(data.chargesAmount || "0")).toFixed(2)} € au titre du terme de ${data.rentPeriod || "[Mois/Année]"}.\n\n` +
                    `Détail du règlement :\n` +
                    `• Loyer net : ${data.rentAmount} €\n` +
                    `• Provisions sur charges : ${data.chargesAmount} €\n\n` +
                    `Ce paiement ayant été effectué le ${formatDate(data.paymentDate)}, la présente quittance donne quitus entier au locataire pour ladite période.`
            };

        case "attestation_loyer_ajour":
            return {
                title: "ATTESTATION DE LOYER À JOUR ET DE BONNE TENUE",
                intro: `Je soussigné(e), ${data.representativeName || "[Bailleur]"}, propriétaire du logement sis au ${data.address},`,
                subject: subjectString,
                details: `Atteste que ${data.civility === "Madame" ? "la locataire" : "le locataire"} occupe mon bien depuis le ${formatDate(data.entryDate)} et est à jour de l'intégralité de ses loyers et charges à ce jour.\n\n` +
                    `Je précise que les obligations locatives ont toujours été respectées avec sérieux et ponctualité.\n\n` +
                    `Date de signature : ${formatDate(new Date().toISOString().split('T')[0])}.`,
            };

        case "attestation_fin_bail":
            return {
                title: "ATTESTATION DE LIBÉRATION DES LIEUX",
                intro: `Je soussigné(e), ${data.representativeName || "[Bailleur]"}, certifie que le logement situé au ${data.address} :`,
                subject: `Ex-Locataire : ${data.prenom} ${data.nom}`,
                details: `A été officiellement libéré le ${formatDate(data.departureDate)}, après réalisation de l'état des lieux de sortie contradictoire.\n\n` +
                    `Toutes les clés ont été restituées. ${data.paymentStatus === 'soldé' ? "Le solde de tout compte locatif est à jour." : "Le décompte définitif des charges est en cours de traitement."}\n\n` +
                    `Le locataire est désormais déchargé de ses obligations d'occupation concernant ce bien.`
            };

        default:
            return { title: "ATTESTATION OFFICIELLE", intro: "", subject: "", details: "" };
    }
};

export default function AttestationPDF({ data }: AttestationPDFProps) {
    const today = getFormattedDate();
    const content = getPdfContent(data.documentType, data);

    const isCompanyDocument = !!(data.companySiret || data.companyAddress);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    {isCompanyDocument ? (
                        <View style={{ width: '100%', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold', textTransform: 'uppercase', color: '#1F2937', marginBottom: 6, letterSpacing: 1 }}>
                                {data.entreprise || "NOM DE L'ENTREPRISE"}
                            </Text>
                            <Text style={{ fontSize: 9, color: '#4B5563', letterSpacing: 0.5 }}>
                                {data.companyAddress} {data.companyCity ? `- ${data.companyCity}` : ""}
                            </Text>
                        </View>
                    ) : (
                        <>
                            <Text style={styles.logo}>{/* Branding removed */}</Text>
                            <View>
                                <Text style={styles.date}>Fait à Paris,</Text>
                                <Text style={styles.date}>Le {today}</Text>
                            </View>
                        </>
                    )}
                </View>

                {/* Date for Company Docs (Right aligned but cleaner) */}
                {isCompanyDocument && (
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 30 }}>
                        <Text style={{ fontSize: 10, color: '#374151', fontFamily: 'Helvetica-Oblique' }}>
                            Fait à {data.companyCity ? data.companyCity.split(' ').pop() : 'Paris'}, le {today}
                        </Text>
                    </View>
                )}

                {/* Title */}
                <Text style={styles.title}>{content.title}</Text>

                {/* Content */}
                <View style={styles.content}>
                    <Text>{content.intro}</Text>
                </View>

                {content.subject && (
                    <View style={{ ...styles.content, marginTop: 10, marginBottom: 10, alignItems: 'center' }}>
                        <Text style={{ fontSize: 13, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 0.5 }}>
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

                {/* Signature */}
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
                                                                                                            `Pour la société ${data.entreprise || "..."}`}
                    </Text>
                    <View style={styles.signatureBox}>
                        {data.signatureDate ? (
                            <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                                <Text style={{ fontFamily: 'Helvetica-Oblique', fontSize: 10, marginBottom: 4 }}>
                                    {data.documentType === 'attestation_honneur' || data.documentType === 'attestation_vie_commune'
                                        ? `${data.prenom} ${data.nom}`
                                        : data.representativeName || "Signataire"}
                                </Text>
                                <Text style={{ fontSize: 8, color: '#6B7280' }}>
                                    Signé électroniquement le {data.signatureDate}
                                </Text>
                            </View>
                        ) : (
                            <Text style={styles.signaturePlaceholder}>[Cachet et Signature]</Text>
                        )}
                    </View>
                </View>

                {/* Footer */}
                {isCompanyDocument ? (
                    <View style={{
                        position: 'absolute',
                        bottom: 30,
                        left: 40,
                        right: 40,
                        borderTopWidth: 1,
                        borderTopColor: '#E5E7EB',
                        paddingTop: 12,
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontSize: 8, color: '#374151', textAlign: 'center', marginBottom: 3, fontWeight: 'bold' }}>
                            {data.entreprise}
                        </Text>
                        <Text style={{ fontSize: 7, color: '#4B5563', textAlign: 'center', marginBottom: 2 }}>
                            {data.companyAddress} {data.companyCity ? `- ${data.companyCity}` : ""}
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Text style={{ fontSize: 7, color: '#6B7280', marginHorizontal: 3 }}>
                                SIRET : {data.companySiret}
                            </Text>
                            {data.companyRcs && (
                                <Text style={{ fontSize: 7, color: '#6B7280', marginHorizontal: 3 }}>
                                    | RCS : {data.companyRcs}
                                </Text>
                            )}
                            {data.companyTva && (
                                <Text style={{ fontSize: 7, color: '#6B7280', marginHorizontal: 3 }}>
                                    | TVA : {data.companyTva}
                                </Text>
                            )}
                        </View>
                        {(data.companyEmail || data.companyPhone) && (
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 2 }}>
                                {data.companyPhone && (
                                    <Text style={{ fontSize: 7, color: '#6B7280', marginHorizontal: 4 }}>
                                        Tél : {data.companyPhone}
                                    </Text>
                                )}
                                {data.companyEmail && (
                                    <Text style={{ fontSize: 7, color: '#6B7280', marginHorizontal: 4 }}>
                                        Email : {data.companyEmail}
                                    </Text>
                                )}
                            </View>
                        )}
                    </View>
                ) : (
                    <Text style={styles.footer}>
                        Document généré automatiquement via JL Cloud - Ce document est certifié conforme aux informations saisies.
                    </Text>
                )}
            </Page>
        </Document>
    );
}
