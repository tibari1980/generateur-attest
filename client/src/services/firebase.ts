import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDPCz82ouczyE9IuXMpYuNdfDVdNM799Aw",
    authDomain: "gen-attestation-antigravity.firebaseapp.com",
    projectId: "gen-attestation-antigravity",
    storageBucket: "gen-attestation-antigravity.firebasestorage.app",
    messagingSenderId: "1055065689799",
    appId: "1:1055065689799:web:d6e4553df493ba8f90f8e2"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
