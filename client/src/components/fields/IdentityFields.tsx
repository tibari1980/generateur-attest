import { AttestationFormData } from "../../types/attestation";

interface IdentityFieldsProps {
    formData: AttestationFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function IdentityFields({ formData, onChange }: IdentityFieldsProps) {
    return (
        <>
            <div className="form-group-row grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Civility */}
                <div className="form-group">
                    <label htmlFor="civility">Civilité</label>
                    <select
                        id="civility"
                        name="civility"
                        value={formData.civility}
                        onChange={onChange}
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
                        onChange={onChange}
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
                        onChange={onChange}
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
                        onChange={onChange}
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
                        onChange={onChange}
                        placeholder="Paris 15"
                    />
                </div>
            </div>
        </>
    );
}
