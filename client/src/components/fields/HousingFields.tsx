import { Home, Receipt, ShieldCheck, LogOut } from "lucide-react";
import { AttestationFormData } from "../../types/attestation";

interface HousingFieldsProps {
    formData: AttestationFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function HousingFields({ formData, onChange }: HousingFieldsProps) {
    return (
        <>
            {/* Hébergement specifics (if needed beyond common address/host) */}
            {formData.documentType === 'attestation_hebergement' && (
                <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)] mb-4 flex items-center gap-2">
                        <Home size={16} />
                        Détails de l'Hébergeant
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-group">
                            <label htmlFor="hostDob">Date de naissance de l'hébergeant</label>
                            <input id="hostDob" type="date" name="hostDob" value={formData.hostDob || ""} onChange={onChange} style={{ colorScheme: 'dark' }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hostPob">Lieu de naissance de l'hébergeant</label>
                            <input id="hostPob" type="text" name="hostPob" value={formData.hostPob || ""} onChange={onChange} placeholder="Ville" />
                        </div>
                    </div>
                </div>
            )}

            {/* Quittance de loyer */}
            {formData.documentType === 'quittance_loyer' && (
                <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)] mb-4 flex items-center gap-2">
                        <Receipt size={16} />
                        Détails de la Quittance
                    </h3>
                    <div className="form-group mb-4">
                        <label htmlFor="rentPeriod">Période concernée (ex: Janvier 2024)</label>
                        <input id="rentPeriod" type="text" name="rentPeriod" value={formData.rentPeriod || ""} onChange={onChange} placeholder="Mois / Année" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="form-group">
                            <label htmlFor="rentAmount">Loyer Nu (€)</label>
                            <input id="rentAmount" type="number" name="rentAmount" value={formData.rentAmount || ""} onChange={onChange} placeholder="0.00" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="chargesAmount">Charges (€)</label>
                            <input id="chargesAmount" type="number" name="chargesAmount" value={formData.chargesAmount || ""} onChange={onChange} placeholder="0.00" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="paymentDate">Date de paiement</label>
                            <input id="paymentDate" type="date" name="paymentDate" value={formData.paymentDate || ""} onChange={onChange} style={{ colorScheme: 'dark' }} />
                        </div>
                    </div>
                </div>
            )}

            {/* Loyer à jour */}
            {formData.documentType === 'attestation_loyer_ajour' && (
                <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)] mb-4 flex items-center gap-2">
                        <ShieldCheck size={16} />
                        État Locatif
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-group">
                            <label htmlFor="entryDate">Date d'entrée dans les lieux</label>
                            <input id="entryDate" type="date" name="entryDate" value={formData.entryDate || ""} onChange={onChange} style={{ colorScheme: 'dark' }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="currentRentAmount">Loyer Mensuel CC (€)</label>
                            <input id="currentRentAmount" type="number" name="currentRentAmount" value={formData.currentRentAmount || ""} onChange={onChange} placeholder="Ex: 850" />
                        </div>
                    </div>
                </div>
            )}

            {/* Fin de bail */}
            {formData.documentType === 'attestation_fin_bail' && (
                <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)] mb-4 flex items-center gap-2">
                        <LogOut size={16} />
                        Départ du Locataire
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="form-group">
                            <label htmlFor="departureDate">Date de départ effective</label>
                            <input id="departureDate" type="date" name="departureDate" value={formData.departureDate || ""} onChange={onChange} style={{ colorScheme: 'dark' }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="paymentStatus">Situation du compte</label>
                            <input id="paymentStatus" type="text" name="paymentStatus" value={formData.paymentStatus || "Solde à jour"} onChange={onChange} placeholder="Ex: Solde à jour, reliquat de..." />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="newAddress">Nouvelle adresse (Optionnel)</label>
                        <input id="newAddress" type="text" name="newAddress" value={formData.newAddress || ""} onChange={onChange} placeholder="Adresse de destination..." />
                    </div>
                </div>
            )}
        </>
    );
}
