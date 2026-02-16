"use client";

import { useEffect, useState } from "react";
import AttestationForm from "./AttestationForm";
import AttestationPreview from "./AttestationPreview";
import AttestationSelector from "./AttestationSelector";
import { useGuestSession } from "@/hooks/useGuestSession";
import { useAuth } from "@/context/AuthContext";
import { ChevronRight, FileText } from "lucide-react";

export default function AttestationGenerator() {
    const { user, userProfile } = useAuth();
    const [isSelectorOpen, setIsSelectorOpen] = useState(true);

    // Default empty state
    const initialValues = {
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
            });
        } else if (user && !userProfile && !isRestored && !formData.nom) {
            // Fallback to basic auth data if profile not fully loaded yet or empty
            const names = user.displayName?.split(' ') || [];
            const prenom = names[0] || "";
            const nom = names.slice(1).join(' ') || "";

            setFormData({
                ...formData,
                email: user.email || "",
                prenom: prenom,
                nom: nom,
                representativeName: user.displayName || ""
            });
        }
    }, [user, userProfile, isRestored]); // Run when user/profile loads or restoration status is known

    const handleFormChange = (newData: any) => {
        setFormData(newData);
    };

    const handleSelectType = (type: string) => {
        setFormData({ ...formData, documentType: type });
        setIsSelectorOpen(false); // Close selector and show form

        // Scroll to form if on mobile
        const generatorElement = document.getElementById('generator-content');
        if (generatorElement && window.innerWidth < 768) {
            generatorElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div id="generator" className="container py-20 min-h-[800px]">
            <div className="max-w-4xl mx-auto mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Générateur Automatique</h2>
                        <p className="text-lg text-[var(--muted)] max-w-2xl">Un outil simple, rapide et sécurisé pour créer tous vos documents administratifs.</p>
                    </div>
                    {!isSelectorOpen && (
                        <button
                            onClick={() => setIsSelectorOpen(true)}
                            className="flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:bg-[var(--primary)]/10 px-4 py-2 rounded-lg transition-all"
                        >
                            <FileText size={16} />
                            Changer de document
                        </button>
                    )}
                </div>
            </div>

            <div id="generator-content">
                {isSelectorOpen ? (
                    <div className="space-y-8">
                        <div className="p-1 px-4 border-l-2 border-[var(--primary)] text-sm font-medium uppercase tracking-wider text-[var(--primary)]">
                            Étape 1 : Choisissez le type de document
                        </div>
                        <AttestationSelector
                            onSelect={handleSelectType}
                            currentType={formData.documentType}
                        />
                    </div>
                ) : (
                    <div className="split-screen-container animate-fade-in">
                        {/* Left Column: Form */}
                        <div className="split-col w-full">
                            <div className="mb-8 pl-4 border-l-2 border-[var(--primary)]">
                                <div className="text-sm font-medium uppercase tracking-wider text-[var(--primary)] mb-1">Étape 2 : Remplissez vos infos</div>
                                <h3 className="text-xl font-bold text-white">Vérification des informations</h3>
                                {user && (
                                    <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                                        Profil connecté : {user.displayName || user.email}
                                    </p>
                                )}
                            </div>
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
