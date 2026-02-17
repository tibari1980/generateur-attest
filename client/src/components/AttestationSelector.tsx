"use client";

import { useState, useMemo } from "react";
import { Search, Star, Sparkles, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ATTESTATIONS, ATTESTATION_CATEGORIES, AttestationType } from "@/constants/attestations";

interface AttestationSelectorProps {
    onSelect: (type: string) => void;
    currentType: string;
}

export default function AttestationSelector({ onSelect, currentType }: AttestationSelectorProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");

    const popularAttestations = useMemo(() =>
        ATTESTATIONS.filter(a => a.isPopular),
        []);

    const filteredAttestations = useMemo(() => {
        return ATTESTATIONS.filter(a => {
            const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === "all" || a.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    const getCategoryTitle = (catId: string) => {
        return ATTESTATION_CATEGORIES.find(c => c.id === catId)?.title || catId;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="attestation-selector">
            {/* Search Bar */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="selector-search-wrapper"
            >
                <Search className="selector-search-icon" size={18} />
                <input
                    type="text"
                    placeholder="Rechercher un document... (ex: travail, hébergement)"
                    className="selector-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Rechercher un document"
                />
                <AnimatePresence>
                    {searchQuery && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={() => setSearchQuery("")}
                            className="selector-search-clear"
                            aria-label="Effacer la recherche"
                        >
                            <X size={16} />
                        </motion.button>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Popular Section */}
            <AnimatePresence mode="wait">
                {searchQuery === "" && activeCategory === "all" && (
                    <motion.div
                        key="popular-section"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="selector-section overflow-hidden"
                    >
                        <div className="selector-section-header">
                            <Sparkles size={16} className="selector-section-icon" />
                            <span>Les plus demandés</span>
                        </div>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="selector-popular-grid"
                        >
                            {popularAttestations.map((att, i) => (
                                <motion.div key={att.id} variants={itemVariants}>
                                    <PopularCard
                                        attestation={att}
                                        isActive={currentType === att.id}
                                        onClick={() => onSelect(att.id)}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Divider */}
            <div className="selector-divider" />

            {/* Category Filters */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="selector-categories"
            >
                {ATTESTATION_CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const count = cat.id === 'all'
                        ? ATTESTATIONS.length
                        : ATTESTATIONS.filter(a => a.category === cat.id).length;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`selector-category-btn ${activeCategory === cat.id ? 'active' : ''} focus:ring-2 focus:ring-[var(--primary)] focus:outline-none`}
                            aria-label={`Filtrer par catégorie ${cat.title}`}
                            aria-pressed={activeCategory === cat.id}
                            aria-current={activeCategory === cat.id ? 'true' : undefined}
                        >
                            {Icon && <Icon size={14} aria-hidden="true" />}
                            <span>{cat.title}</span>
                            <span className="selector-category-count" aria-hidden="true">{count}</span>
                        </button>
                    );
                })}
            </motion.div>

            {/* Results */}
            <AnimatePresence mode="popLayout">
                {filteredAttestations.length > 0 ? (
                    <motion.div
                        key="results-grid"
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="selector-results-grid"
                    >
                        {filteredAttestations.map((att) => (
                            <motion.div
                                key={att.id}
                                variants={itemVariants}
                                layout
                            >
                                <ResultCard
                                    attestation={att}
                                    isActive={currentType === att.id}
                                    onClick={() => onSelect(att.id)}
                                    categoryTitle={getCategoryTitle(att.category)}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="empty-state"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="selector-empty"
                    >
                        <div className="selector-empty-icon text-[var(--primary)] opacity-40">
                            <Search size={48} strokeWidth={1.5} />
                        </div>
                        <p className="text-lg font-medium">Aucun document ne correspond à « {searchQuery} »</p>
                        <p className="text-[var(--muted)] text-sm mb-6">Essayez avec un autre mot-clé ou changez de catégorie.</p>
                        <button
                            onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                            className="selector-empty-reset"
                        >
                            Réinitialiser les filtres
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ─── Popular Card ─── */
function PopularCard({ attestation, isActive, onClick }: {
    attestation: AttestationType; isActive: boolean; onClick: () => void;
}) {
    const Icon = attestation.icon;
    return (
        <button
            onClick={onClick}
            className={`selector-popular-card group relative overflow-hidden ${isActive ? 'active' : ''}`}
            aria-label={`Sélectionner ${attestation.title}`}
        >
            <div className="selector-popular-card-icon group-hover:scale-110 transition-transform duration-300">
                <Icon size={18} />
            </div>
            <span className="selector-popular-card-title">{attestation.title}</span>
            <ArrowRight size={14} className="selector-popular-card-arrow transition-transform group-hover:translate-x-1" />
        </button>
    );
}

/* ─── Result Card ─── */
function ResultCard({ attestation, isActive, onClick, categoryTitle }: {
    attestation: AttestationType; isActive: boolean; onClick: () => void; categoryTitle: string;
}) {
    const Icon = attestation.icon;
    return (
        <button
            onClick={onClick}
            className={`selector-result-card group ${isActive ? 'active' : ''}`}
            aria-label={`Sélectionner ${attestation.title}`}
        >
            <div className="selector-result-card-top">
                <div className={`selector-result-card-icon group-hover:scale-110 transition-transform duration-300 ${isActive ? 'active' : ''}`}>
                    <Icon size={22} />
                </div>
                <span className="selector-result-card-badge">{categoryTitle}</span>
            </div>
            <h4 className="selector-result-card-title group-hover:text-[var(--primary)] transition-colors">{attestation.title}</h4>
            <p className="selector-result-card-desc line-clamp-2">{attestation.description}</p>
            <div className="selector-result-card-footer">
                <span className="group-hover:mr-2 transition-all">Sélectionner</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
        </button>
    );
}
