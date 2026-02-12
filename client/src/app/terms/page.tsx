"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-8 md:p-12"
                >
                    <h1 className="text-3xl md:text-4xl font-bold mb-8">Conditions Générales d'Utilisation</h1>
                    <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
                        <p>Dernière mise à jour : {new Date().toLocaleDateString()}</p>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptation des conditions</h2>
                            <p>
                                En accédant et en utilisant JL Cloud, vous acceptez sans réserve les présentes Conditions Générales d'Utilisation.
                                Si vous n'acceptez pas ces termes, veuillez ne pas utiliser nos services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">2. Services Proposés</h2>
                            <p>
                                JL Cloud fournit un outil en ligne permettant de générer automatiquement des modèles de documents administratifs
                                (attestations sur l'honneur, justificatifs, etc.) à partir des données saisies par l'utilisateur.
                                Le service ne remplace en aucun cas un conseil juridique ou notarial.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">3. Responsabilité</h2>
                            <p>
                                JL Cloud fournit des modèles à titre indicatif. L'utilisateur est seul responsable de l'exactitude des informations saisies
                                et de l'usage qu'il fait des documents générés. JL Cloud ne saurait être tenu responsable en cas d'utilisation frauduleuse
                                ou illégale des documents produits.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">4. Données Personnelles</h2>
                            <p>
                                Aucune donnée personnelle n'est stockée sur nos serveurs de manière permanente sans votre consentement.
                                Le traitement des données se fait localement ou de manière éphémère pour la génération du document.
                                Pour plus de détails, consultez notre Politique de Confidentialité.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">5. Propriété Intellectuelle</h2>
                            <p>
                                L'ensemble du site JL Cloud (design, logo, code source) est la propriété exclusive de l'éditeur.
                                Toute reproduction non autorisée est interdite. Les documents générés vous appartiennent.
                            </p>
                        </section>
                        <p>
                            Nous nous réservons le droit de modifier, suspendre ou interrompre l'accès à tout ou partie du service à tout moment,
                            sans préavis, notamment pour maintenance ou mise à jour.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
