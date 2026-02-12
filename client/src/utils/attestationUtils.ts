export const getDocumentTitle = (type: string) => {
    switch (type) {
        case "attestation_travail": return "ATTESTATION DE TRAVAIL";
        case "attestation_stage": return "ATTESTATION DE STAGE";
        case "attestation_honneur": return "ATTESTATION SUR L'HONNEUR";
        case "justificatif_domicile": return "JUSTIFICATIF DE DOMICILE";
        case "certificat_scolarite": return "CERTIFICAT DE SCOLARITÉ";
        case "lettre_recommandation": return "LETTRE DE RECOMMANDATION";
        case "attestation_hebergement": return "ATTESTATION D'HÉBERGEMENT";
        default: return "ATTESTATION";
    }
};

export const getFormattedDate = () => {
    return new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
};
