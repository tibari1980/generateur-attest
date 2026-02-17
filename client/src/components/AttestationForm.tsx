"use client";

import { useState } from "react";
import { Loader2, CheckCircle, Download, RotateCcw, Cloud } from "lucide-react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import AttestationPDF from "./AttestationPDF";
import { AttestationFormData } from "../types/attestation";

// Field components
import IdentityFields from "./fields/IdentityFields";
import WorkFields from "./fields/WorkFields";
import PrefectureFields from "./fields/PrefectureFields";
import EducationFields from "./fields/EducationFields";
import LegalFields from "./fields/LegalFields";
import HousingFields from "./fields/HousingFields";
import PersonalFields from "./fields/PersonalFields";
import GeneralFields from "./fields/GeneralFields";

const PDFDownloadLink = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
        ssr: false,
        loading: () => <button className="btn btn-primary opacity-50 cursor-not-allowed">Chargement du module PDF...</button>,
    }
);

interface AttestationFormProps {
    externalData?: AttestationFormData;
    onDataChange?: (data: AttestationFormData) => void;
    isEmbedded?: boolean;
    lastSaved?: Date | null;
    isRestored?: boolean;
    clearSession?: () => void;
}

export default function AttestationForm({
    externalData,
    onDataChange,
    isEmbedded = false,
    lastSaved,
    isRestored,
    clearSession
}: AttestationFormProps) {
    const [isGenerated, setIsGenerated] = useState(false);
    const [localLoading, setLocalLoading] = useState(false);

    // Initial state for local fallback 
    const [localFormData, setLocalFormData] = useState<AttestationFormData>({
        documentType: "attestation_travail",
        civility: "Monsieur",
        nom: "",
        prenom: "",
        dateNaissance: "",
        lieuNaissance: "",
        email: "",
        poste: "",
        entreprise: "",
        dateDebut: "",
        signatureDate: "",
    });

    const formData = externalData || localFormData;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setIsGenerated(false);
        const { name, value } = e.target;
        const newData = { ...formData, [name]: value };

        if (onDataChange) {
            onDataChange(newData);
        } else {
            setLocalFormData(newData);
        }
    };

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        setLocalLoading(true);

        const now = new Date();
        const signatureDate = `${now.toLocaleDateString('fr-FR')} à ${now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;

        const updatedData = { ...formData, signatureDate };
        if (onDataChange) {
            onDataChange(updatedData);
        } else {
            setLocalFormData(updatedData);
        }

        setTimeout(() => {
            setIsGenerated(true);
            setLocalLoading(false);
        }, 1500);
    };

    return (
        <div className="form-container">
            {/* Auto-save Status Bar */}
            {clearSession && (
                <div className="flex justify-between items-center mb-6 px-1 text-sm">
                    <div className="flex items-center gap-2 text-[var(--muted)]">
                        <Cloud size={14} />
                        <span>
                            {lastSaved
                                ? `Sauvegardé à ${lastSaved.toLocaleTimeString()}`
                                : isRestored ? "Session restaurée" : "Brouillon automatique"}
                        </span>
                    </div>
                    <button
                        onClick={(e) => { e.preventDefault(); clearSession(); setIsGenerated(false); }}
                        className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors text-xs"
                    >
                        <RotateCcw size={12} />
                        Effacer tout
                    </button>
                </div>
            )}

            <form onSubmit={handleGenerate}>
                <motion.div
                    className="form-grid space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Modular Field Sections */}
                    <IdentityFields formData={formData} onChange={handleChange} />

                    <WorkFields formData={formData} onChange={handleChange} />

                    <PrefectureFields formData={formData} onChange={handleChange} />

                    <EducationFields formData={formData} onChange={handleChange} />

                    <LegalFields formData={formData} onChange={handleChange} />

                    <HousingFields formData={formData} onChange={handleChange} />

                    <PersonalFields formData={formData} onChange={handleChange} />

                    <GeneralFields formData={formData} onChange={handleChange} />
                </motion.div>

                <div className="mt-8" aria-live="polite" aria-atomic="true">
                    {!isGenerated ? (
                        <button
                            type="submit"
                            disabled={localLoading}
                            className={`w-full btn btn-primary py-3 text-lg ${localLoading ? 'opacity-70 cursor-wait' : ''}`}
                            aria-disabled={localLoading}
                        >
                            {localLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="animate-spin mr-2" aria-hidden="true" />
                                    Génération en cours...
                                </span>
                            ) : (
                                "Générer mon attestation"
                            )}
                        </button>
                    ) : (
                        <div className="space-y-4">
                            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-3 text-emerald-400 mb-4 animate-fade-in" role="status">
                                <CheckCircle size={24} aria-hidden="true" />
                                <span className="font-medium">Document prêt à être téléchargé !</span>
                            </div>

                            <PDFDownloadLink
                                document={<AttestationPDF data={formData} />}
                                fileName={`Attestation_${formData.nom || 'Document'}.pdf`}
                                className="w-full btn btn-primary py-3 text-lg flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 border-none no-underline"
                                aria-label="Télécharger attestation au format PDF"
                            >
                                {({ loading }) => (
                                    loading ? 'Préparation du PDF...' : (
                                        <>
                                            <Download size={20} aria-hidden="true" />
                                            Télécharger le PDF
                                        </>
                                    )
                                )}
                            </PDFDownloadLink>

                            <button
                                type="button"
                                onClick={(e) => { e.preventDefault(); setIsGenerated(false); }}
                                className="w-full btn btn-secondary mt-2 text-sm"
                            >
                                Modifier les informations
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}
