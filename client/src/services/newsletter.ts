import { db } from "./firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";

interface NewsletterResponse {
    success: boolean;
    message: string;
}

export const subscribeToNewsletter = async (email: string): Promise<NewsletterResponse> => {
    try {
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { success: false, message: "Adresse email invalide." };
        }

        const subscribersRef = collection(db, "newsletter_subscribers");

        // Direct add to Firestore (Skip duplicate check to avoid READ permission issues)
        await addDoc(subscribersRef, {
            email,
            subscribedAt: serverTimestamp(),
            source: "footer_form"
        });

        return { success: true, message: "Inscription réussie !" };
    } catch (error) {
        console.error("Error subscribing to newsletter:", error);
        return { success: false, message: "Une erreur est survenue. Veuillez réessayer." };
    }
};
