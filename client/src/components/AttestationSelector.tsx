"use client";

import { useState, useMemo } from "react";
import { Search, Star, Sparkles, ArrowRight, X } from "lucide-react";
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

    return (
        <div className="attestation-selector animate-fade-in">

            {/* Search Bar */}
            <div className="selector-search-wrapper">
                <Search className="selector-search-icon" size={18} />
                <input
                    type="text"
                    placeholder="Rechercher un document... (ex: travail, hébergement)"
                    className="selector-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Rechercher un document"
                />
                {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="selector-search-clear" aria-label="Effacer la recherche">
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* Popular Section */}
            {searchQuery === "" && activeCategory === "all" && (
                <div className="selector-section animate-fade-in">
                    <div className="selector-section-header">
                        <Sparkles size={16} className="selector-section-icon" />
                        <span>Les plus demandés</span>
                    </div>
                    <div className="selector-popular-grid">
                        {popularAttestations.map((att, i) => (
                            <PopularCard
                                key={att.id}
                                attestation={att}
                                isActive={currentType === att.id}
                                onClick={() => onSelect(att.id)}
                                index={i}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Divider */}
            <div className="selector-divider" />

            {/* Category Filters */}
            <div className="selector-categories">
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
            </div>

            {/* Results */}
            {filteredAttestations.length > 0 ? (
                <div className="selector-results-grid">
                    {filteredAttestations.map((att, i) => (
                        <ResultCard
                            key={att.id}
                            attestation={att}
                            isActive={currentType === att.id}
                            onClick={() => onSelect(att.id)}
                            categoryTitle={getCategoryTitle(att.category)}
                            index={i}
                        />
                    ))}
                </div>
            ) : (
                <div className="selector-empty">
                    <div className="selector-empty-icon">
                        <Search size={32} />
                    </div>
                    <p>Aucun document ne correspond à « {searchQuery} »</p>
                    <button
                        onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                        className="selector-empty-reset"
                    >
                        Réinitialiser les filtres
                    </button>
                </div>
            )}
        </div>
    );
}

/* ─── Popular Card (compact, highlighted) ─── */
function PopularCard({ attestation, isActive, onClick, index }: {
    attestation: AttestationType; isActive: boolean; onClick: () => void; index: number;
}) {
    const Icon = attestation.icon;
    return (
        <button
            onClick={onClick}
            className={`selector-popular-card ${isActive ? 'active' : ''}`}
            style={{ animationDelay: `${index * 0.06}s` }}
            aria-label={`Sélectionner ${attestation.title}`}
        >
            <div className="selector-popular-card-icon">
                <Icon size={18} />
            </div>
            <span className="selector-popular-card-title">{attestation.title}</span>
            <ArrowRight size={14} className="selector-popular-card-arrow" />
        </button>
    );
}

/* ─── Result Card (detailed) ─── */
function ResultCard({ attestation, isActive, onClick, categoryTitle, index }: {
    attestation: AttestationType; isActive: boolean; onClick: () => void; categoryTitle: string; index: number;
}) {
    const Icon = attestation.icon;
    return (
        <button
            onClick={onClick}
            className={`selector-result-card ${isActive ? 'active' : ''}`}
            style={{ animationDelay: `${index * 0.05}s` }}
            aria-label={`Sélectionner ${attestation.title}`}
        >
            <div className="selector-result-card-top">
                <div className={`selector-result-card-icon ${isActive ? 'active' : ''}`}>
                    <Icon size={22} />
                </div>
                <span className="selector-result-card-badge">{categoryTitle}</span>
            </div>
            <h4 className="selector-result-card-title">{attestation.title}</h4>
            <p className="selector-result-card-desc">{attestation.description}</p>
            <div className="selector-result-card-footer">
                <span>Sélectionner</span>
                <ArrowRight size={14} />
            </div>
        </button>
    );
}
