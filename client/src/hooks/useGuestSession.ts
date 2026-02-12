"use client";

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'jd_guest_session';
const STORAGE_ID_KEY = 'jd_guest_session_id';
const SESSION_DURATION = 4 * 60 * 60 * 1000; // 4 hours

export function useGuestSession<T>(initialData: T) {
    const [data, setData] = useState<T>(initialData);
    const [isRestored, setIsRestored] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    // 1. Initialisation / Restoration
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const savedSession = localStorage.getItem(STORAGE_KEY);
        if (savedSession) {
            try {
                const parsed = JSON.parse(savedSession);
                const now = new Date().getTime();

                // Check expiration
                if (now < parsed.expires_at) {
                    setData(parsed.form_data);
                    setIsRestored(true);
                    setLastSaved(new Date(parsed.last_updated));
                } else {
                    localStorage.removeItem(STORAGE_KEY); // Session expired
                }
            } catch (e) {
                console.error("Error reading guest session", e);
            }
        }
    }, []);

    // 2. Auto-save
    const updateData = (newData: T) => {
        setData(newData);

        if (typeof window === 'undefined') return;

        const now = new Date();
        const session = {
            guest_session_id: localStorage.getItem(STORAGE_ID_KEY) || uuidv4(),
            last_updated: now.toISOString(),
            expires_at: now.getTime() + SESSION_DURATION,
            form_data: newData
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        setLastSaved(now);

        if (!localStorage.getItem(STORAGE_ID_KEY)) {
            localStorage.setItem(STORAGE_ID_KEY, session.guest_session_id);
        }
    };

    // 3. Clear Session
    const clearSession = () => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_ID_KEY);
        setData(initialData);
        setLastSaved(null);
        setIsRestored(false);
    };

    return { data, updateData, isRestored, lastSaved, clearSession };
}
