import { CreditCard, User, Scale, GitCompare, MapPin, Landmark, ShieldCheck, Fingerprint, HandCoins } from "lucide-react";
import { AttestationFormData } from "../../types/attestation";

interface PrefectureFieldsProps {
    formData: AttestationFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function PrefectureFields({ formData, onChange }: PrefectureFieldsProps) {
    return (
        <>
            {/* Prise en charge financière */}
            {formData.documentType === 'attestation_financiere' && (
                <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                    <div className="form-section-header !mt-0 !mb-4">
                        <HandCoins size={16} />
                        <span>Détails de la prise en charge</span>
                    </div>

                    <div className="p-3 rounded bg-emerald-500/10 border border-emerald-500/20 mb-4 text-xs text-emerald-300">
                        Vous vous engagez à prendre en charge les frais de vie du bénéficiaire.
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="form-group">
                            <label htmlFor="beneficiaryFirstName">Prénom du bénéficiaire</label>
                            <input id="beneficiaryFirstName" type="text" name="beneficiaryFirstName" value={formData.beneficiaryFirstName || ""} onChange={onChange} placeholder="Prénom" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="beneficiaryName">Nom du bénéficiaire</label>
                            <input id="beneficiaryName" type="text" name="beneficiaryName" value={formData.beneficiaryName || ""} onChange={onChange} placeholder="Nom" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-group">
                            <label htmlFor="amount">Montant mensuel (€)</label>
                            <input id="amount" type="number" name="amount" value={formData.amount || ""} onChange={onChange} placeholder="Ex: 615" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="duration">Durée de l'engagement</label>
                            <input id="duration" type="text" name="duration" value={formData.duration || ""} onChange={onChange} placeholder="Ex: 1 an" />
                        </div>
                    </div>
                </div>
            )}

            {/* Non-polygamie */}
            {formData.documentType === 'attestation_non_polygamie' && (
                <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                    <div className="form-section-header !mt-0 !mb-4">
                        <ShieldCheck size={16} />
                        <span>Déclaration de situation familiale</span>
                    </div>

                    <div className="p-3 rounded bg-indigo-500/10 border border-indigo-500/20 mb-4 text-xs text-indigo-300">
                        Certifie sur l'honneur ne pas vivre en état de polygamie en France.
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-group">
                            <label htmlFor="maritalStatus">Situation actuelle</label>
                            <select id="maritalStatus" name="maritalStatus" value={formData.maritalStatus || "celibataire"} onChange={onChange}>
                                <option value="celibataire">Célibataire</option>
                                <option value="marie">Marié(e)</option>
                                <option value="divorce">Divorcé(e)</option>
                                <option value="veuf">Veuf / Veuve</option>
                            </select>
                        </div>
                        {formData.maritalStatus === 'marie' && (
                            <div className="form-group">
                                <label htmlFor="marriageDate">Date de mariage</label>
                                <input id="marriageDate" type="date" name="marriageDate" value={formData.marriageDate || ""} onChange={onChange} style={{ colorScheme: 'dark' }} />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Respect des principes */}
            {formData.documentType === 'attestation_respect_principes' && (
                <div className="p-4 border border-blue-500/20 rounded-lg bg-blue-500/5 mb-6">
                    <div className="form-section-header !mt-0 !mb-4 !text-blue-400 !border-blue-500/20">
                        <ShieldCheck size={16} />
                        <span>Engagement républicain</span>
                    </div>
                    <div className="p-3 rounded bg-orange-500/10 border border-orange-200/20 mb-4 text-xs text-orange-300">
                        En générant ce document, vous vous engagez solennellement à respecter les 7 piliers de la République Française.
                    </div>
                </div>
            )}

            {/* Concordance d'identité */}
            {formData.documentType === 'attestation_concordance' && (
                <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                    <div className="form-section-header !mt-0 !mb-4">
                        <Fingerprint size={16} />
                        <span>Détails de la discordance</span>
                    </div>

                    <div className="p-3 rounded bg-purple-500/10 border border-purple-500/20 mb-4 text-xs text-purple-300">
                        Indiquez les informations telles qu'elles apparaissent sur chaque document divergent.
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase text-purple-400 border-b border-purple-400/20 pb-1">Document 1</h4>
                            <div className="form-group">
                                <label htmlFor="doc1Type">Type (ex: Passeport)</label>
                                <input id="doc1Type" type="text" name="doc1Type" value={formData.doc1Type || ""} onChange={onChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="doc1Name">Nom sur Doc 1</label>
                                <input id="doc1Name" type="text" name="doc1Name" value={formData.doc1Name || ""} onChange={onChange} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase text-purple-400 border-b border-purple-400/20 pb-1">Document 2</h4>
                            <div className="form-group">
                                <label htmlFor="doc2Type">Type (ex: Carte de séjour)</label>
                                <input id="doc2Type" type="text" name="doc2Type" value={formData.doc2Type || ""} onChange={onChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="doc2Name">Nom sur Doc 2</label>
                                <input id="doc2Name" type="text" name="doc2Name" value={formData.doc2Name || ""} onChange={onChange} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group mt-6">
                        <label htmlFor="discordanceType">Raison de la discordance (ex: faute de frappe, omission...)</label>
                        <input id="discordanceType" type="text" name="discordanceType" value={formData.discordanceType || ""} onChange={onChange} />
                    </div>
                </div>
            )}

            {/* Résidence simple */}
            {formData.documentType === 'attestation_residence' && (
                <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                    <div className="form-section-header !mt-0 !mb-4">
                        <MapPin size={16} />
                        <span>Détails de résidence</span>
                    </div>
                    <p className="text-xs text-[var(--muted)] italic">
                        Ce document certifie votre résidence effective à l'adresse indiquée ci-dessous.
                    </p>
                </div>
            )}
        </>
    );
}
