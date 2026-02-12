"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
    {
        question: "Est-ce vraiment gratuit ?",
        answer: "Oui, JL Cloud est 100% gratuit pour les particuliers. Vous pouvez générer autant de documents que vous le souhaitez sans frais cachés."
    },
    {
        question: "Mes données sont-elles conservées ?",
        answer: "Non. Contrairement à d'autres services, nous ne stockons pas vos informations personnelles. La génération se fait en temps réel et les données sont supprimées dès que vous quittez la page."
    },
    {
        question: "Les documents sont-ils valables juridiquement ?",
        answer: "Nos modèles respectent les normes administratives françaises en vigueur. Cependant, l'exactitude des informations certifiées relève de votre responsabilité (signature sur l'honneur)."
    },
    {
        question: "Puis-je utiliser JL Cloud sur mobile ?",
        answer: "Absolument. Notre interface est entièrement optimisée pour smartphones et tablettes, vous permettant de générer vos documents où que vous soyez."
    }
];

export default function FAQPage() {
    return (
        <div className="pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Foire Aux Questions</h1>
                <p className="text-[var(--muted)]">Tout ce que vous devez savoir sur JL Cloud.</p>
            </motion.div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
                ))}
            </div>
        </div>
    );
}

function FAQItem({ question, answer, index }: { question: string, answer: string, index: number }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel overflow-hidden"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
            >
                <span className="font-semibold text-lg">{question}</span>
                {isOpen ? <Minus className="text-indigo-400" /> : <Plus className="text-gray-400" />}
            </button>
            {isOpen && (
                <div className="px-6 pb-6 text-gray-400 border-t border-white/5 pt-4">
                    {answer}
                </div>
            )}
        </motion.div>
    );
}
