"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-8 md:p-12"
                >
                    <h1 className="text-3xl md:text-4xl font-bold mb-8">Politique de Confidentialité</h1>
                    <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
                        <p>Dernière mise à jour : {new Date().toLocaleDateString()}</p>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">1. Collecte des données</h2>
                            <p>
                                Chez JL Cloud, la confidentialité de vos données est notre priorité absolue.
                                Notre service est conçu selon le principe de "Privacy by Design".
                                <strong>Aucune donnée personnelle saisie dans les formulaires n'est envoyée ou stockée sur nos serveurs.</strong>
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">2. Traitement local</h2>
                            <p>
                                La génération des documents PDF s'effectue entièrement en local, directement dans votre navigateur web.
                                Vos noms, adresses, et autres informations sensibles ne quittent jamais votre appareil.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">3. Cookies</h2>
                            <p>
                                Nous utilisons uniquement des cookies techniques strictement nécessaires au bon fonctionnement du site
                                (comme le maintien de votre session si vous êtes connecté). Nous n'utilisons pas de cookies publicitaires ou de traçage tiers intrusifs.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">4. Vos droits</h2>
                            <p>
                                Puisque nous ne stockons pas vos données personnelles, nous n'avons rien à supprimer ou à modifier sur nos serveurs.
                                Vous gardez le contrôle total de vos informations à tout moment.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">5. Contact</h2>
                            <p>
                                Pour toute question concernant notre politique de confidentialité, vous pouvez nous contacter via notre page de contact ou à l'adresse email : privacy@jdcloud.com.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
