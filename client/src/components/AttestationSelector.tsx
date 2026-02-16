"use client";

import { useState, useMemo } from "react";
import { Search, Grid, List, Star, Filter } from "lucide-react";
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

    return (
        <div className="w-full space-y-8 animate-fade-in">
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={18} />
                    <input
                        type="text"
                        placeholder="Rechercher une attestation... (ex: travail, hébergement)"
                        className="w-full pl-10 pr-4 py-3 bg-[var(--card)] border border-white/10 rounded-xl focus:border-[var(--primary)] transition-all outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Popular Section - Only show when no search/filter or active 'all' */}
            {searchQuery === "" && activeCategory === "all" && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-amber-400 font-medium px-1">
                        <Star size={18} fill="currentColor" />
                        <h3>Les plus utilisées</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {popularAttestations.map((att) => (
                            <AttestationCard
                                key={att.id}
                                attestation={att}
                                isActive={currentType === att.id}
                                onClick={() => onSelect(att.id)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Categories & Filtered List */}
            <div className="space-y-6">
                <div className="flex flex-wrap gap-2 pb-2">
                    {ATTESTATION_CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.id
                                        ? "bg-[var(--primary)] text-white"
                                        : "bg-white/5 text-[var(--muted)] hover:bg-white/10"
                                    }`}
                            >
                                {Icon && <Icon size={14} />}
                                {cat.title}
                            </button>
                        );
                    })}
                </div>

                {filteredAttestations.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredAttestations.map((att) => (
                            <AttestationCard
                                key={att.id}
                                attestation={att}
                                isActive={currentType === att.id}
                                onClick={() => onSelect(att.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center space-y-4 bg-white/5 rounded-2xl border border-dashed border-white/10">
                        <p className="text-[var(--muted)]">Aucune attestation ne correspond à votre recherche.</p>
                        <button
                            onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                            className="text-[var(--primary)] hover:underline text-sm"
                        >
                            Réinitialiser les filtres
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function AttestationCard({ attestation, isActive, onClick }: { attestation: AttestationType, isActive: boolean, onClick: () => void }) {
    const Icon = attestation.icon;

    return (
        <button
            onClick={onClick}
            className={`flex flex-col p-5 rounded-2xl text-left transition-all group border ${isActive
                    ? "bg-[var(--primary)]/10 border-[var(--primary)] shadow-[0_0_20px_rgba(37,99,235,0.1)]"
                    : "bg-[var(--card)] border-white/10 hover:border-white/20 hover:translate-y-[-2px]"
                }`}
        >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors ${isActive ? "bg-[var(--primary)] text-white" : "bg-white/5 text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white"
                }`}>
                <Icon size={20} />
            </div>
            <h4 className="font-semibold text-white mb-1 group-hover:text-[var(--primary)] transition-colors line-clamp-1">{attestation.title}</h4>
            <p className="text-sm text-[var(--muted)] line-clamp-2 leading-relaxed">{attestation.description}</p>
        </button>
    );
}
