import { Heart } from "lucide-react";
import { AttestationFormData } from "../../types/attestation";

interface PersonalFieldsProps {
    formData: AttestationFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function PersonalFields({ formData, onChange }: PersonalFieldsProps) {
    return (
        <>
            {/* Vie Commune */}
            {formData.documentType === 'attestation_vie_commune' && (
                <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)] mb-4 flex items-center gap-2">
                        <Heart size={16} />
                        Conjoint(e) / Partenaire
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-group">
                            <label htmlFor="partnerName">Nom</label>
                            <input
                                id="partnerName"
                                type="text"
                                name="partnerName"
                                value={formData.partnerName || ''}
                                onChange={onChange}
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
                                onChange={onChange}
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
                                onChange={onChange}
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
                                onChange={onChange}
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
                                onChange={onChange}
                                required
                                placeholder="Française"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="form-group">
                            <label htmlFor="relationshipType">Statut</label>
                            <select
                                id="relationshipType"
                                name="relationshipType"
                                value={formData.relationshipType || 'concubins'}
                                onChange={onChange}
                            >
                                <option value="concubins">Concubins (Union libre)</option>
                                <option value="mariés">Mariés</option>
                                <option value="pacsés">Pacsés</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nationality">Votre Nationalité</label>
                            <input
                                id="nationality"
                                type="text"
                                name="nationality"
                                value={formData.nationality || ''}
                                onChange={onChange}
                                placeholder="Française"
                            />
                        </div>
                    </div>

                    <div className="form-group mt-4">
                        <label htmlFor="city">Fait à (Ville)</label>
                        <input
                            id="city"
                            type="text"
                            name="city"
                            value={formData.city || ''}
                            onChange={onChange}
                            placeholder="Paris"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
