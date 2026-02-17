import { Home, Receipt, FileCheck, LogOut } from "lucide-react";
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
                    <div className="form-section-header !mt-0 !mb-4">
                        <Home size={16} />
                        <span>Détails de l'Hébergeant</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-group">
                            <label htmlFor="hostDob">Date de naissance de l'hébergeant</label>
                            <input id="hostDob" type="date" name="hostDob" value={formData.hostDob || ""} onChange={onChange} style={{ colorScheme: 'dark' }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hostPob">Lieu de naissance de l'hébergeant</label>
                            <input id="hostPob" type="text" name="hostPob" value={formData.hostPob || ""} onChange={onChange} placeholder="Ville..." />
                        </div>
                    </div>
                </div>
            )}

            {/* Quittance de loyer */}
            {formData.documentType === 'quittance_loyer' && (
                <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                    <div className="form-section-header !mt-0 !mb-4">
                        <Receipt size={16} />
                        <span>Détails de la Quittance</span>
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="rentPeriod">Période concernée (ex: Janvier 2024)</label>
                        <input id="rentPeriod" type="text" name="rentPeriod" value={formData.rentPeriod || ""} onChange={onChange} placeholder="Mois / Année" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-group">
                            <label htmlFor="rentAmount">Montant du loyer nu (€)</label>
                            <input id="rentAmount" type="number" name="rentAmount" value={formData.rentAmount || ""} onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="chargesAmount">Provisions pour charges (€)</label>
                            <input id="chargesAmount" type="number" name="chargesAmount" value={formData.chargesAmount || ""} onChange={onChange} />
                        </div>
                    </div>
                    <div className="form-group mt-4">
                        <label htmlFor="paymentDate">Date du paiement</label>
                        <input id="paymentDate" type="date" name="paymentDate" value={formData.paymentDate || ""} onChange={onChange} style={{ colorScheme: 'dark' }} />
                    </div>
                </div>
            )}

            {/* Loyer à jour */}
            {formData.documentType === 'attestation_loyer_ajour' && (
                <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                    <div className="form-section-header !mt-0 !mb-4">
                        <FileCheck size={16} />
                        <span>Détails de Location</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-group">
                            <label htmlFor="entryDate">Date d'entrée dans les lieux</label>
                            <input id="entryDate" type="date" name="entryDate" value={formData.entryDate || ""} onChange={onChange} style={{ colorScheme: 'dark' }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="currentRentAmount">Montant du loyer actuel (€)</label>
                            <input id="currentRentAmount" type="number" name="currentRentAmount" value={formData.currentRentAmount || ""} onChange={onChange} />
                        </div>
                    </div>
                </div>
            )}

            {/* Fin de bail */}
            {formData.documentType === 'attestation_fin_bail' && (
                <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                    <div className="form-section-header !mt-0 !mb-4">
                        <LogOut size={16} />
                        <span>Détails de fin de bail</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="form-group">
                            <label htmlFor="departureDate">Date de départ effective</label>
                            <input id="departureDate" type="date" name="departureDate" value={formData.departureDate || ""} onChange={onChange} style={{ colorScheme: 'dark' }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="paymentStatus">Situation des paiements</label>
                            <select id="paymentStatus" name="paymentStatus" value={formData.paymentStatus || "Pas de dettes"} onChange={onChange}>
                                <option value="Pas de dettes">Tous les comptes sont soldés</option>
                                <option value="En cours">Décompte final en cours</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="newAddress">Nouvelle adresse de l'ancien locataire</label>
                        <input id="newAddress" type="text" name="newAddress" value={formData.newAddress || ""} onChange={onChange} placeholder="Nouveau domicile..." />
                    </div>
                </div>
            )}
        </>
    );
}
