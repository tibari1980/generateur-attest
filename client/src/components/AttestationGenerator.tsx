"use client";

import { useEffect } from "react";
import AttestationForm from "./AttestationForm";
import AttestationPreview from "./AttestationPreview";
import { useGuestSession } from "@/hooks/useGuestSession";
import { useAuth } from "@/context/AuthContext";

export default function AttestationGenerator() {
    const { user, userProfile } = useAuth();

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

    return (
        <div id="generator" className="container py-20">
            <div className="split-screen-container">
                {/* Left Column: Form */}
                <div className="split-col w-full">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold mb-2">Créez votre document</h2>
                        <p className="text-[var(--muted)]">Remplissez le formulaire pour voir votre attestation prendre vie.</p>
                        {user && (
                            <p className="text-xs text-emerald-400 mt-2">
                                Connecté en tant que {user.displayName || user.email}
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
        </div>
    );
}
