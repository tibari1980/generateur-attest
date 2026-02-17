import { FileSignature, Banknote, Laptop } from "lucide-react";
import { AttestationFormData } from "../../types/attestation";

interface WorkFieldsProps {
    formData: AttestationFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function WorkFields({ formData, onChange }: WorkFieldsProps) {
    return (
        <>
            {/* Promesse d'Embauche */}
            {formData.documentType === 'attestation_promesse_embauche' && (
                <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                    <div className="form-section-header !mt-0 !mb-4">
                        <FileSignature size={16} />
                        <span>Détails de la Promesse</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="form-group">
                            <label htmlFor="contractType">Type de Contrat</label>
                            <select id="contractType" name="contractType" value={formData.contractType || "CDI"} onChange={onChange}>
                                <option value="CDI">CDI</option>
                                <option value="CDD">CDD</option>
                                <option value="Stage">Stage</option>
                                <option value="Alternance">Alternance</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="trialPeriod">Période d'essai (ex: 2 mois)</label>
                            <input id="trialPeriod" type="text" name="trialPeriod" value={formData.trialPeriod || ""} onChange={onChange} placeholder="Durée..." />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="form-group md:col-span-1">
                            <label htmlFor="salaryAmount">Rémunération</label>
                            <input id="salaryAmount" type="number" name="salaryAmount" value={formData.salaryAmount || ""} onChange={onChange} placeholder="Montant" />
                        </div>
                        <div className="form-group md:col-span-1">
                            <label htmlFor="salaryType">Type</label>
                            <select id="salaryType" name="salaryType" value={formData.salaryType || "Brut"} onChange={onChange}>
                                <option value="Brut">Brut</option>
                                <option value="Net">Net</option>
                            </select>
                        </div>
                        <div className="form-group md:col-span-1">
                            <label htmlFor="salaryFrequency">Fréquence</label>
                            <select id="salaryFrequency" name="salaryFrequency" value={formData.salaryFrequency || "Mensuel"} onChange={onChange}>
                                <option value="Mensuel">Mensuel</option>
                                <option value="Annuel">Annuel</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Attestation Salaire */}
            {formData.documentType === 'attestation_salaire' && (
                <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                    <div className="form-section-header !mt-0 !mb-4">
                        <Banknote size={16} />
                        <span>Détails de Rémunération</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="form-group">
                            <label htmlFor="salaryGross">Salaire Brut Mensuel</label>
                            <input id="salaryGross" type="number" name="salaryGross" value={formData.salaryGross || ""} onChange={onChange} placeholder="Ex: 2500" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="salaryNet">Salaire Net Mensuel</label>
                            <input id="salaryNet" type="number" name="salaryNet" value={formData.salaryNet || ""} onChange={onChange} placeholder="Ex: 1950" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="bonuses">Primes / Avantages (Optionnel)</label>
                        <input id="bonuses" type="text" name="bonuses" value={formData.bonuses || ""} onChange={onChange} placeholder="Ex: 13ème mois, tickets restaurant..." />
                    </div>
                </div>
            )}

            {/* Télétravail */}
            {formData.documentType === 'attestation_teletravail' && (
                <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                    <div className="form-section-header !mt-0 !mb-4">
                        <Laptop size={16} />
                        <span>Modalités de Télétravail</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="form-group">
                            <label htmlFor="remoteDays">Jours / semaine</label>
                            <input id="remoteDays" type="number" name="remoteDays" value={formData.remoteDays || ""} onChange={onChange} placeholder="Ex: 2" />
                        </div>
                        <div className="form-group md:col-span-2">
                            <label htmlFor="remoteFixedDays">Jours fixes (ex: Lundi, Jeudi)</label>
                            <input id="remoteFixedDays" type="text" name="remoteFixedDays" value={formData.remoteFixedDays || ""} onChange={onChange} placeholder="Jours concernés..." />
                        </div>
                    </div>
                    <div className="form-group mt-4">
                        <label htmlFor="remoteLocation">Lieu autorisé</label>
                        <input id="remoteLocation" type="text" name="remoteLocation" value={formData.remoteLocation || "Domicile du salarié"} onChange={onChange} />
                    </div>
                </div>
            )}
            {/* Recommendation */}
            {formData.documentType === 'lettre_recommandation' && (
                <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)] mb-4">Détails de la Recommandation</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-group">
                            <label htmlFor="recommenderPosition">Votre Poste / Fonction</label>
                            <input
                                id="recommenderPosition"
                                type="text"
                                name="recommenderPosition"
                                value={formData.recommenderPosition || ''}
                                onChange={onChange}
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
                                onChange={onChange}
                                required
                                placeholder="Maître de stage / Manager"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
