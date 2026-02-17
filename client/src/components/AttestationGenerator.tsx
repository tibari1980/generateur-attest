"use client";

import { useEffect, useState } from "react";
import AttestationForm from "./AttestationForm";
import AttestationPreview from "./AttestationPreview";
import AttestationSelector from "./AttestationSelector";
import { useGuestSession } from "@/hooks/useGuestSession";
import { useAuth } from "@/context/AuthContext";
import { FileText, ArrowLeft } from "lucide-react";
import { ATTESTATIONS } from "@/constants/attestations";
import { AttestationFormData } from "@/types/attestation";

export default function AttestationGenerator() {
    const { user, userProfile } = useAuth();
    const [isSelectorOpen, setIsSelectorOpen] = useState(true);

    // Default empty state
    const initialValues: AttestationFormData = {
        documentType: "attestation_travail",
        civility: "Monsieur",
        nom: "",
        prenom: "",
        dateNaissance: "",
        lieuNaissance: "",
        email: "",
        poste: "",
        entreprise: "",
        address: "",
        representativeName: "",
        establishment: "",
        level: "",
        academicYear: "",
        recommenderPosition: "",
        relation: "",
        hostDob: "",
        hostPob: "",
        hostedDob: "",
        hostedPob: "",
        dateDebut: "",
        dateFin: "",
        signatureDate: "",
        // Partner fields for Vie Commune
        partnerName: "",
        partnerFirstname: "",
        partnerDob: "",
        partnerPob: "",
        nationality: "Française",
        partnerNationality: "Française",
        relationshipType: "concubins", // mariés, pacsés, concubins
        city: "",
    };

    // Use persistence hook
    const {
        data: formData,
        updateData: setFormData,
        isRestored,
        lastSaved,
        clearSession
    } = useGuestSession(initialValues);

    // Pre-fill with User Profile Data if logged in AND no session restored (or empty form)
    useEffect(() => {
        if (userProfile && !isRestored && !formData.nom) {
            setFormData({
                ...formData,
                email: userProfile.email || "",
                civility: userProfile.civility || "Monsieur",
                nom: userProfile.nom || "",
                prenom: userProfile.prenom || "",
                dateNaissance: userProfile.dateNaissance || "",
                lieuNaissance: userProfile.lieuNaissance || "",
                representativeName: userProfile.displayName || ""
            } as AttestationFormData);
        } else if (user && !userProfile && !isRestored && !formData.nom) {
            const names = user.displayName?.split(' ') || [];
            const prenom = names[0] || "";
            const nom = names.slice(1).join(' ') || "";

            setFormData({
                ...formData,
                email: user.email || "",
                prenom: prenom,
                nom: nom,
                representativeName: user.displayName || ""
            } as AttestationFormData);
        }
    }, [user, userProfile, isRestored]);

    const handleFormChange = (newData: AttestationFormData) => {
        setFormData(newData);
    };

    const handleSelectType = (type: string) => {
        setFormData({ ...formData, documentType: type });
        setIsSelectorOpen(false);

        // Move focus to the form when it opens
        setTimeout(() => {
            const firstInput = document.getElementById('civility');
            if (firstInput) {
                firstInput.focus();
            } else {
                const generatorHeader = document.querySelector('#generator h2');
                if (generatorHeader instanceof HTMLElement) {
                    generatorHeader.tabIndex = -1;
                    generatorHeader.focus();
                }
            }
        }, 100);

        const generatorElement = document.getElementById('generator-content');
        if (generatorElement && window.innerWidth < 768) {
            generatorElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const selectedAttestation = ATTESTATIONS.find(a => a.id === formData.documentType);

    return (
        <div id="generator" className="container py-20">
            {/* Section Header */}
            <div style={{ maxWidth: 960, margin: '0 auto 3rem' }}>
                <h2 className="text-gradient" style={{ marginBottom: '0.5rem' }}>
                    {isSelectorOpen ? 'Choisissez votre document' : 'Remplissez vos informations'}
                </h2>
                <p style={{ fontSize: '1.05rem', maxWidth: 520 }}>
                    {isSelectorOpen
                        ? 'Sélectionnez le type de document à générer parmi les catégories ci-dessous.'
                        : `Vous créez : ${selectedAttestation?.title || 'Document'}`
                    }
                </p>

                {/* Back to selector when form is open */}
                {!isSelectorOpen && (
                    <button
                        onClick={() => setIsSelectorOpen(true)}
                        aria-label="Retourner au choix du document"
                        className="back-selector-btn focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginTop: '1rem',
                            padding: '0.5rem 1rem',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            color: 'var(--primary)',
                            background: 'rgba(var(--primary-rgb), 0.08)',
                            border: '1px solid rgba(var(--primary-rgb), 0.15)',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                    >
                        <ArrowLeft size={15} aria-hidden="true" />
                        Changer de document
                    </button>
                )}
            </div>

            <div id="generator-content">
                {isSelectorOpen ? (
                    <AttestationSelector
                        onSelect={handleSelectType}
                        currentType={formData.documentType}
                    />
                ) : (
                    <div className="split-screen-container animate-fade-in">
                        {/* Left Column: Form */}
                        <div className="split-col w-full">
                            {user && (
                                <p style={{
                                    fontSize: '0.75rem',
                                    color: '#34d399',
                                    marginBottom: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.375rem',
                                }}>
                                    <span style={{
                                        width: 6, height: 6,
                                        borderRadius: '50%',
                                        background: '#34d399',
                                        display: 'inline-block',
                                    }} />
                                    Connecté : {user.displayName || user.email}
                                </p>
                            )}
                            <AttestationForm
                                externalData={formData}
                                onDataChange={handleFormChange}
                                isEmbedded={true}
                                lastSaved={lastSaved}
                                isRestored={isRestored}
                                clearSession={clearSession}
                            />
                        </div>

                        {/* Right Column: Preview */}
                        <div className="split-col split-preview-col w-full">
                            <AttestationPreview data={formData} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
