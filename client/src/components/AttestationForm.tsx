"use client";

import { useState } from "react";
import { Loader2, CheckCircle, Download, RotateCcw, Cloud, CreditCard, Calendar, User, ShieldCheck, Heart, Scale, GitCompare, MapPin, FileSignature, Banknote, Laptop, Gavel, Key, HeartCrack, CalendarCheck, Award, ClipboardCheck, Receipt, LogOut } from "lucide-react";
import dynamic from "next/dynamic";
import AttestationPDF from "./AttestationPDF";
import { useRef } from "react";

const PDFDownloadLink = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
        ssr: false,
        loading: () => <button className="btn btn-primary opacity-50 cursor-not-allowed">Chargement du module PDF...</button>,
    }
);

interface AttestationFormProps {
    externalData?: any;
    onDataChange?: (data: any) => void;
    isEmbedded?: boolean;
    // Session props
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

    // Use external data if provided, else use local state
    // Note: In the new architecture, externalData should always be provided by the Generator
    // We keep a local fallback just in case, or we could remove it.
    // For now, let's simplify and rely on externalData being the source of truth if provided.

    // Fallback state if no external data (though not expected in current usage)
    const [localFormData, setLocalFormData] = useState({
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
        dateFin: "",
        signatureDate: "",
    });

    const formData = externalData || localFormData;

    // Reset generated state when form changes
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

