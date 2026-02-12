import { db } from './firebase';
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    updateDoc,
    doc,
    deleteDoc,
    Timestamp,
    limit
} from 'firebase/firestore';

export interface Testimonial {
    id?: string;
    name: string;
    role: string;
    email?: string;
    rating: number; // 1-5
    comment: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Timestamp | Date;
    userId?: string;
    initial?: string;
    gradient?: string;
}

const TESTIMONIALS_COLLECTION = 'testimonials';

// Générer une couleur de gradient aléatoire pour l'avatar
const generateGradient = (): string => {
    const gradients = [
        'linear-gradient(135deg, #6366f1, #a855f7)',
        'linear-gradient(135deg, #10b981, #3b82f6)',
        'linear-gradient(135deg, #f59e0b, #ef4444)',
        'linear-gradient(135deg, #ec4899, #8b5cf6)',
        'linear-gradient(135deg, #14b8a6, #06b6d4)',
        'linear-gradient(135deg, #f97316, #dc2626)',
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
};

// Soumettre un nouveau témoignage
export const submitTestimonial = async (
    testimonialData: Omit<Testimonial, 'id' | 'status' | 'createdAt' | 'initial' | 'gradient'> & { userId?: string }
): Promise<{ success: boolean; message: string }> => {
    try {
        const initial = testimonialData.name.charAt(0).toUpperCase();
        const gradient = generateGradient();

        const newTestimonial: any = {
            ...testimonialData,
            status: 'approved' as const,
            createdAt: Timestamp.now(),
            initial,
            gradient,
        };

        if (testimonialData.userId) {
            newTestimonial.userId = testimonialData.userId;
        }

        await addDoc(collection(db, TESTIMONIALS_COLLECTION), newTestimonial);

        return {
            success: true,
            message: 'Merci pour votre avis ! Il sera publié après validation.',
        };
    } catch (error) {
        console.error('Error submitting testimonial:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'enregistrement.',
        };
    }
};

// Récupérer les témoignages approuvés (pour affichage public)
export const getApprovedTestimonials = async (maxResults: number = 6): Promise<Testimonial[]> => {
    try {
        const q = query(
            collection(db, TESTIMONIALS_COLLECTION),
            where('status', '==', 'approved'),
            orderBy('createdAt', 'desc'),
            limit(maxResults)
        );

        const querySnapshot = await getDocs(q);
        const testimonials: Testimonial[] = [];

        querySnapshot.forEach((doc) => {
            testimonials.push({
                id: doc.id,
                ...doc.data(),
            } as Testimonial);
        });

        return testimonials;
    } catch (error) {
        console.error('Error fetching approved testimonials:', error);
        return [];
    }
};

// Récupérer tous les témoignages (pour admin)
export const getAllTestimonials = async (): Promise<Testimonial[]> => {
    try {
        const q = query(
            collection(db, TESTIMONIALS_COLLECTION),
            orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const testimonials: Testimonial[] = [];

        querySnapshot.forEach((doc) => {
            testimonials.push({
                id: doc.id,
                ...doc.data(),
            } as Testimonial);
        });

        return testimonials;
    } catch (error) {
        console.error('Error fetching all testimonials:', error);
        return [];
    }
};

// Mettre à jour le statut d'un témoignage (admin)
export const updateTestimonialStatus = async (
    testimonialId: string,
    status: 'approved' | 'rejected'
): Promise<{ success: boolean; message: string }> => {
    try {
        const testimonialRef = doc(db, TESTIMONIALS_COLLECTION, testimonialId);
        await updateDoc(testimonialRef, { status });

        return {
            success: true,
            message: `Témoignage ${status === 'approved' ? 'approuvé' : 'rejeté'} avec succès.`,
        };
    } catch (error) {
        console.error('Error updating testimonial status:', error);
        return {
            success: false,
            message: 'Erreur lors de la mise à jour du statut.',
        };
    }
};

// Supprimer un témoignage (admin)
export const deleteTestimonial = async (
    testimonialId: string
): Promise<{ success: boolean; message: string }> => {
    try {
        await deleteDoc(doc(db, TESTIMONIALS_COLLECTION, testimonialId));

        return {
            success: true,
            message: 'Témoignage supprimé avec succès.',
        };
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        return {
            success: false,
            message: 'Erreur lors de la suppression.',
        };
    }
};

// Récupérer les statistiques des témoignages
export const getTestimonialStats = async (): Promise<{ averageRating: number; count: number }> => {
    try {
        const q = query(
            collection(db, TESTIMONIALS_COLLECTION),
            where('status', '==', 'approved')
        );

        const querySnapshot = await getDocs(q);
        const total = querySnapshot.size;

        if (total === 0) {
            return { averageRating: 0, count: 0 };
        }

        let sumRating = 0;
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            sumRating += data.rating || 0;
        });

        const average = sumRating / total;
        // Arrondir à 1 décimale (ex: 4.5)
        return {
            averageRating: Math.round(average * 10) / 10,
            count: total
        };
    } catch (error) {
        console.error('Error fetching testimonial stats:', error);
        return { averageRating: 0, count: 0 };
    }
};
