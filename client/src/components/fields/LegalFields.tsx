import { Users, UserPlus, HeartOff, Gavel } from "lucide-react";
import { AttestationFormData } from "../../types/attestation";

interface LegalFieldsProps {
    formData: AttestationFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function LegalFields({ formData, onChange }: LegalFieldsProps) {
    return (
        <>
            {/* Témoignage */}
            {formData.documentType === 'attestation_temoin' && (
                <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                    <div className="form-section-header !mt-0 !mb-4">
                        <Gavel size={16} />
                        <span>Détails du Témoignage</span>
                    </div>
                    <div className="p-3 rounded bg-red-500/10 border border-red-500/20 mb-4 text-xs text-red-300">
                        Attention : Une fausse attestation expose à des sanctions pénales (1 an d'emprisonnement et 15 000 € d'amende).
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="form-group">
                            <label htmlFor="profession">Votre Profession</label>
                            <input id="profession" type="text" name="profession" value={formData.profession || ""} onChange={onChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="witnessLink">Lien avec les parties (ex: Ami, Voisin...)</label>
                            <input id="witnessLink" type="text" name="witnessLink" value={formData.witnessLink || "Aucun"} onChange={onChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="facts">Faits dont vous avez eu connaissance personnellement</label>
                        <textarea id="facts" name="facts" value={formData.facts || ""} onChange={onChange} required rows={5} placeholder="Décrivez les faits..." className="w-full bg-[var(--background)] border border-[var(--border)] rounded px-3 py-2 text-sm" />
                    </div>
                </div>
            )}

            {/* Procuration */}
            {formData.documentType === 'attestation_procuration' && (
                <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                    <div className="form-section-header !mt-0 !mb-4">
                        <UserPlus size={16} />
                        <span>Détails du Mandataire</span>
                    </div>
                    <div className="space-y-3 p-3 border border-white/10 rounded mb-4">
                        <label htmlFor="mandataireNom" className="text-xs uppercase text-[var(--muted)] font-bold">Le Mandataire (Celui qui agit pour vous)</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-group">
                                <label htmlFor="mandatairePrenom">Prénom</label>
                                <input id="mandatairePrenom" type="text" name="mandatairePrenom" value={formData.mandatairePrenom || ""} onChange={onChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="mandataireNom">Nom</label>
                                <input id="mandataireNom" type="text" name="mandataireNom" value={formData.mandataireNom || ""} onChange={onChange} required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="mandataireAdresse">Adresse du mandataire</label>
                            <input id="mandataireAdresse" type="text" name="mandataireAdresse" value={formData.mandataireAdresse || ""} onChange={onChange} required placeholder="Adresse complète..." />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-group">
                            <label htmlFor="mandateObject">Objet du pouvoir (ex: retrait colis, signature...)</label>
                            <input id="mandateObject" type="text" name="mandateObject" value={formData.mandateObject || ""} onChange={onChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mandateDuration">Durée / Validité (ex: valable 1 mois)</label>
                            <input id="mandateDuration" type="text" name="mandateDuration" value={formData.mandateDuration || "Ponctuelle"} onChange={onChange} />
                        </div>
                    </div>
                </div>
            )}

            {/* Séparation */}
            {formData.documentType === 'attestation_separation' && (
                <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                    <div className="form-section-header !mt-0 !mb-4">
                        <HeartOff size={16} />
                        <span>Détails de la Séparation</span>
                    </div>
                    <div className="space-y-3 p-3 border border-white/10 rounded mb-4">
                        <label htmlFor="exPartnerNom" className="text-xs uppercase text-[var(--muted)] font-bold">Ex-Conjoint(e) / Partenaire</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-group">
                                <label htmlFor="exPartnerPrenom">Prénom</label>
                                <input id="exPartnerPrenom" type="text" name="exPartnerPrenom" value={formData.exPartnerPrenom || ""} onChange={onChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exPartnerNom">Nom</label>
                                <input id="exPartnerNom" type="text" name="exPartnerNom" value={formData.exPartnerNom || ""} onChange={onChange} required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exPartnerAdresse">Dernière adresse connue (optionnel)</label>
                            <input id="exPartnerAdresse" type="text" name="exPartnerAdresse" value={formData.exPartnerAdresse || ""} onChange={onChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="separationDate">Date de la séparation de fait</label>
                        <input id="separationDate" type="date" name="separationDate" value={formData.separationDate || ""} onChange={onChange} required style={{ colorScheme: 'dark' }} />
                    </div>
                </div>
            )}
        </>
    );
}
