import { CreditCard, User, Scale, GitCompare, MapPin } from "lucide-react";
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
                                onChange={onChange}
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
                                onChange={onChange}
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
                                onChange={onChange}
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
                                onChange={onChange}
                                required
                                placeholder="Prénom"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Non-polygamie */}
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
                                onChange={onChange}
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
                                    onChange={onChange}
                                    style={{ colorScheme: 'dark' }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Respect des principes */}
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

            {/* Concordance d'identité */}
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
                        <div className="space-y-3 p-3 border border-white/10 rounded">
                            <label htmlFor="doc1Type" className="text-xs uppercase text-[var(--muted)] font-bold">Document 1 (Source)</label>
                            <select id="doc1Type" name="doc1Type" value={formData.doc1Type || ""} onChange={onChange} className="w-full">
                                <option value="">Type de document...</option>
                                <option value="Acte de naissance">Acte de naissance</option>
                                <option value="Passeport">Passeport</option>
                                <option value="Carte d'identité">Carte d'identité</option>
                                <option value="Titre de séjour">Titre de séjour</option>
                            </select>
                            <input id="doc1Name" type="text" name="doc1Name" value={formData.doc1Name || ""} onChange={onChange} placeholder="Nom exact sur ce document" />
                            <input id="doc1Firstname" type="text" name="doc1Firstname" value={formData.doc1Firstname || ""} onChange={onChange} placeholder="Prénom exact sur ce document" />
                        </div>

                        <div className="space-y-3 p-3 border border-white/10 rounded">
                            <label htmlFor="doc2Type" className="text-xs uppercase text-[var(--muted)] font-bold">Document 2 (Divergent)</label>
                            <select id="doc2Type" name="doc2Type" value={formData.doc2Type || ""} onChange={onChange} className="w-full">
                                <option value="">Type de document...</option>
                                <option value="Acte de naissance">Acte de naissance</option>
                                <option value="Passeport">Passeport</option>
                                <option value="Carte d'identité">Carte d'identité</option>
                                <option value="Titre de séjour">Titre de séjour</option>
                            </select>
                            <input id="doc2Name" type="text" name="doc2Name" value={formData.doc2Name || ""} onChange={onChange} placeholder="Nom exact sur ce document" />
                            <input id="doc2Firstname" type="text" name="doc2Firstname" value={formData.doc2Firstname || ""} onChange={onChange} placeholder="Prénom exact sur ce document" />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="discordanceType">Nature de la différence</label>
                        <select id="discordanceType" name="discordanceType" value={formData.discordanceType || ""} onChange={onChange}>
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

            {/* Résidence */}
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
        </>
    );
}