        // Generate signature timestamp
        const now = new Date();
        const signatureDate = `${now.toLocaleDateString('fr-FR')} à ${now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;

        // Update form data with signature date
        const updatedData = { ...formData, signatureDate };
        if (onDataChange) {
            onDataChange(updatedData);
        } else {
            setLocalFormData(updatedData);
        }

        // Simulate generation delay for better UX
        setTimeout(() => {
            setIsGenerated(true);
            setLocalLoading(false);
        }, 1500);
    };

    return (
        <div className="form-container">
            {/* Auto-save Status Bar - Only show if session controls are provided */}
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
                    {/* Show clear button if form is not empty/default (simplified check) */}
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
                <div className="form-grid">
                    {/* Document Type hidden but kept for form consistency if needed, 
                        honestly we can just rely on externalData but let's remove the UI part */}

                    {/* Common Fields: Nom / Prénom */}

                    <div className="form-group-row grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Civility */}
                        <div className="form-group">
                            <label htmlFor="civility">Civilité</label>
                            <select
                                id="civility"
                                name="civility"
                                value={formData.civility}
                                onChange={handleChange}
                                aria-label="Sélectionnez votre civilité"
                            >
                                <option value="Monsieur">Monsieur</option>
                                <option value="Madame">Madame</option>
                            </select>
                        </div>

                        {/* Name */}
                        <div className="form-group">
                            <label htmlFor="nom">{(formData.documentType === 'justificatif_domicile' || formData.documentType === 'attestation_hebergement') ? "Nom de l'hébergé" : "Votre Nom"}</label>
                            <input
                                id="nom"
                                type="text"
                                name="nom"
                                value={formData.nom}
                                onChange={handleChange}
                                required
                                aria-required="true"
                                placeholder="Dupont"
                            />
                        </div>

                        {/* Firstname */}
                        <div className="form-group">
                            <label htmlFor="prenom">{(formData.documentType === 'justificatif_domicile' || formData.documentType === 'attestation_hebergement') ? "Prénom de l'hébergé" : "Votre Prénom"}</label>
                            <input
                                id="prenom"
                                type="text"
                                name="prenom"
                                value={formData.prenom}
                                onChange={handleChange}
                                required
                                aria-required="true"
                                placeholder="Jean"
                            />
                        </div>
                    </div>

                    {/* Birth Details */}
                    <div className="form-group-row grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-group">
                            <label htmlFor="dateNaissance">Votre Date de naissance</label>
                            <input
                                id="dateNaissance"
                                type="date"
                                name="dateNaissance"
                                value={formData.dateNaissance}
                                onChange={handleChange}
                                style={{ colorScheme: 'dark' }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lieuNaissance">Votre Lieu de naissance</label>
                            <input
                                id="lieuNaissance"
                                type="text"
                                name="lieuNaissance"
                                value={formData.lieuNaissance}
                                onChange={handleChange}
                                placeholder="Paris 15"
                            />
                        </div>
                    </div>

                    {/* === PREVUS POUR PREFECTURE === */}
                    {formData.documentType === 'attestation_financiere' && (
                        <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)] mb-4 flex items-center gap-2">
                                <CreditCard size={16} />
                                Engagement Financier
                            </h3>

                            <div className="p-3 rounded bg-emerald-500/10 border border-emerald-500/20 mb-4 text-xs text-emerald-300">
                                Vous vous engagez à prendre en charge les frais de vie du bénéficiaire.
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="form-group">
                                    <label htmlFor="amount">Montant mensuel (Optionnel)</label>
                                    <input
                                        id="amount"
                                        type="number"
                                        name="amount"
                                        value={formData.amount || ""}
                                        onChange={handleChange}
                                        placeholder="Ex: 615"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="duration">Durée de prise en charge</label>
                                    <input
                                        id="duration"
                                        type="text"
                                        name="duration"
                                        value={formData.duration || ""}
                                        onChange={handleChange}
                                        placeholder="Ex: 12 mois, durée des études..."
                                    />
                                </div>
                            </div>

                            <h4 className="text-xs font-medium text-[var(--muted)] uppercase mb-3">Bénéficiaire</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-group">
                                    <label htmlFor="beneficiaryName">Nom du bénéficiaire</label>
                                    <input
                                        id="beneficiaryName"
                                        type="text"
                                        name="beneficiaryName"
                                        value={formData.beneficiaryName || ""}
                                        onChange={handleChange}
                                        required
                                        placeholder="Nom"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="beneficiaryFirstName">Prénom du bénéficiaire</label>
                                    <input
                                        id="beneficiaryFirstName"
                                        type="text"
                                        name="beneficiaryFirstName"
                                        value={formData.beneficiaryFirstName || ""}
                                        onChange={handleChange}
                                        required
                                        placeholder="Prénom"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {formData.documentType === 'attestation_non_polygamie' && (
                        <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)] mb-4 flex items-center gap-2">
                                <User size={16} />
                                Informations Matrimoniales
                            </h3>

                            <div className="p-3 rounded bg-indigo-500/10 border border-indigo-500/20 mb-4 text-xs text-indigo-300">
                                Certifie sur l'honneur ne pas vivre en état de polygamie en France.
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-group">
                                    <label htmlFor="maritalStatus">Situation Matrimoniale</label>
                                    <select
                                        id="maritalStatus"
                                        name="maritalStatus"
                                        value={formData.maritalStatus || "celibataire"}
                                        onChange={handleChange}
                                    >
                                        <option value="celibataire">Célibataire</option>
                                        <option value="marie">Marié(e)</option>
                                        <option value="divorce">Divorcé(e)</option>
                                        <option value="veuf">Veuf / Veuve</option>
                                    </select>
                                </div>
                                {formData.maritalStatus === 'marie' && (
                                    <div className="form-group">
                                        <label htmlFor="marriageDate">Date de mariage</label>
                                        <input
                                            id="marriageDate"
                                            type="date"
                                            name="marriageDate"
                                            value={formData.marriageDate || ""}
                                            onChange={handleChange}
                                            style={{ colorScheme: 'dark' }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* === NOUVEAUX : TRAVAIL === */}
                    {formData.documentType === 'attestation_promesse_embauche' && (
                        <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)] mb-4 flex items-center gap-2">
                                <FileSignature size={16} />
                                Détails de la Promesse
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="form-group">
                                    <label htmlFor="contractType">Type de Contrat</label>
                                    <select id="contractType" name="contractType" value={formData.contractType || "CDI"} onChange={handleChange}>
                                        <option value="CDI">CDI</option>
                                        <option value="CDD">CDD</option>
                                        <option value="Stage">Stage</option>
                                        <option value="Alternance">Alternance</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="trialPeriod">Période d'essai (ex: 2 mois)</label>
                                    <input id="trialPeriod" type="text" name="trialPeriod" value={formData.trialPeriod || ""} onChange={handleChange} placeholder="Durée..." />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="form-group md:col-span-1">
                                    <label htmlFor="salaryAmount">Rémunération</label>
                                    <input id="salaryAmount" type="number" name="salaryAmount" value={formData.salaryAmount || ""} onChange={handleChange} placeholder="Montant" />
                                </div>
                                <div className="form-group md:col-span-1">
                                    <label htmlFor="salaryType">Type</label>
                                    <select id="salaryType" name="salaryType" value={formData.salaryType || "Brut"} onChange={handleChange}>
                                        <option value="Brut">Brut</option>
                                        <option value="Net">Net</option>
                                    </select>
                                </div>
                                <div className="form-group md:col-span-1">
                                    <label htmlFor="salaryFrequency">Fréquence</label>
                                    <select id="salaryFrequency" name="salaryFrequency" value={formData.salaryFrequency || "Mensuel"} onChange={handleChange}>
                                        <option value="Mensuel">Mensuel</option>
                                        <option value="Annuel">Annuel</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {formData.documentType === 'attestation_salaire' && (
                        <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)] mb-4 flex items-center gap-2">
                                <Banknote size={16} />
                                Détails de Rémunération
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="form-group">
                                    <label htmlFor="salaryGross">Salaire Brut Mensuel</label>
                                    <input id="salaryGross" type="number" name="salaryGross" value={formData.salaryGross || ""} onChange={handleChange} placeholder="Ex: 2500" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="salaryNet">Salaire Net Mensuel</label>
                                    <input id="salaryNet" type="number" name="salaryNet" value={formData.salaryNet || ""} onChange={handleChange} placeholder="Ex: 1950" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="bonuses">Primes / Avantages (Optionnel)</label>
                                <input id="bonuses" type="text" name="bonuses" value={formData.bonuses || ""} onChange={handleChange} placeholder="Ex: 13ème mois, tickets restaurant..." />
                            </div>
                        </div>
                    )}

                    {formData.documentType === 'attestation_teletravail' && (
                        <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)] mb-4 flex items-center gap-2">
                                <Laptop size={16} />
                                Modalités de Télétravail
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="form-group">
                                    <label htmlFor="remoteDays">Jours / semaine</label>
                                    <input id="remoteDays" type="number" name="remoteDays" value={formData.remoteDays || ""} onChange={handleChange} placeholder="Ex: 2" />
                                </div>
                                <div className="form-group md:col-span-2">
                                    <label htmlFor="remoteFixedDays">Jours fixes (ex: Lundi, Jeudi)</label>
                                    <input id="remoteFixedDays" type="text" name="remoteFixedDays" value={formData.remoteFixedDays || ""} onChange={handleChange} placeholder="Jours concernés..." />
                                </div>
                            </div>
                            <div className="form-group mt-4">
                                <label htmlFor="remoteLocation">Lieu autorisé</label>
                                <input id="remoteLocation" type="text" name="remoteLocation" value={formData.remoteLocation || "Domicile du salarié"} onChange={handleChange} />
                            </div>
                        </div>
                    )}

                    {formData.documentType === 'attestation_residence' && (
                        <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)] mb-4 flex items-center gap-2">
                                <MapPin size={16} />
                                Résidence
                            </h3>
                            <div className="p-3 rounded bg-blue-500/10 border border-blue-500/20 mb-4 text-xs text-blue-300">
                                Certifie que vous résidez à l'adresse indiquée ci-dessus depuis la date spécifiée.
                            </div>
                        </div>
                    )}

                    {/* === NOUVEAUX : VIE PERSONNELLE === */}
                    {formData.documentType === 'attestation_temoin' && (
                        <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)] mb-4 flex items-center gap-2">
                                <Gavel size={16} />
                                Témoignage en Justice (Art. 202 CPC)
                            </h3>
                            <div className="p-3 rounded bg-red-500/10 border border-red-500/20 mb-4 text-xs text-red-300">
                                Attention : Une fausse attestation expose à des sanctions pénales (1 an d'emprisonnement et 15 000 € d'amende).
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="profession">Profession</label>
                                <input id="profession" type="text" name="profession" value={formData.profession || ""} onChange={handleChange} placeholder="Votre profession..." />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="witnessLink">Lien avec les parties</label>
                                <select id="witnessLink" name="witnessLink" value={formData.witnessLink || "Aucun"} onChange={handleChange}>
                                    <option value="Aucun">Aucun</option>
                                    <option value="Parenté">Parenté</option>
                                    <option value="Alliance">Alliance</option>
                                    <option value="Subordination">Subordination (Salarié/Employeur)</option>
                                    <option value="Collaboration">Collaboration</option>
                                    <option value="Communauté d'intérêts">Communauté d'intérêts</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="facts">Faits constatés (Soyez précis et factuel)</label>
                                <textarea id="facts" name="facts" value={formData.facts || ""} onChange={handleChange} rows={5} placeholder="Je certifie avoir été témoin de..." className="w-full bg-[var(--background)] border border-[var(--border)] rounded px-3 py-2 text-sm text-[var(--foreground)]" />
                            </div>
                        </div>
                    )}

                    {formData.documentType === 'attestation_procuration' && (
                        <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)] mb-4 flex items-center gap-2">
                                <Key size={16} />
                                Procuration
                            </h3>
                            <div className="space-y-3 p-3 border border-white/10 rounded mb-4">
                                <label htmlFor="mandataireNom" className="text-xs uppercase text-[var(--muted)] font-bold">Le Mandataire (Celui qui agit pour vous)</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input id="mandataireNom" type="text" name="mandataireNom" value={formData.mandataireNom || ""} onChange={handleChange} placeholder="Nom" />
                                    <input id="mandatairePrenom" type="text" name="mandatairePrenom" value={formData.mandatairePrenom || ""} onChange={handleChange} placeholder="Prénom" />
                                </div>
                                <input id="mandataireAdresse" type="text" name="mandataireAdresse" value={formData.mandataireAdresse || ""} onChange={handleChange} placeholder="Adresse complète du mandataire" />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="mandateObject">Objet de la procuration</label>
                                <input id="mandateObject" type="text" name="mandateObject" value={formData.mandateObject || ""} onChange={handleChange} placeholder="Ex: Retirer mon pli recommandé n°..." />
                            </div>
                            <div className="form-group">
                                <label htmlFor="mandateDuration">Durée (Optionnel)</label>
                                <input id="mandateDuration" type="text" name="mandateDuration" value={formData.mandateDuration || ""} onChange={handleChange} placeholder="Ex: Jusqu'au 31/12/2026" />
                            </div>
                        </div>
                    )}

                    {formData.documentType === 'attestation_separation' && (
                        <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)] mb-4 flex items-center gap-2">
                                <HeartCrack size={16} />
                                Déclaration de Séparation
                            </h3>
                            <div className="space-y-3 p-3 border border-white/10 rounded mb-4">
                                <label htmlFor="exPartnerNom" className="text-xs uppercase text-[var(--muted)] font-bold">Ex-Conjoint(e) / Partenaire</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input id="exPartnerNom" type="text" name="exPartnerNom" value={formData.exPartnerNom || ""} onChange={handleChange} placeholder="Nom" />
                                    <input id="exPartnerPrenom" type="text" name="exPartnerPrenom" value={formData.exPartnerPrenom || ""} onChange={handleChange} placeholder="Prénom" />
                                </div>
                                <input id="exPartnerAdresse" type="text" name="exPartnerAdresse" value={formData.exPartnerAdresse || ""} onChange={handleChange} placeholder="Nouvelle adresse de l'ex-conjoint (si connue)" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-group">
                                    <label htmlFor="separationDate">Date de séparation</label>
                                    <input id="separationDate" type="date" name="separationDate" value={formData.separationDate || ""} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    )}

                    {formData.documentType === 'attestation_respect_principes' && (
                        <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)] mb-4 flex items-center gap-2">
                                <Scale size={16} />
                                Engagement Républicain
                            </h3>
                            <div className="p-3 rounded bg-orange-500/10 border border-orange-500/20 mb-4 text-xs text-orange-300">
                                En générant ce document, vous vous engagez solennellement à respecter les 7 piliers de la République Française.
                            </div>
                        </div>
                    )}

                    {formData.documentType === 'attestation_concordance' && (
                        <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)] mb-4 flex items-center gap-2">
                                <GitCompare size={16} />
                                Concordance d'Identité
                            </h3>

                            <div className="p-3 rounded bg-purple-500/10 border border-purple-500/20 mb-4 text-xs text-purple-300">
                                Indiquez les informations telles qu'elles apparaissent sur chaque document divergent.
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Document 1 */}
                                <div className="space-y-3 p-3 border border-white/10 rounded">
                                    <label htmlFor="doc1Type" className="text-xs uppercase text-[var(--muted)] font-bold">Document 1 (Source)</label>
                                    <select id="doc1Type" name="doc1Type" value={formData.doc1Type || ""} onChange={handleChange} className="w-full">
                                        <option value="">Type de document...</option>
                                        <option value="Acte de naissance">Acte de naissance</option>
                                        <option value="Passeport">Passeport</option>
                                        <option value="Carte d'identité">Carte d'identité</option>
                                        <option value="Titre de séjour">Titre de séjour</option>
                                    </select>
                                    <input id="doc1Name" type="text" name="doc1Name" value={formData.doc1Name || ""} onChange={handleChange} placeholder="Nom exact sur ce document" />
                                    <input id="doc1Firstname" type="text" name="doc1Firstname" value={formData.doc1Firstname || ""} onChange={handleChange} placeholder="Prénom exact sur ce document" />
                                </div>

                                {/* Document 2 */}
                                <div className="space-y-3 p-3 border border-white/10 rounded">
                                    <label htmlFor="doc2Type" className="text-xs uppercase text-[var(--muted)] font-bold">Document 2 (Divergent)</label>
                                    <select id="doc2Type" name="doc2Type" value={formData.doc2Type || ""} onChange={handleChange} className="w-full">
                                        <option value="">Type de document...</option>
                                        <option value="Acte de naissance">Acte de naissance</option>
                                        <option value="Passeport">Passeport</option>
                                        <option value="Carte d'identité">Carte d'identité</option>
                                        <option value="Titre de séjour">Titre de séjour</option>
                                    </select>
                                    <input id="doc2Name" type="text" name="doc2Name" value={formData.doc2Name || ""} onChange={handleChange} placeholder="Nom exact sur ce document" />
                                    <input id="doc2Firstname" type="text" name="doc2Firstname" value={formData.doc2Firstname || ""} onChange={handleChange} placeholder="Prénom exact sur ce document" />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label htmlFor="discordanceType">Nature de la différence</label>
                                <select id="discordanceType" name="discordanceType" value={formData.discordanceType || ""} onChange={handleChange}>
                                    <option value="">Choisir la cause...</option>
                                    <option value="Erreur orthographique">Erreur orthographique</option>
                                    <option value="Omission d'un prénom">Omission d'un prénom</option>
                                    <option value="Nom d'usage vs Nom de naissance">Nom d'usage vs Nom de naissance</option>
                                    <option value="Erreur de transcription">Erreur de transcription</option>
                                    <option value="Autre">Autre</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Partner Details - ONLY for Vie Commune */}
                    {formData.documentType === 'attestation_vie_commune' && (
                        <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)] mb-4">Conjoint(e) / Partenaire</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-group">
                                    <label htmlFor="partnerName">Nom</label>
                                    <input
                                        id="partnerName"
                                        type="text"
                                        name="partnerName"
                                        value={formData.partnerName || ''}
                                        onChange={handleChange}
                                        required
                                        placeholder="Martin"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="partnerFirstname">Prénom</label>
                                    <input
                                        id="partnerFirstname"
                                        type="text"
                                        name="partnerFirstname"
                                        value={formData.partnerFirstname || ''}
                                        onChange={handleChange}
                                        required
                                        placeholder="Sophie"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="partnerDob">Date de naissance</label>
                                    <input
                                        id="partnerDob"
                                        type="date"
                                        name="partnerDob"
                                        value={formData.partnerDob || ''}
                                        onChange={handleChange}
                                        required
                                        style={{ colorScheme: 'dark' }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="partnerPob">Lieu de naissance</label>
                                    <input
                                        id="partnerPob"
                                        type="text"
                                        name="partnerPob"
                                        value={formData.partnerPob || ''}
                                        onChange={handleChange}
                                        required
                                        placeholder="Lyon"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="partnerNationality">Nationalité</label>
                                    <input
                                        id="partnerNationality"
                                        type="text"
                                        name="partnerNationality"
                                        value={formData.partnerNationality || ''}
                                        onChange={handleChange}
                                        required
                                        placeholder="Française"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Common Fields: Nationalité & Ville (for Vie Commune mainly, but good generally) */}
                    {formData.documentType === 'attestation_vie_commune' && (
                        <div className="form-group-row grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="form-group">
                                <label htmlFor="nationality">Votre Nationalité</label>
                                <input
                                    id="nationality"
                                    type="text"
                                    name="nationality"
                                    value={formData.nationality || ''}
                                    onChange={handleChange}
                                    placeholder="Française"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">Fait à (Ville)</label>
                                <input
                                    id="city"
                                    type="text"
                                    name="city"
                                    value={formData.city || ''}
                                    onChange={handleChange}
                                    placeholder="Paris"
                                />
                            </div>
                        </div>
                    )}

                    {/* Relationship Type - Only for Vie Commune */}
                    {formData.documentType === 'attestation_vie_commune' && (
                        <div className="form-group mb-4">
                            <label htmlFor="relationshipType">Statut</label>
                            <select
                                id="relationshipType"
                                name="relationshipType"
                                value={formData.relationshipType || 'concubins'}
                                onChange={handleChange}
                            >
                                <option value="concubins">Concubins (Union libre)</option>
                                <option value="mariés">Mariés</option>
                                <option value="pacsés">Pacsés</option>
                            </select>
                        </div>
                    )}

                    {/* Dynamic Fields */}

                    {/* Representative Name (Director or Host) - Hidden for Honor & Vie Commune */}
                    {(formData.documentType !== 'attestation_honneur' && formData.documentType !== 'attestation_vie_commune') && (
                        <div className="full-width form-group">
                            <label htmlFor="representativeName">
                                {(formData.documentType === 'justificatif_domicile' || formData.documentType === 'attestation_hebergement') ? "Nom complet de l'hébergeant" : "Nom complet du Directeur/Signataire"}
                            </label>
                            <input
                                id="representativeName"
                                type="text"
                                name="representativeName"
                                value={formData.representativeName || ''}
                                onChange={handleChange}
                                required
                                placeholder={formData.documentType === 'justificatif_domicile' ? "Martin Matin" : "Directeur Général"}
                            />
                        </div>
                    )}

                    <div className="full-width form-group">
                        <label htmlFor="email">Email (optionnel)</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="jean.dupont@email.com"
                        />
                    </div>

                    {/* Address - Only for Domicile, Honor, Hebergement, Vie Commune */}
                    {(formData.documentType === 'justificatif_domicile' || formData.documentType === 'attestation_honneur' || formData.documentType === 'attestation_hebergement' || formData.documentType === 'attestation_vie_commune') && (
                        <div className="full-width form-group">
                            <label htmlFor="address">
                                {(formData.documentType === 'justificatif_domicile' || formData.documentType === 'attestation_hebergement') ? "Adresse du logement" : "Votre adresse complète"}
                            </label>
                            <input
                                id="address"
                                type="text"
                                name="address"
                                value={formData.address || ''}
                                onChange={handleChange}
                                required
                                placeholder="10 Rue de la Paix, 75000 Paris"
                            />
                        </div>
                    )}

                    {/* Poste / Profession - Hidden for Domicile, Hebergement, Vie Commune */}
                    {(formData.documentType !== 'justificatif_domicile' && formData.documentType !== 'attestation_hebergement' && formData.documentType !== 'attestation_vie_commune') && (
                        <div className="form-group">
                            <label htmlFor="poste">{formData.documentType === 'attestation_honneur' ? "Profession" : "Poste / Intitulé"}</label>
                            <input
                                id="poste"
                                type="text"
                                name="poste"
                                value={formData.poste}
                                onChange={handleChange}
                                required
                                placeholder={formData.documentType === 'attestation_honneur' ? "Indépendant" : "Développeur Web"}
                            />
                        </div>
                    )}

                    {/* Establishment - School Cert Only */}
                    {formData.documentType === 'certificat_scolarite' && (
                        <div className="full-width form-group">
                            <label htmlFor="establishment">Nom de l'établissement</label>
                            <input
                                id="establishment"
                                type="text"
                                name="establishment"
                                value={formData.establishment || ''}
                                onChange={handleChange}
                                required
                                placeholder="Université de Paris"
                            />
                        </div>
                    )}

                    {/* Entreprise - Hidden for Domicile/School/Hebergement/Vie Commune */}
                    {(formData.documentType !== 'justificatif_domicile' && formData.documentType !== 'certificat_scolarite' && formData.documentType !== 'attestation_hebergement' && formData.documentType !== 'attestation_vie_commune') && (
                        <div className="form-group">
                            <label htmlFor="entreprise">Entreprise</label>
                            <input
                                id="entreprise"
                                type="text"
                                name="entreprise"
                                value={formData.entreprise}
                                onChange={handleChange}
                                required
                                placeholder="TechCorp"
                            />
                        </div>
                    )}

                    {/* School Specifics */}
                    {formData.documentType === 'certificat_scolarite' && (
                        <>
                            <div className="form-group">
                                <label htmlFor="level">Niveau / Classe</label>
                                <input
                                    id="level"
                                    type="text"
                                    name="level"
                                    value={formData.level || ''}
                                    onChange={handleChange}
                                    required
                                    placeholder="Master 2 Informatique"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="academicYear">Année Scolaire</label>
                                <input
                                    id="academicYear"
                                    type="text"
                                    name="academicYear"
                                    value={formData.academicYear || ''}
                                    onChange={handleChange}
                                    required
                                    placeholder="2023 - 2024"
                                />
                            </div>
                        </>
                    )}

                    {/* Recommendation Specifics */}
                    {formData.documentType === 'lettre_recommandation' && (
                        <>
                            <div className="form-group">
                                <label htmlFor="recommenderPosition">Poste du Recommandant</label>
                                <input
                                    id="recommenderPosition"
                                    type="text"
                                    name="recommenderPosition"
                                    value={formData.recommenderPosition || ''}
                                    onChange={handleChange}
                                    required
                                    placeholder="Directeur Technique"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="relation">Relation avec le candidat</label>
                                <input
                                    id="relation"
                                    type="text"
                                    name="relation"
                                    value={formData.relation || ''}
                                    onChange={handleChange}
                                    required
                                    placeholder="Maître de stage"
                                />
                            </div>
                        </>
                    )}

                    {/* === NOUVEAUX : ÉTUDES === */}
                    {formData.documentType === 'attestation_assiduite' && (
                        <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)] mb-4 flex items-center gap-2">
                                <CalendarCheck size={16} />
                                Détails de la Formation
                            </h3>
                            <div className="form-group mb-4">
                                <label htmlFor="trainingTitle">Intitulé de la formation</label>
                                <input id="trainingTitle" type="text" name="trainingTitle" value={formData.trainingTitle || ""} onChange={handleChange} placeholder="Ex: Formation Développeur Web" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="form-group">
                                    <label htmlFor="dateDebut">Date de début</label>
                                    <input id="dateDebut" type="date" name="dateDebut" value={formData.dateDebut || ""} onChange={handleChange} style={{ colorScheme: 'dark' }} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dateFin">Date de fin</label>
                                    <input id="dateFin" type="date" name="dateFin" value={formData.dateFin || ""} onChange={handleChange} style={{ colorScheme: 'dark' }} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-group">
                                    <label htmlFor="trainingHours">Volume Horaire Total</label>
                                    <input id="trainingHours" type="text" name="trainingHours" value={formData.trainingHours || ""} onChange={handleChange} placeholder="ex: 150 heures" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="assiduityRate">Assiduité (heures ou %)</label>
                                    <input id="assiduityRate" type="text" name="assiduityRate" value={formData.assiduityRate || "100%"} onChange={handleChange} placeholder="ex: 100%" />
                                </div>
                            </div>
                        </div>
                    )}

                    {formData.documentType === 'attestation_reussite' && (
                        <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)] mb-4 flex items-center gap-2">
                                <Award size={16} />
                                Détails du Diplôme
                            </h3>
                            <div className="form-group mb-4">
                                <label htmlFor="diplomaTitle">Intitulé du Diplôme</label>
                                <input id="diplomaTitle" type="text" name="diplomaTitle" value={formData.diplomaTitle || ""} onChange={handleChange} placeholder="Ex: Master Droit des Affaires" />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="diplomaSpeciality">Spécialité / Option</label>
                                <input id="diplomaSpeciality" type="text" name="diplomaSpeciality" value={formData.diplomaSpeciality || ""} onChange={handleChange} placeholder="Ex: Juriste d'entreprise" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-group">
                                    <label htmlFor="diplomaSession">Session / Année</label>
                                    <input id="diplomaSession" type="text" name="diplomaSession" value={formData.diplomaSession || "2024"} onChange={handleChange} placeholder="ex: 2024" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="diplomaMention">Mention</label>
                                    <select id="diplomaMention" name="diplomaMention" value={formData.diplomaMention || ""} onChange={handleChange}>
                                        <option value="">Aucune</option>
                                        <option value="Passable">Passable</option>
                                        <option value="Assez Bien">Assez Bien</option>
                                        <option value="Bien">Bien</option>
                                        <option value="Très Bien">Très Bien</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {formData.documentType === 'attestation_examen' && (
                        <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)] mb-4 flex items-center gap-2">
                                <ClipboardCheck size={16} />
                                Liste des Épreuves
                            </h3>
                            <div className="p-3 rounded bg-blue-500/10 border border-blue-500/20 mb-4 text-xs text-blue-300">
                                Listez les examens (Date, Heure, Matière) pour justifier votre présence.
                            </div>
                            <div className="form-group">
                                <label htmlFor="examList">Détail des épreuves</label>
                                <textarea id="examList" name="examList" value={formData.examList || ""} onChange={handleChange} rows={5} placeholder="- Mathématiques : 12/06 de 09h à 12h&#10;- Anglais : 13/06 de 14h à 16h..." className="w-full bg-[var(--background)] border border-[var(--border)] rounded px-3 py-2 text-sm text-[var(--foreground)]" />
                            </div>
                        </div>
                    )}

                    {/* === NOUVEAUX : DOMICILE === */}
                    {formData.documentType === 'quittance_loyer' && (
                        <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)] mb-4 flex items-center gap-2">
                                <Receipt size={16} />
                                Détails du Paiement
                            </h3>
                            <div className="form-group mb-4">
                                <label htmlFor="rentPeriod">Période concernée (Mois / Année)</label>
                                <input id="rentPeriod" type="text" name="rentPeriod" value={formData.rentPeriod || ""} onChange={handleChange} placeholder="Ex: Mars 2024" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="form-group">
                                    <label htmlFor="rentAmount">Montant Loyer (Hors Charges)</label>
                                    <input id="rentAmount" type="number" name="rentAmount" value={formData.rentAmount || ""} onChange={handleChange} placeholder="Ex: 500" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="chargesAmount">Montant Provisions sur Charges</label>
                                    <input id="chargesAmount" type="number" name="chargesAmount" value={formData.chargesAmount || ""} onChange={handleChange} placeholder="Ex: 50" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="paymentDate">Date du paiement</label>
                                <input id="paymentDate" type="date" name="paymentDate" value={formData.paymentDate || ""} onChange={handleChange} style={{ colorScheme: 'dark' }} />
                            </div>
                        </div>
                    )}

                    {formData.documentType === 'attestation_loyer_ajour' && (
                        <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)] mb-4 flex items-center gap-2">
                                <ShieldCheck size={16} />
                                Situation Locative
                            </h3>
                            <div className="form-group mb-4">
                                <label htmlFor="entryDate">Date d'entrée dans les lieux</label>
                                <input id="entryDate" type="date" name="entryDate" value={formData.entryDate || ""} onChange={handleChange} style={{ colorScheme: 'dark' }} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="currentRentAmount">Montant du loyer actuel (CC)</label>
                                <input id="currentRentAmount" type="number" name="currentRentAmount" value={formData.currentRentAmount || ""} onChange={handleChange} placeholder="Montant total mensuel..." />
                            </div>
                        </div>
                    )}

                    {formData.documentType === 'attestation_fin_bail' && (
                        <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)] mb-4 flex items-center gap-2">
                                <LogOut size={16} />
                                Fin de Location
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="form-group">
                                    <label htmlFor="departureDate">Date de départ / État des lieux</label>
                                    <input id="departureDate" type="date" name="departureDate" value={formData.departureDate || ""} onChange={handleChange} style={{ colorScheme: 'dark' }} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="paymentStatus">Solde de tout compte (Optionnel)</label>
                                    <input id="paymentStatus" type="text" name="paymentStatus" value={formData.paymentStatus || "Soldé"} onChange={handleChange} placeholder="Ex: Tout compte soldé" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="newAddress">Nouvelle adresse du locataire (Si connue)</label>
                                <input id="newAddress" type="text" name="newAddress" value={formData.newAddress || ""} onChange={handleChange} placeholder="Adresse de destination..." />
                            </div>
                        </div>
                    )}

                    {/* Hebergement Specifics */}
                    {formData.documentType === 'attestation_hebergement' && (
                        <>
                            {/* Host Details */}
                            <div className="form-group">
                                <label htmlFor="hostDob">Date de naissance (Hébergeant)</label>
                                <input
                                    id="hostDob"
                                    type="date"
                                    name="hostDob"
                                    value={formData.hostDob || ''}
                                    onChange={handleChange}
                                    required
                                    aria-required="true"
                                    style={{ colorScheme: 'dark' }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="hostPob">Lieu de naissance (Hébergeant)</label>
                                <input
                                    id="hostPob"
                                    type="text"
                                    name="hostPob"
                                    value={formData.hostPob || ''}
                                    onChange={handleChange}
                                    required
                                    aria-required="true"
                                    placeholder="Paris 15"
                                />
                            </div>

                            {/* Hosted Details */}
                            <div className="form-group">
                                <label htmlFor="hostedDob">Date de naissance (Hébergé)</label>
                                <input
                                    id="hostedDob"
                                    type="date"
                                    name="hostedDob"
                                    value={formData.hostedDob || ''}
                                    onChange={handleChange}
                                    required
                                    aria-required="true"
                                    style={{ colorScheme: 'dark' }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="hostedPob">Lieu de naissance (Hébergé)</label>
                                <input
                                    id="hostedPob"
                                    type="text"
                                    name="hostedPob"
                                    value={formData.hostedPob || ''}
                                    onChange={handleChange}
                                    required
                                    aria-required="true"
                                    placeholder="Lyon 2"
                                />
                            </div>
                        </>
                    )}

                    <div className="form-group">
                        <label htmlFor="dynamicDate">
                            {(formData.documentType === 'justificatif_domicile' || formData.documentType === 'attestation_honneur' || formData.documentType === 'attestation_hebergement' || formData.documentType === 'attestation_vie_commune')
                                ? "Depuis le"
                                : formData.documentType === 'certificat_scolarite'
                                    ? "Fait le"
                                    : "Date de début"}
                        </label>
                        <input
                            id="dynamicDate"
                            type="date"
                            name="dateDebut"
                            value={formData.dateDebut}
                            onChange={handleChange}
                            required
                            style={{ colorScheme: 'dark' }}
                        />
                    </div>

                    {/* Date Fin - Only for Travail/Stage/Recommendation */}
                    {(formData.documentType === 'attestation_travail' || formData.documentType === 'attestation_stage' || formData.documentType === 'lettre_recommandation') && (
                        <div className="form-group">
                            <label htmlFor="dateFin">Date de fin {formData.documentType === 'attestation_travail' && "(optionnel)"}</label>
                            <input
                                id="dateFin"
                                type="date"
                                name="dateFin"
                                value={formData.dateFin}
                                onChange={handleChange}
                                required={formData.documentType === 'attestation_stage'}
                                style={{ colorScheme: 'dark' }}
                            />
                        </div>
                    )}
                </div>

                <div className="mt-8" aria-live="polite" aria-atomic="true">
                    {!isGenerated ? (
                        <button
                            type="submit"
                            disabled={localLoading}
                            className={`w-full btn btn-primary py-3 text-lg ${localLoading ? 'opacity-70 cursor-wait' : ''}`}
                            aria-disabled={localLoading}
                        >
                            {localLoading ? (
                                <>
                                    <Loader2 className="animate-spin mr-2" aria-hidden="true" />
                                    Génération en cours...
                                </>
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
                                className="w-full btn btn-primary py-3 text-lg flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 border-none"
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
