"use client";

import { useState } from "react";
import { Loader2, CheckCircle, Download, RotateCcw, Cloud } from "lucide-react";
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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                    {/* Document Type */}
                    <div className="full-width form-group">
                        <label htmlFor="documentType">Type d'attestation</label>
                        <select
                            id="documentType"
                            name="documentType"
                            value={formData.documentType}
                            onChange={handleChange}
                            aria-label="Sélectionnez le type de document à générer"
                        >
                            <option value="attestation_travail">Attestation de Travail</option>
                            <option value="attestation_stage">Attestation de Stage</option>
                            <option value="attestation_honneur">Attestation sur l'Honneur</option>
                            <option value="justificatif_domicile">Justificatif de Domicile</option>
                            <option value="certificat_scolarite">Certificat de Scolarité</option>
                            <option value="lettre_recommandation">Lettre de Recommandation</option>
                            <option value="attestation_hebergement">Attestation d'Hébergement</option>
                            <option value="attestation_vie_commune">Attestation de vie commune (Préfecture)</option>
                        </select>
                    </div>

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
                            <label>
                                {(formData.documentType === 'justificatif_domicile' || formData.documentType === 'attestation_hebergement') ? "Nom complet de l'hébergeant" : "Nom complet du Directeur/Signataire"}
                            </label>
                            <input
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
                            <label>
                                {(formData.documentType === 'justificatif_domicile' || formData.documentType === 'attestation_hebergement') ? "Adresse du logement" : "Votre adresse complète"}
                            </label>
                            <input
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
                            <label>{formData.documentType === 'attestation_honneur' ? "Profession" : "Poste / Intitulé"}</label>
                            <input
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
                            <label>Nom de l'établissement</label>
                            <input
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
                            <label>Entreprise</label>
                            <input
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
                                <label>Niveau / Classe</label>
                                <input
                                    type="text"
                                    name="level"
                                    value={formData.level || ''}
                                    onChange={handleChange}
                                    required
                                    placeholder="Master 2 Informatique"
                                />
                            </div>
                            <div className="form-group">
                                <label>Année Scolaire</label>
                                <input
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
                                <label>Poste du Recommandant</label>
                                <input
                                    type="text"
                                    name="recommenderPosition"
                                    value={formData.recommenderPosition || ''}
                                    onChange={handleChange}
                                    required
                                    placeholder="Directeur Technique"
                                />
                            </div>
                            <div className="form-group">
                                <label>Relation avec le candidat</label>
                                <input
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
                        <label>
                            {(formData.documentType === 'justificatif_domicile' || formData.documentType === 'attestation_honneur' || formData.documentType === 'attestation_hebergement' || formData.documentType === 'attestation_vie_commune')
                                ? "Depuis le"
                                : formData.documentType === 'certificat_scolarite'
                                    ? "Fait le"
                                    : "Date de début"}
                        </label>
                        <input
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
                            <label>Date de fin {formData.documentType === 'attestation_travail' && "(optionnel)"}</label>
                            <input
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
