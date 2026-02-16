"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut as firebaseSignOut, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { useRouter } from "next/navigation";
import { doc, deleteDoc, onSnapshot } from "firebase/firestore";

// Define the extended user profile shape
export interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    civility?: string;
    nom?: string;
    prenom?: string;
    dateNaissance?: string;
    lieuNaissance?: string;
    photoURL?: string;
}

// Define the context shape
interface AuthContextType {
    user: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
    signOut: () => Promise<void>;
    deleteAccount: (password: string) => Promise<void>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
    user: null,
    userProfile: null,
    loading: true,
    signOut: async () => { },
    deleteAccount: async () => { },
});

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                const userDocRef = doc(db, "users", currentUser.uid);

                const unsubscribeSnapshot = onSnapshot(userDocRef, (doc) => {
                    if (doc.exists()) {
                        setUserProfile(doc.data() as UserProfile);
                    } else {
                        // Create basic profile if it doesn't exist
                        setUserProfile({
                            uid: currentUser.uid,
                            email: currentUser.email || "",
                            displayName: currentUser.displayName || "",
                        });
                    }
                    setLoading(false);
                }, (error) => {
                    console.error("Error fetching user profile:", error);
                    setLoading(false);
                });

                return () => unsubscribeSnapshot();
            } else {
                setUserProfile(null);
                setLoading(false);
            }
        });

        // Cleanup subscription
        return () => unsubscribeAuth();
    }, []);

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
            setUserProfile(null);
            router.push("/");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const deleteAccount = async (password: string) => {
        if (!auth.currentUser || !auth.currentUser.email) return;



        try {
            // 1. Re-authenticate user first

            const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
            await reauthenticateWithCredential(auth.currentUser, credential);
            console.log("Re-authentication successful.");

            // 2. Delete user data from Firestore
            console.log("Deleting Firestore document...");
            await deleteDoc(doc(db, "users", auth.currentUser.uid));
            console.log("Firestore document deleted.");

            // 3. Delete user from Firebase Auth
            console.log("Deleting Auth user...");
            await deleteUser(auth.currentUser);
            console.log("Auth user deleted.");

            // 4. Cleanup local state
            setUserProfile(null);
            setUser(null);
            router.push("/");
        } catch (error: any) {
            console.error("Error deleting account:", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, userProfile, loading, signOut, deleteAccount }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
