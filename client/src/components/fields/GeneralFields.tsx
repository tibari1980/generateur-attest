import { Building, MapPin, Calendar, UserCheck, Mail } from "lucide-react";
import { AttestationFormData } from "../../types/attestation";

interface GeneralFieldsProps {
    formData: AttestationFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function GeneralFields({ formData, onChange }: GeneralFieldsProps) {
    return (
        <>
            <div className="form-section-header">
                <UserCheck size={16} />
                <span>Information Signataire</span>
            </div>
            {/* Representative Name (Director or Host) - Hidden for Honor & Vie Commune */}
            {(formData.documentType !== 'attestation_honneur' && formData.documentType !== 'attestation_vie_commune') && (
                <div className="full-width form-group">
                    <label htmlFor="representativeName">
                        {(formData.documentType === 'justificatif_domicile' || formData.documentType === 'attestation_hebergement') ? "Nom complet de l'hébergeant" : "Nom complet du Directeur / Signataire"}
                    </label>
                    <input
                        id="representativeName"
                        type="text"
                        name="representativeName"
                        value={formData.representativeName || ''}
                        onChange={onChange}
                        required
                        placeholder={formData.documentType === 'justificatif_domicile' ? "Jean Dupont" : "Directeur Général"}
                    />
                </div>
            )}

            <div className="full-width form-group">
                <label htmlFor="email">Email (optionnel)</label>
                <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)] opacity-50" />
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={onChange}
                        className="pl-10"
                        placeholder="jean.dupont@email.com"
                    />
                </div>
            </div>

            <div className="form-section-header">
                <MapPin size={16} />
                <span>Localisation & Date</span>
            </div>

            {/* Address - Only for Domicile, Honor, Hebergement, Vie Commune, Prefecture */}
            {(['justificatif_domicile', 'attestation_honneur', 'attestation_hebergement', 'attestation_vie_commune', 'attestation_residence', 'attestation_financiere', 'attestation_non_polygamie', 'attestation_respect_principes', 'attestation_concordance', 'attestation_separation'].includes(formData.documentType)) && (
                <div className="full-width form-group">
                    <label htmlFor="address">
                        {(formData.documentType === 'justificatif_domicile' || formData.documentType === 'attestation_hebergement') ? "Adresse du logement" : "Votre adresse complète"}
                    </label>
                    <input
                        id="address"
                        type="text"
                        name="address"
                        value={formData.address || ''}
                        onChange={onChange}
                        required
                        placeholder="10 Rue de la Paix, 75000 Paris"
                    />
                </div>
            )}

            {/* Poste / Profession - Hidden for Domicile, Hebergement, Vie Commune, many Prefecture types */}
            {(!['justificatif_domicile', 'attestation_hebergement', 'attestation_vie_commune', 'attestation_residence', 'attestation_financiere', 'attestation_non_polygamie', 'attestation_respect_principes', 'attestation_concordance', 'attestation_separation', 'quittance_loyer', 'attestation_loyer_ajour', 'attestation_fin_bail'].includes(formData.documentType)) && (
                <div className="form-group">
                    <label htmlFor="poste">{formData.documentType === 'attestation_honneur' ? "Profession" : "Poste / Intitulé"}</label>
                    <input
                        id="poste"
                        type="text"
                        name="poste"
                        value={formData.poste}
                        onChange={onChange}
                        required
                        placeholder={formData.documentType === 'attestation_honneur' ? "Indépendant" : "Développeur Web"}
                    />
                </div>
            )}

            {/* Entreprise - Hidden for Domicile/School/Hebergement/Vie Commune/Prefecture */}
            {(!['justificatif_domicile', 'certificat_scolarite', 'attestation_hebergement', 'attestation_vie_commune', 'attestation_residence', 'attestation_financiere', 'attestation_non_polygamie', 'attestation_respect_principes', 'attestation_concordance', 'attestation_separation', 'quittance_loyer', 'attestation_loyer_ajour', 'attestation_fin_bail', 'attestation_honneur'].includes(formData.documentType)) && (
                <div className="form-group">
                    <label htmlFor="entreprise">Entreprise / Organisme</label>
                    <div className="relative">
                        <Building size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)] opacity-50" />
                        <input
                            id="entreprise"
                            type="text"
                            name="entreprise"
                            value={formData.entreprise}
                            onChange={onChange}
                            className="pl-10"
                            required
                            placeholder="TechCorp"
                        />
                    </div>
                </div>
            )}

            {/* Common Date Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                    <label htmlFor="dynamicDate">
                        {(['justificatif_domicile', 'attestation_honneur', 'attestation_hebergement', 'attestation_vie_commune', 'attestation_residence', 'attestation_financiere', 'attestation_non_polygamie', 'attestation_respect_principes', 'attestation_concordance', 'attestation_separation'].includes(formData.documentType))
                            ? "Depuis le"
                            : (['certificat_scolarite', 'attestation_assiduite', 'attestation_reussite', 'attestation_examen'].includes(formData.documentType))
                                ? "Fait le"
                                : "Date de début"}
                    </label>
                    <div className="relative">
                        <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)] opacity-50 z-10" />
                        <input
                            id="dynamicDate"
                            type="date"
                            name="dateDebut"
                            value={formData.dateDebut}
                            onChange={onChange}
                            className="pl-10"
                            required
                            style={{ colorScheme: 'dark' }}
                        />
                    </div>
                </div>

                {/* Date Fin - Only for Travail/Stage/Recommendation/Assiduite */}
                {(['attestation_travail', 'attestation_stage', 'lettre_recommandation', 'attestation_assiduite'].includes(formData.documentType)) && (
                    <div className="form-group">
                        <label htmlFor="dateFin">Date de fin {formData.documentType === 'attestation_travail' && "(optionnel)"}</label>
                        <div className="relative">
                            <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)] opacity-50 z-10" />
                            <input
                                id="dateFin"
                                type="date"
                                name="dateFin"
                                value={formData.dateFin || ''}
                                onChange={onChange}
                                className="pl-10"
                                required={formData.documentType === 'attestation_stage' || formData.documentType === 'attestation_assiduite'}
                                style={{ colorScheme: 'dark' }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
