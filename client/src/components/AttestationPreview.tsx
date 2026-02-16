"use client";

import { FileText } from "lucide-react";
import { getDocumentTitle, getFormattedDate } from "@/utils/attestationUtils";

interface AttestationPreviewProps {
    data: {
        documentType: string;
        civility?: string;
        nom: string;
        prenom: string;
        dateNaissance?: string;
        lieuNaissance?: string;
        signatureDate?: string;
        poste: string;
        entreprise: string;
        dateDebut: string;
        dateFin: string;
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
        // Financial Support
        amount?: string;
        duration?: string;
        beneficiaryName?: string;
        beneficiaryFirstName?: string;
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

// ... existing code ...

const getPdfContent = (type: string, data: any) => {
    // ...
}

export default function AttestationPreview({ data }: AttestationPreviewProps) {
    const today = getFormattedDate();

    // Internal helper for Preview content (HTML/JSX)
    const getPreviewContent = () => {
        const { documentType } = data;

        const civility = data.civility === "Madame" ? "Mme" : "M.";
        const fullName = `${civility} ${data.prenom || "[Prénom]"} ${data.nom || "[Nom]"}`;
        const birthInfo = (data.dateNaissance && data.lieuNaissance) ?
            <span className="block mt-2 text-base font-normal">né(e) le {data.dateNaissance.split('-').reverse().join('/')} à {data.lieuNaissance}</span> : null;

        switch (documentType) {
            case "attestation_travail":
                return (
                    <>
                        <p>
                            Je soussigné(e), <strong>{data.representativeName || "[Nom du Représentant]"}</strong>, agissant en qualité de Directeur chez <strong>{data.entreprise || "[Nom de l'entreprise]"}</strong>, certifie que :
                        </p>
                        <div className="text-lg text-center font-medium my-8">
                            <strong>{fullName}</strong>
                            {birthInfo}
                        </div>
                        <p>
                            Est employé(e) au sein de notre société en qualité de <strong>{data.poste || "[Poste Occupé]"}</strong> depuis le <strong>{data.dateDebut || "[Date de début]"}</strong>
                            {data.dateFin ? ` jusqu'au ${data.dateFin}` : " et est toujours en poste à ce jour"}.
                        </p>
                    </>
                );
            case "attestation_stage":
                return (
                    <>
                        <p>
                            Je soussigné(e), <strong>{data.representativeName || "[Nom du Représentant]"}</strong>, agissant en qualité de Directeur chez <strong>{data.entreprise || "[Nom de l'entreprise]"}</strong>, atteste que :
                        </p>
                        <div className="text-lg text-center font-medium my-8">
                            {civility === "Mme" ? "L'étudiante" : "L'étudiant"} <strong>{data.prenom || "[Prénom]"} {data.nom || "[Nom]"}</strong>
                            {birthInfo}
                        </div>
                        <p>
                            A effectué un stage conventionné au sein de notre entreprise en tant que <strong>{data.poste || "[Poste Occupé]"}</strong> du <strong>{data.dateDebut || "[Date de début]"}</strong> au {data.dateFin || "[Date de fin]"}.
                        </p>
                    </>
                );
            case "justificatif_domicile":
                return (
                    <>
                        <p>
                            Je soussigné(e), <strong>{data.representativeName || "[Nom du Hébergeant]"}</strong>, demeurant à <strong>{data.address || "[Adresse du logement]"}</strong>, atteste sur l'honneur héberger à titre gratuit :
                        </p>
                        <div className="text-lg text-center font-medium my-8">
                            <strong>{fullName}</strong>
                            {birthInfo}
                        </div>
                        <p>
                            A mon domicile ci-dessus mentionné, et ce depuis le <strong>{data.dateDebut || "[Date de début]"}</strong>.
                        </p>
                    </>
                );
            case "attestation_honneur":
                return (
                    <>
                        <p>
                            Je soussigné(e), <strong>{fullName}</strong>,
                            {birthInfo && <span className="block my-2">né(e) le {data.dateNaissance?.split('-').reverse().join('/')} à {data.lieuNaissance},</span>}
                        </p>
                        <p>
                            Demeurant à <strong>{data.address || "[Adresse complète]"}</strong>,
                        </p>
                        <p>
                            Atteste sur l'honneur l'exactitude des faits suivants : <br /><br />
                            Que j'exerce la profession de <strong>{data.poste || "[Profession]"}</strong> au sein de l'entreprise <strong>{data.entreprise || "[Entreprise]"}</strong> depuis le {data.dateDebut || "[Date]"}.
                            <br /><br />
                            J'ai connaissance des sanctions pénales encourues par l'auteur d'une fausse attestation.
                        </p>
                    </>
                );
            case "certificat_scolarite":
                return (
                    <>
                        <p>
                            Le Directeur de l'établissement <strong>{data.establishment || "[Nom de l'établissement]"}</strong> certifie que :
                        </p>
                        <div className="text-lg text-center font-medium my-8">
                            {civility === "Mme" ? "L'étudiante" : "L'étudiant"} <strong>{data.prenom || "[Prénom]"} {data.nom || "[Nom]"}</strong>
                            {birthInfo}
                        </div>
                        <p>
                            Est régulièrement inscrit(e) en <strong>{data.level || "[Classe / Niveau]"}</strong> pour l'année scolaire <strong>{data.academicYear || "[Année]"}</strong>.
                        </p>
                        <p>
                            Fait pour servir et valoir ce que de droit.
                        </p>
                    </>
                );
            case "lettre_recommandation":
                return (
                    <>
                        <p>
                            Je soussigné(e), <strong>{data.representativeName || "[Nom du Recommandant]"}</strong>, agissant en tant que <strong>{data.recommenderPosition || "[Poste]"}</strong> chez <strong>{data.entreprise || "[Entreprise]"}</strong>, recommande vivement :
                        </p>
                        <div className="text-lg text-center font-medium my-8">
                            <strong>{fullName}</strong>
                            {birthInfo}
                        </div>
                        <p>
                            J'ai eu le plaisir de superviser ce collaborateur en ma qualité de <strong>{data.relation || "[Relation]"}</strong>.
                            Durant la période du <strong>{data.dateDebut || "[Début]"}</strong> au {data.dateFin || "[Fin]"}, il/elle a fait preuve d'un professionnalisme exemplaire, de rigueur et d'un excellent esprit d'équipe.
                        </p>
                        <p>
                            Je suis convaincu(e) qu'il/elle sera un atout précieux pour toute organisation.
                        </p>
                    </>
                );
            case "attestation_hebergement":
                return (
                    <>
                        <p>
                            Je soussigné(e), <strong>{data.representativeName || "[Nom de l'hébergeant]"}</strong>,
                            né(e) le <strong>{data.hostDob || "[Date]"}</strong> à <strong>{data.hostPob || "[Lieu]"}</strong>,
                            demeurant au <strong>{data.address || "[Adresse complète]"}</strong>,
                        </p>
                        <p className="mt-4">
                            Atteste sur l'honneur héberger à mon domicile :
                        </p>
                        <div className="text-lg text-center font-medium my-6">
                            <strong>{fullName}</strong>
                            {birthInfo}
                        </div>
                        <p className="mt-4">
                            Cet hébergement est effectué <strong>à titre gratuit</strong>, sans contrat de location ni sous-location,
                            et ce depuis le <strong>{data.dateDebut || "[Date de début]"}</strong>.
                        </p>
                        <p>
                            Fait pour servir et valoir ce que de droit.
                        </p>
                    </>
                );
            case "attestation_vie_commune":
                const relationshipText = data.relationshipType === 'mariés' ? "mariés" :
                    data.relationshipType === 'pacsés' ? "pacsés" :
                        "concubins en union libre";
                const dateDebutFormatted = data.dateDebut ? data.dateDebut.split('-').reverse().join('/') : "[Date]";

                return (
                    <div className="text-left space-y-4">
                        <p>
                            Je soussigné(e) <strong>{fullName}</strong>,<br />
                            {birthInfo ? <span>{birthInfo},</span> : <span>né(e) le [Date] à [Lieu],</span>}<br />
                            de nationalité <strong>{data.nationality || "[Nationalité]"}</strong>,<br />
                            domicilié(e) au <strong>{data.address || "[Adresse complète]"}</strong>,
                        </p>

                        <p className="mt-6">
                            Atteste sur l'honneur vivre maritalement en communauté de vie affective et matérielle
                            depuis le <strong>{dateDebutFormatted}</strong> avec :
                        </p>

                        <p className="mt-4 pl-4 border-l-2 border-gray-200">
                            Monsieur / Madame <strong>{data.partnerFirstname || "[Prénom]"} {data.partnerName || "[Nom]"}</strong>,<br />
                            {(data.partnerDob && data.partnerPob) ?
                                <span>né(e) le {data.partnerDob.split('-').reverse().join('/')} à {data.partnerPob},</span> : <span>né(e) le [Date] à [Lieu],</span>
                            }<br />
                            de nationalité <strong>{data.partnerNationality || "[Nationalité]"}</strong>,<br />
                            domicilié(e) au même adresse : <strong>{data.address || "[Adresse complète]"}</strong>.
                        </p>

                        <p className="mt-6">
                            Nous sommes <strong>{relationshipText}</strong>.
                        </p>

                        <p className="mt-8 text-right">
                            Fait à <strong>{data.city || "[Ville]"}</strong>, le {today}.
                        </p>
                    </div>
                );
            case "attestation_financiere":
                return (
                    <>
                        <p>
                            Je soussigné(e), <strong>{fullName}</strong>,
                            {birthInfo && <span className="block my-2">né(e) le {data.dateNaissance?.split('-').reverse().join('/')} à {data.lieuNaissance},</span>}
                            demeurant à <strong>{data.address || "[Adresse complète]"}</strong>,
                        </p>
                        <p className="mt-6">
                            M'engage sur l'honneur à subvenir aux besoins financiers de :
                        </p>
                        <div className="text-lg text-center font-medium my-6">
                            M. / Mme <strong>{data.beneficiaryFirstName || "[Prénom]"} {data.beneficiaryName || "[Nom]"}</strong>
                        </div>
                        <p>
                            Pour ses frais de vie (hébergement, nourriture, soins, etc.)
                            {data.amount && <> à hauteur de <strong>{data.amount}€ par mois</strong></>}
                            {data.duration && <> pour une durée de <strong>{data.duration}</strong></>}.
                        </p>
                        <p className="mt-4">
                            Cet engagement prend effet à compter du <strong>{data.dateDebut ? data.dateDebut.split('-').reverse().join('/') : "[Date de début]"}</strong>.
                        </p>
                    </>
                );
            case "attestation_non_polygamie":
                const statusLabel = data.maritalStatus === 'marie' ? "Marié(e)" :
                    data.maritalStatus === 'divorce' ? "Divorcé(e)" :
                        data.maritalStatus === 'veuf' ? "Veuf / Veuve" : "Célibataire";

                return (
                    <>
                        <p>
                            Je soussigné(e), <strong>{fullName}</strong>,
                            {birthInfo && <span className="block my-2">né(e) le {data.dateNaissance?.split('-').reverse().join('/')} à {data.lieuNaissance},</span>}
                            demeurant à <strong>{data.address || "[Adresse complète]"}</strong>,
                        </p>
                        <p className="mt-8 p-4 bg-gray-50 border-l-4 border-indigo-500 italic">
                            Déclare sur l'honneur ne pas vivre en état de polygamie en France.
                        </p>
                        <div className="mt-6 space-y-2">
                            <p>Situation matrimoniale : <strong>{statusLabel}</strong></p>
                            {data.maritalStatus === 'marie' && data.marriageDate && (
                                <p>Date de mariage : <strong>{data.marriageDate.split('-').reverse().join('/')}</strong></p>
                            )}
                        </div>
                        <p className="mt-8 text-sm text-gray-500">
                            Je suis conscient(e) que cette attestation est établie pour servir et valoir ce que de droit.
                        </p>
                    </>
                );
            case "attestation_residence":
                return (
                    <>
                        <p>
                            Je soussigné(e), <strong>{fullName}</strong>,
                            {birthInfo && <span className="block my-2">né(e) le {data.dateNaissance?.split('-').reverse().join('/')} à {data.lieuNaissance},</span>}
                            demeurant au <strong>{data.address || "[Adresse complète]"}</strong>,
                        </p>
                        <p className="mt-6">
                            Atteste sur l'honneur résider effectivement et de manière habituelle à l'adresse susmentionnée
                            depuis le <strong>{data.dateDebut ? data.dateDebut.split('-').reverse().join('/') : "[Date de début]"}</strong>.
                        </p>
                        <p className="mt-4 text-sm text-gray-500">
                            J'ai connaissance des sanctions pénales encourues par l'auteur d'une fausse attestation.
                        </p>
                    </>
                );
            case "attestation_respect_principes":
                return (
                    <>
                        <p>
                            Je soussigné(e), <strong>{fullName}</strong>,
                            {birthInfo && <span className="block my-2">né(e) le {data.dateNaissance?.split('-').reverse().join('/')} à {data.lieuNaissance},</span>}
                            demeurant au <strong>{data.address || "[Adresse complète]"}</strong>,
                        </p>
                        <p className="mt-6">
                            M'engage solennellement à respecter les principes de la République française, à savoir :
                        </p>
                        <ul className="list-decimal pl-6 mt-4 space-y-2 font-medium">
                            <li>La liberté personnelle</li>
                            <li>La liberté d'expression et de conscience</li>
                            <li>L'égalité entre les femmes et les hommes</li>
                            <li>La dignité de la personne humaine</li>
                            <li>La devise et les symboles de la République</li>
                            <li>L'intégrité territoriale</li>
                            <li>La laïcité</li>
                        </ul>
                        <p className="mt-6 font-bold text-center">
                            Je déclare respecter ces principes et ne pas agir contre eux.
                        </p>
                    </>
                );
            case "attestation_concordance":
                return (
                    <>
                        <p>
                            Je soussigné(e), <strong>{fullName}</strong>,
                            {birthInfo && <span className="block my-2">né(e) le {data.dateNaissance?.split('-').reverse().join('/')} à {data.lieuNaissance},</span>}
                            demeurant au <strong>{data.address || "[Adresse complète]"}</strong>,
                        </p>
                        <p className="mt-6">
                            Atteste sur l'honneur que les documents suivants désignent bien ma personne, malgré les différences constatées :
                        </p>

                        <div className="grid grid-cols-2 gap-4 my-6 text-sm">
                            <div className="p-4 bg-gray-50 border border-gray-200 rounded">
                                <strong className="block mb-2 text-indigo-600 uppercase text-xs">Document 1 ({data.doc1Type || "Type"})</strong>
                                <div className="font-bold">{data.doc1Name || "Nom"} {data.doc1Firstname || "Prénom"}</div>
                            </div>
                            <div className="p-4 bg-gray-50 border border-gray-200 rounded">
                                <strong className="block mb-2 text-indigo-600 uppercase text-xs">Document 2 ({data.doc2Type || "Type"})</strong>
                                <div className="font-bold">{data.doc2Name || "Nom"} {data.doc2Firstname || "Prénom"}</div>
                            </div>
                        </div>

                        <p className="mb-2">
                            Nature de la différence : <strong>{data.discordanceType || "[Raison]"}</strong>.
                        </p>
                        <p className="text-sm text-gray-500">
                            Ces variations désignent une seule et même personne physique (moi-même).
                        </p>
                    </>
                );
            case "attestation_promesse_embauche":
                return (
                    <>
                        <p>
                            Nous soussignés, <strong>{data.entreprise || "[Entreprise]"}</strong>,
                            représentés par <strong>{data.representativeName || "[Nom]"}</strong>,
                        </p>
                        <p className="mt-4 font-bold text-lg text-center underline">
                            Objet : Promesse d'embauche
                        </p>
                        <p className="mt-4">
                            Avons le plaisir de confirmer notre intention d'embaucher :<br />
                            <strong>M. / Mme {fullName}</strong>
                        </p>
                        <div className="my-6 p-4 bg-gray-50 border border-gray-200 rounded text-sm space-y-2">
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Poste :</span>
                                <span className="font-bold">{data.poste || "..."}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Type de contrat :</span>
                                <span className="font-bold">{data.contractType || "CDI"}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Date de début :</span>
                                <span className="font-bold">{data.dateDebut ? data.dateDebut.split('-').reverse().join('/') : "..."}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Période d'essai :</span>
                                <span className="font-bold">{data.trialPeriod || "Non spécifiée"}</span>
                            </div>
                            <div className="flex justify-between pt-2">
                                <span className="text-gray-600">Rémunération :</span>
                                <span className="font-bold">{data.salaryAmount || "..."} € {data.salaryType || "Brut"} / {data.salaryFrequency || "Mensuel"}</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500">
                            Cette promesse est faite sous réserve de la fourniture des documents administratifs nécessaires.
                        </p>
                    </>
                );
            case "attestation_salaire":
                return (
                    <>
                        <p>
                            Je soussigné(e), <strong>{data.representativeName || "[Nom]"}</strong>,
                            agissant pour le compte de <strong>{data.entreprise || "[Entreprise]"}</strong>, certifie que :
                        </p>
                        <div className="my-4 text-center font-bold text-lg">
                            M. / Mme {fullName}
                        </div>
                        <p>
                            Est employé(e) au sein de notre société depuis le <strong>{data.dateDebut ? data.dateDebut.split('-').reverse().join('/') : "..."}</strong> en qualité de <strong>{data.poste || "..."}</strong>.
                        </p>
                        <div className="my-6 p-4 bg-green-50 border border-green-200 rounded text-sm">
                            <h4 className="font-bold text-green-800 mb-3 border-b border-green-200 pb-2">Rémunération Actuelle</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="block text-xs uppercase text-green-600">Salaire Brut Mensuel</span>
                                    <span className="font-bold text-lg">{data.salaryGross || "..."} €</span>
                                </div>
                                <div>
                                    <span className="block text-xs uppercase text-green-600">Salaire Net Mensuel</span>
                                    <span className="font-bold text-lg">{data.salaryNet || "..."} €</span>
                                </div>
                            </div>
                            {data.bonuses && (
                                <div className="mt-4 pt-2 border-t border-green-200">
                                    <span className="block text-xs uppercase text-green-600">Primes / Avantages</span>
                                    <span>{data.bonuses}</span>
                                </div>
                            )}
                        </div>
                        <p className="text-sm text-gray-500">
                            Je certifie également que l'intéressé(e) n'est ni en période d'essai, ni en préavis de démission ou de licenciement.
                        </p>
                    </>
                );
            case "attestation_teletravail":
                return (
                    <>
                        <p>
                            Je soussigné(e), <strong>{data.representativeName || "[Nom]"}</strong>,
                            représentant <strong>{data.entreprise || "[Entreprise]"}</strong>, atteste que :
                        </p>
                        <div className="my-4 text-center font-bold text-lg">
                            M. / Mme {fullName}
                        </div>
                        <p>
                            Occupant le poste de <strong>{data.poste || "..."}</strong>, est autorisé(e) à exercer ses fonctions en télétravail selon les modalités suivantes :
                        </p>
                        <ul className="my-6 space-y-3 p-4 bg-blue-50 border border-blue-200 rounded text-sm">
                            <li className="flex items-center gap-2">
                                <span className="w-4 h-4 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 text-xs font-bold">1</span>
                                <span>Volume : <strong>{data.remoteDays || "..."} jours par semaine</strong></span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-4 h-4 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 text-xs font-bold">2</span>
                                <span>Jours fixes : <strong>{data.remoteFixedDays || "Non définis"}</strong></span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-4 h-4 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 text-xs font-bold">3</span>
                                <span>Lieu autorisé : <strong>{data.remoteLocation || "Domicile"}</strong></span>
                            </li>
                        </ul>
                        <p className="text-sm text-gray-500">
                            Cette organisation est effective à compter de la signature de la présente.
                        </p>
                    </>
                );
            case "attestation_assiduite":
                return (
                    <>
                        <p>
                            Je soussigné(e), <strong>{fullName}</strong>, Responsable de Formation.
                        </p>
                        <p className="mt-4">
                            Certifie que le stagiaire a suivi l'action de formation :<br />
                            <strong className="text-lg text-blue-800">{data.trainingTitle || "[Intitulé Formation]"}</strong>
                        </p>
                        <div className="grid grid-cols-2 gap-4 my-4 p-4 bg-gray-50 rounded border">
                            <div>
                                <span className="text-xs text-gray-500 uppercase">Volume Horaire</span>
                                <div className="font-bold">{data.trainingHours || "..."}</div>
                            </div>
                            <div>
                                <span className="text-xs text-gray-500 uppercase">Taux de réalisation</span>
                                <div className="font-bold text-green-600">{data.assiduityRate || "100%"}</div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500">
                            Période du {data.dateDebut ? data.dateDebut.split('-').reverse().join('/') : "..."} au {data.dateFin ? data.dateFin.split('-').reverse().join('/') : "..."}.
                        </p>
                    </>
                );
            case "attestation_reussite":
                return (
                    <>
                        <h4 className="text-center font-serif text-xl mb-6">DIPLÔME NATIONAL</h4>
                        <p>
                            Le Jury, réuni le {data.signatureDate ? data.signatureDate.split(' à')[0] : "..."} sous la présidence de <strong>{fullName}</strong>,
                        </p>
                        <p className="mt-4">
                            Déclare le candidat admissible au grade de :
                        </p>
                        <div className="my-6 p-6 bg-yellow-50 border-2 border-yellow-200 border-double rounded text-center">
                            <strong className="block text-2xl font-serif text-gray-900 mb-2">{data.diplomaTitle || "[Diplôme]"}</strong>
                            {data.diplomaSpeciality && <span className="block text-lg text-gray-700 italic">{data.diplomaSpeciality}</span>}
                        </div>
                        <p className="text-center">
                            Mention : <strong className="uppercase">{data.diplomaMention || "Passable"}</strong>
                        </p>
                    </>
                );
            case "attestation_examen":
                return (
                    <>
                        <p>
                            Je soussigné(e), <strong>{fullName}</strong>, représentant l'Administration.
                        </p>
                        <p className="mt-4">
                            Certifie la présence de l'étudiant aux épreuves suivantes :
                        </p>
                        <div className="my-4 p-4 bg-white border border-gray-200 rounded shadow-sm whitespace-pre-wrap font-mono text-sm">
                            {data.examList || "Aucune épreuve renseignée."}
                        </div>
                        <p className="text-sm italic text-gray-500 mt-2">
                            Cette attestation est délivrée pour justifier d'une absence professionnelle ou scolaire.
                        </p>
                    </>
                );
            case "quittance_loyer":
                return (
                    <>
                        <h4 className="text-center font-bold text-lg mb-4 uppercase tracking-wider border-b pb-2">QUITTANCE DE LOYER</h4>
                        <p>
                            Je soussigné(e), <strong>{fullName}</strong>, Propriétaire.
                        </p>
                        <p className="mt-4">
                            Reconnais avoir reçu ce jour de la part du locataire le paiement complet pour la période :
                        </p>
                        <div className="my-4 p-4 bg-emerald-50 border border-emerald-200 rounded text-center">
                            <strong className="block text-xl text-emerald-800 mb-1">{data.rentPeriod || "[Mois / Année]"}</strong>
                            <div className="text-sm text-emerald-600">Total payé : <span className="font-mono font-bold">{(parseFloat(data.rentAmount || "0") + parseFloat(data.chargesAmount || "0")).toFixed(2)} €</span></div>
                        </div>
                        <ul className="text-sm space-y-1 mb-4">
                            <li>Loyer nu : {data.rentAmount || "0"} €</li>
                            <li>Provisions charges : {data.chargesAmount || "0"} €</li>
                        </ul>
                        <p className="text-sm text-gray-500">
                            Date du paiement : {data.paymentDate ? data.paymentDate.split('-').reverse().join('/') : "..."}
                        </p>
                    </>
                );
            case "attestation_loyer_ajour":
                return (
                    <>
                        <p>
                            Je soussigné(e), <strong>{fullName}</strong>, Propriétaire du logement.
                        </p>
                        <p className="mt-4">
                            Certifie que le locataire est <strong>à jour de ses loyers et charges</strong> à ce jour.
                        </p>
                        <div className="my-6 p-4 bg-blue-50 border border-blue-200 rounded flex items-center gap-3">
                            <div className="text-2xl">👍</div>
                            <div>
                                <div className="font-semibold text-blue-900">Locataire exemplaire</div>
                                <div className="text-sm text-blue-700">Aucun impayé constaté.</div>
                            </div>
                        </div>
                        <p>
                            Date d'entrée dans les lieux : {data.entryDate ? data.entryDate.split('-').reverse().join('/') : "..."}.
                        </p>
                    </>
                );
            case "attestation_fin_bail":
                return (
                    <>
                        <p>
                            Je soussigné(e), <strong>{fullName}</strong>, Propriétaire.
                        </p>
                        <p className="mt-4">
                            Certifie que le locataire a quitté le logement et rendu les clés le :
                        </p>
                        <div className="text-center my-6">
                            <span className="inline-block px-4 py-2 bg-gray-100 rounded-full font-mono font-bold text-lg">
                                {data.departureDate ? data.departureDate.split('-').reverse().join('/') : "[Date de départ]"}
                            </span>
                        </div>
                        {data.newAddress && (
                            <p className="text-sm text-gray-600 border-l-2 border-gray-300 pl-3 italic">
                                Nouvelle adresse : {data.newAddress}
                            </p>
                        )}
                        <p className="mt-4 font-semibold text-sm">
                            Situation : {data.paymentStatus || "Soldé"}
                        </p>
                    </>
                );
            case "attestation_temoin":
                return (
                    <>
                        <h4 className="text-center font-bold text-red-600 mb-4 border-b pb-2">Article 202 du Code de Procédure Civile</h4>
                        <p>
                            Je soussigné(e), <strong>{fullName}</strong>, exerçant la profession de <strong>{data.profession || "..."}</strong>.
                        </p>
                        <p className="mt-2">
                            Lien avec les parties : <strong>{data.witnessLink || "Aucun"}</strong>.
                        </p>
                        <div className="my-4 p-4 bg-orange-50 border border-orange-200 rounded text-sm italic text-orange-800">
                            "Je sais que cette attestation est établie en vue de sa production en justice et que toute fausse déclaration de ma part m'expose à des sanctions pénales."
                        </div>
                        <h5 className="font-bold mt-4 mb-2">FAITS CONSTATÉS :</h5>
                        <div className="p-4 bg-gray-50 border border-gray-200 rounded min-h-[100px] whitespace-pre-wrap">
                            {data.facts || "..."}
                        </div>
                    </>
                );
            case "attestation_procuration":
                return (
                    <>
                        <p>
                            Je soussigné(e), <strong>{fullName}</strong> (Le Mandant),
                        </p>
                        <p className="mt-4 text-center text-lg">
                            DONNE POUVOIR À :
                        </p>
                        <div className="my-4 p-4 bg-blue-50 border border-blue-200 rounded text-center">
                            <strong className="block text-xl">{data.mandatairePrenom || "[Prénom]"} {data.mandataireNom || "[Nom]"}</strong>
                            <div className="text-sm text-gray-600 mt-1">{data.mandataireAdresse || "[Adresse du mandataire]"}</div>
                            <div className="text-xs uppercase text-blue-500 font-bold mt-2">(Le Mandataire)</div>
                        </div>
                        <p>
                            Pour effectuer en mon nom les démarches suivantes :<br />
                            <strong>{data.mandateObject || "..."}</strong>
                        </p>
                        <p className="mt-4 text-sm text-gray-500">
                            Validité : <strong>{data.mandateDuration || "Indéterminée"}</strong>.
                        </p>
                        <p className="mt-4 font-bold text-center border-t pt-4">
                            "Bon pour pouvoir"
                        </p>
                    </>
                );
            case "attestation_separation":
                return (
                    <>
                        <p>
                            Je soussigné(e), <strong>{fullName}</strong>,
                            demeurant au <strong>{data.address || "[Adresse complète]"}</strong>,
                        </p>
                        <p className="mt-6">
                            Déclare sur l'honneur être séparé(e) de fait de :<br />
                            <strong>M. / Mme {data.exPartnerPrenom || "..."} {data.exPartnerNom || "..."}</strong>
                        </p>
                        {data.exPartnerAdresse && (
                            <p className="mt-2 text-sm text-gray-600">
                                Résidant actuellement à : {data.exPartnerAdresse}
                            </p>
                        )}
                        <div className="my-6 p-4 bg-purple-50 border border-purple-200 rounded text-center">
                            <span className="block text-sm text-purple-800 mb-1">Date de séparation effective</span>
                            <strong className="text-2xl text-purple-900">{data.separationDate ? data.separationDate.split('-').reverse().join('/') : "..."}</strong>
                        </div>
                        <p className="text-sm text-gray-500">
                            Nous ne partageons plus de vie commune ni de résidence conjugale depuis cette date.
                        </p>
                    </>
                );
            default:
                return <p>Document généré automatiquement.</p>;
        }
    };

    const getSignatureLabel = () => {
        switch (data.documentType) {
            case "justificatif_domicile": return "Le Hébergeant";
            case "attestation_honneur": return "Le Déclarant";
            case "certificat_scolarite": return "Le Directeur de l'Établissement";
            case "lettre_recommandation": return "Le Recommandant";
            case "attestation_hebergement": return "L'Hébergeant";
            case "attestation_vie_commune": return "Les Déclarants";
            case "attestation_financiere": return "Le Garant";
            case "attestation_non_polygamie": return "Le Déclarant";
            case "attestation_residence": return "Le Déclarant";
            case "attestation_respect_principes": return "Le Signataire";
            case "attestation_concordance": return "Le Déclarant";
            case "attestation_promesse_embauche": return "Pour l'Employeur";
            case "attestation_salaire": return "L'Employeur";
            case "attestation_teletravail": return "L'Employeur";
            case "attestation_temoin": return "Le Témoin";
            case "attestation_procuration": return "Le Mandant";
            case "attestation_separation": return "Le Déclarant";
            case "attestation_assiduite": return "Le Responsable";
            case "attestation_reussite": return "Le Président du Jury";
            case "attestation_examen": return "L'Administration";
            case "quittance_loyer": return "Le Propriétaire";
            case "attestation_loyer_ajour": return "Le Propriétaire";
            case "attestation_fin_bail": return "Le Propriétaire";
            default: return `Pour l'entreprise ${data.entreprise || "..."}`;
        }
    };

    return (
        <div className="preview-container glass-panel h-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

            <div className="bg-white text-black p-8 md:p-12 shadow-2xl w-full max-w-lg min-h-[600px] flex flex-col relative">
                {/* Header */}
                <div className="flex justify-between items-start mb-12">
                    <div className="flex items-center gap-2 text-indigo-600">
                        {/* Logo Removed as requested */}
                    </div>
                    <div className="text-right text-sm text-gray-500">
                        <p>Fait à Paris,</p>
                        <p>Le {today}</p>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-center mb-12 uppercase border-b-2 border-black pb-2 self-center">
                    {getDocumentTitle(data.documentType)}
                </h2>

                {/* Content */}
                <div className="flex-grow space-y-6 text-justify leading-relaxed">
                    {getPreviewContent()}

                    <p>
                        Cette attestation est délivrée à la demande de l'intéressé(e) pour servir et valoir ce que de droit.
                    </p>
                </div>

                {/* Signature */}
                <div className="mt-16 self-end text-center">
                    <p className="mb-4 font-medium">{getSignatureLabel()}</p>
                    <div className="w-32 h-16 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm bg-gray-50">
                        [Zone de signature]
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Non signé</p>
                </div>

                {/* Watermark overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
                    <div className="transform -rotate-45 text-gray-100 text-6xl md:text-8xl font-black opacity-50 whitespace-nowrap">
                        PRÉVISUALISATION
                    </div>
                </div>
            </div>
        </div>
    );
}
