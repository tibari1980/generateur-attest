"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Linkedin, Twitter, Github } from "lucide-react";
import { useState } from "react";


export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const { name, email, subject, message } = formState;

        // Construct mailto link
        const mailtoLink = `mailto:tibarinewdzign@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;

        // Open email client
        window.location.href = mailtoLink;

        // Show success state
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSubmitting(false);
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen pt-20 pb-10">
            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none z-[-1]">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Contactez <span className="text-gradient">JL Cloud</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Une question ? Une suggestion ? Notre équipe est là pour vous aider.
                        Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="glass-panel p-8">
                            <h3 className="text-2xl font-bold mb-6">Nos Coordonnées</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg">Email</h4>
                                        <p className="text-gray-400">contact@jdcloud.com</p>
                                        <p className="text-gray-500 text-sm mt-1">Réponse sous 24h</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg">Bureau</h4>
                                        <p className="text-gray-400">123 Avenue de l'Innovation</p>
                                        <p className="text-gray-400">75001 Paris, France</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg">Téléphone</h4>
                                        <p className="text-gray-400">+33 1 23 45 67 89</p>
                                        <p className="text-gray-500 text-sm mt-1">Lun-Ven, 9h-18h</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-800">
                                <h4 className="font-semibold mb-4">Suivez-nous</h4>
                                <div className="flex gap-4">
                                    <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-indigo-600 transition-colors">
                                        <Linkedin size={20} />
                                    </a>
                                    <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-indigo-600 transition-colors">
                                        <Twitter size={20} />
                                    </a>
                                    <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-indigo-600 transition-colors">
                                        <Github size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="glass-panel p-8">
                            <h3 className="text-2xl font-bold mb-6">Envoyez-nous un message</h3>

                            {submitted ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                                        <Send size={32} />
                                    </div>
                                    <h4 className="text-2xl font-bold text-white mb-2">Message envoyé !</h4>
                                    <p className="text-gray-400">
                                        Merci de nous avoir contactés. Nous reviendrons vers vous très prochainement.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSubmitted(false);
                                            setFormState({ name: "", email: "", subject: "", message: "" });
                                        }}
                                        className="mt-6 text-indigo-400 hover:text-indigo-300 font-medium"
                                    >
                                        Envoyer un autre message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-400">Nom complet</label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formState.name}
                                                onChange={handleChange}
                                                className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
                                                placeholder="Jean Dupont"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-400">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formState.email}
                                                onChange={handleChange}
                                                className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
                                                placeholder="jean@exemple.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Sujet</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            required
                                            value={formState.subject}
                                            onChange={handleChange}
                                            className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
                                            placeholder="Comment pouvons-nous vous aider ?"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Message</label>
                                        <textarea
                                            name="message"
                                            required
                                            rows={5}
                                            value={formState.message}
                                            onChange={handleChange}
                                            className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                                            placeholder="Votre message..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full btn btn-primary py-3 flex items-center justify-center gap-2 group"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <span>Envoyer le message</span>
                                                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
