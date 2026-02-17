import { Gavel, Key, HeartCrack } from "lucide-react";
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
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)] mb-4 flex items-center gap-2">
                        <Gavel size={16} />
                        Témoignage en Justice (Art. 202 CPC)
                    </h3>
                    <div className="p-3 rounded bg-red-500/10 border border-red-500/20 mb-4 text-xs text-red-300">
                        Attention : Une fausse attestation expose à des sanctions pénales (1 an d'emprisonnement et 15 000 € d'amende).
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="profession">Profession</label>
                        <input id="profession" type="text" name="profession" value={formData.profession || ""} onChange={onChange} placeholder="Votre profession..." />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="witnessLink">Lien avec les parties</label>
                        <select id="witnessLink" name="witnessLink" value={formData.witnessLink || "Aucun"} onChange={onChange}>
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
                        <textarea id="facts" name="facts" value={formData.facts || ""} onChange={onChange} rows={5} placeholder="Je certifie avoir été témoin de..." className="w-full bg-[var(--background)] border border-[var(--border)] rounded px-3 py-2 text-sm text-[var(--foreground)]" />
                    </div>
                </div>
            )}

            {/* Procuration */}
            {formData.documentType === 'attestation_procuration' && (
                <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)] mb-4 flex items-center gap-2">
                        <Key size={16} />
                        Procuration
                    </h3>
                    <div className="space-y-3 p-3 border border-white/10 rounded mb-4">
                        <label htmlFor="mandataireNom" className="text-xs uppercase text-[var(--muted)] font-bold">Le Mandataire (Celui qui agit pour vous)</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input id="mandataireNom" type="text" name="mandataireNom" value={formData.mandataireNom || ""} onChange={onChange} placeholder="Nom" />
                            <input id="mandatairePrenom" type="text" name="mandatairePrenom" value={formData.mandatairePrenom || ""} onChange={onChange} placeholder="Prénom" />
                        </div>
                        <input id="mandataireAdresse" type="text" name="mandataireAdresse" value={formData.mandataireAdresse || ""} onChange={onChange} placeholder="Adresse complète du mandataire" />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="mandateObject">Objet de la procuration</label>
                        <input id="mandateObject" type="text" name="mandateObject" value={formData.mandateObject || ""} onChange={onChange} placeholder="Ex: Retirer mon pli recommandé n°..." />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mandateDuration">Durée (Optionnel)</label>
                        <input id="mandateDuration" type="text" name="mandateDuration" value={formData.mandateDuration || ""} onChange={onChange} placeholder="Ex: Jusqu'au 31/12/2026" />
                    </div>
                </div>
            )}

            {/* Séparation */}
            {formData.documentType === 'attestation_separation' && (
                <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)] mb-4 flex items-center gap-2">
                        <HeartCrack size={16} />
                        Déclaration de Séparation
                    </h3>
                    <div className="space-y-3 p-3 border border-white/10 rounded mb-4">
                        <label htmlFor="exPartnerNom" className="text-xs uppercase text-[var(--muted)] font-bold">Ex-Conjoint(e) / Partenaire</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input id="exPartnerNom" type="text" name="exPartnerNom" value={formData.exPartnerNom || ""} onChange={onChange} placeholder="Nom" />
                            <input id="exPartnerPrenom" type="text" name="exPartnerPrenom" value={formData.exPartnerPrenom || ""} onChange={onChange} placeholder="Prénom" />
                        </div>
                        <input id="exPartnerAdresse" type="text" name="exPartnerAdresse" value={formData.exPartnerAdresse || ""} onChange={onChange} placeholder="Nouvelle adresse de l'ex-conjoint (si connue)" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-group">
                            <label htmlFor="separationDate">Date de séparation</label>
                            <input id="separationDate" type="date" name="separationDate" value={formData.separationDate || ""} onChange={onChange} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
