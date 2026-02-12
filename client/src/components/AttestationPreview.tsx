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
