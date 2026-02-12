export interface AttestationData {
    documentType: string;
    nom: string;
    prenom: string;
    email: string;
    poste: string;
    entreprise: string;
    dateDebut: string;
    dateFin?: string;
    userId?: string;
}

interface WebhookResponse {
    status: 'success' | 'error';
    documentId?: string;
    downloadUrl?: string;
    message?: string;
}

export const generateAttestation = async (data: AttestationData): Promise<WebhookResponse> => {
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

    if (!webhookUrl) {
        console.error("Webhook URL is missing. Check .env.local");
        throw new Error("Configuration n8n manquante. Veuillez vérifier les paramètres.");
    }

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to generate attestation:", error);
        throw error;
    }
};
