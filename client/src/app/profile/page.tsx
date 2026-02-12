"use client";

import { useAuth } from "@/context/AuthContext";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import { motion } from "framer-motion";
import { Save, User, Mail, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const { user, userProfile, loading, deleteAccount } = useAuth();
    const router = useRouter();

    // Local state for form
    const [formData, setFormData] = useState({
        displayName: "",
        civility: "Monsieur",
        nom: "",
        prenom: "",
        dateNaissance: "",
        lieuNaissance: ""
    });

    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deletePassword, setDeletePassword] = useState("");
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleDeleteAccount = async () => {
        if (!deletePassword) {
            setMessage({ type: 'error', text: 'Veuillez entrer votre mot de passe pour confirmer la suppression.' });
            return;
        }
        if (!confirm("Dernière vérification : Voulez-vous vraiment supprimer votre compte ?")) return;

        setIsDeleting(true);
        try {
            await deleteAccount(deletePassword);
            // Redirect happens in deleteAccount, but we can double check or show a toast
        } catch (error: any) {
            console.error("Delete account error:", error);
            if (error.code === 'auth/requires-recent-login') {
                setMessage({
                    type: 'error',
                    text: 'Pour votre sécurité, veuillez vous déconnecter et vous reconnecter avant de supprimer votre compte.'
                });
            } else if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                setMessage({ type: 'error', text: 'Mot de passe incorrect.' });
            } else {
                setMessage({ type: 'error', text: `Erreur: ${error.message}` });
            }
            setShowDeleteConfirm(false);
            setDeletePassword("");
        } finally {
            setIsDeleting(false);
        }
    };

    useEffect(() => {
        if (!loading && !user) {
            router.push("/auth/signin");
        } else if (userProfile) {
            setFormData({
                displayName: userProfile.displayName || user?.displayName || "",
                civility: userProfile.civility || "Monsieur",
                nom: userProfile.nom || "",
                prenom: userProfile.prenom || "",
                dateNaissance: userProfile.dateNaissance || "",
                lieuNaissance: userProfile.lieuNaissance || ""
            });
        }
    }, [user, userProfile, loading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsSaving(true);
        setMessage(null);

        try {
            // Update Auth Profile (Display Name)
            if (formData.displayName !== user.displayName) {
                await updateProfile(user, {
                    displayName: formData.displayName
                });
            }

            // Update Firestore Profile using setDoc with merge: true
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                displayName: formData.displayName,
                civility: formData.civility,
                nom: formData.nom,
                prenom: formData.prenom,
                dateNaissance: formData.dateNaissance,
                lieuNaissance: formData.lieuNaissance,
                updatedAt: new Date().toISOString()
            }, { merge: true });

            setMessage({ type: 'success', text: 'Profil mis à jour avec succès !' });
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error: any) {
            console.error("Error updating profile:", error);
            const errorMessage = error.code ? `Erreur (${error.code})` : error.message || 'Erreur inconnue';
            setMessage({ type: 'error', text: `Erreur lors de la mise à jour: ${errorMessage}` });
        } finally {
            setIsSaving(false);
        }
    };

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-24">
                <Loader2 className="animate-spin text-indigo-500" size={32} />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4">
            <div className="container mx-auto max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-8 md:p-10"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-indigo-500/20">
                            {user.displayName ? user.displayName[0].toUpperCase() : <User size={32} />}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Mon Profil</h1>
                            <p className="text-[var(--muted)]">Gérez vos informations personnelles</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field (Read-only) */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                <Mail size={16} />
                                Adresse Email
                            </label>
                            <input
                                type="email"
                                value={user.email || ""}
                                disabled
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed"
                            />
                            <p className="text-xs text-[var(--muted)]">
                                L'adresse email ne peut pas être modifiée pour le moment.
                            </p>
                        </div>

                        {/* Civility Field */}
                        <div className="space-y-2">
                            <label htmlFor="civility" className="text-sm font-medium text-gray-300">
                                Civilité
                            </label>
                            <select
                                id="civility"
                                value={formData.civility}
                                onChange={(e) => setFormData({ ...formData, civility: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                            >
                                <option value="Monsieur" className="bg-gray-800">Monsieur</option>
                                <option value="Madame" className="bg-gray-800">Madame</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Nom Field */}
                            <div className="space-y-2">
                                <label htmlFor="nom" className="text-sm font-medium text-gray-300">
                                    Nom
                                </label>
                                <input
                                    id="nom"
                                    type="text"
                                    value={formData.nom}
                                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                                    placeholder="Dupont"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600"
                                />
                            </div>

                            {/* Prénom Field */}
                            <div className="space-y-2">
                                <label htmlFor="prenom" className="text-sm font-medium text-gray-300">
                                    Prénom
                                </label>
                                <input
                                    id="prenom"
                                    type="text"
                                    value={formData.prenom}
                                    onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                                    placeholder="Jean"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600"
                                />
                            </div>
                        </div>

                        {/* Display Name Field (Optional/Derived) */}
                        <div className="space-y-2">
                            <label htmlFor="displayName" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                <User size={16} />
                                Nom d'affichage (Public)
                            </label>
                            <input
                                id="displayName"
                                type="text"
                                value={formData.displayName}
                                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                placeholder="Jean Dupont"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600"
                            />
                        </div>

                        {/* Date & Lieu de Naissance */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="dateNaissance" className="text-sm font-medium text-gray-300">
                                    Date de naissance
                                </label>
                                <input
                                    id="dateNaissance"
                                    type="date"
                                    value={formData.dateNaissance}
                                    onChange={(e) => setFormData({ ...formData, dateNaissance: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all [color-scheme:dark]"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="lieuNaissance" className="text-sm font-medium text-gray-300">
                                    Lieu de naissance
                                </label>
                                <input
                                    id="lieuNaissance"
                                    type="text"
                                    value={formData.lieuNaissance}
                                    onChange={(e) => setFormData({ ...formData, lieuNaissance: e.target.value })}
                                    placeholder="Paris 15"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600"
                                />
                            </div>
                        </div>

                        {/* Status Message */}
                        {message && (
                            <div className={`p-4 rounded-lg text-sm ${message.type === 'success'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                }`}>
                                {message.text}
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="btn btn-primary w-full flex items-center justify-center gap-2"
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Enregistrement...
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        Enregistrer les modifications
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Danger Zone */}
                    <div className="mt-12 pt-8 border-t border-white/10">
                        <h3 className="text-xl font-bold text-red-500 mb-4">Zone de danger</h3>
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                            <h4 className="font-semibold text-white mb-2">Supprimer mon compte</h4>
                            <p className="text-sm text-[var(--muted)] mb-4">
                                Cette action est irréversible. Toutes vos données personnelles seront définitivement supprimées.
                            </p>

                            {!showDeleteConfirm ? (
                                <button
                                    type="button"
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
                                >
                                    Supprimer mon compte
                                </button>
                            ) : (
                                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <p className="text-sm text-red-400 font-medium bg-red-950/30 p-3 rounded border border-red-900/50">
                                        Êtes-vous absolument sûr ? Entrez votre mot de passe pour confirmer.
                                    </p>
                                    <input
                                        type="password"
                                        value={deletePassword}
                                        onChange={(e) => setDeletePassword(e.target.value)}
                                        placeholder="Votre mot de passe"
                                        className="w-full bg-white/5 border border-red-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-gray-600"
                                    />
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={handleDeleteAccount}
                                            disabled={isDeleting || !deletePassword}
                                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                                        >
                                            {isDeleting ? <Loader2 size={16} className="animate-spin" /> : null}
                                            Confirmer la suppression
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => { setShowDeleteConfirm(false); setDeletePassword(""); }}
                                            disabled={isDeleting}
                                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors"
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
