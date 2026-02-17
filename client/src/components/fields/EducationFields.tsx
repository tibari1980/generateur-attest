import { GraduationCap, Award, BookOpen, ClipboardCheck, CalendarCheck } from "lucide-react";
import { AttestationFormData } from "../../types/attestation";

interface EducationFieldsProps {
    formData: AttestationFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function EducationFields({ formData, onChange }: EducationFieldsProps) {
    return (
        <>
            {/* Certificat de scolarité */}
            {formData.documentType === 'certificat_scolarite' && (
                <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                    <div className="form-section-header !mt-0 !mb-4">
                        <GraduationCap size={16} />
                        <span>Détails de la Scolarité</span>
                    </div>
                    <div className="full-width form-group">
                        <label htmlFor="establishment">Nom de l'établissement</label>
                        <input
                            id="establishment"
                            type="text"
                            name="establishment"
                            value={formData.establishment || ''}
                            onChange={onChange}
                            required
                            placeholder="Université de Paris"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-group">
                            <label htmlFor="level">Niveau / Classe</label>
                            <input
                                id="level"
                                type="text"
                                name="level"
                                value={formData.level || ''}
                                onChange={onChange}
                                required
                                placeholder="Master 2 Informatique"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="academicYear">Année Scolaire</label>
                            <input
                                id="academicYear"
                                type="text"
                                name="academicYear"
                                value={formData.academicYear || ''}
                                onChange={onChange}
                                required
                                placeholder="2023 - 2024"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Attestation d'assiduité */}
            {formData.documentType === 'attestation_assiduite' && (
                <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                    <div className="form-section-header !mt-0 !mb-4">
                        <CalendarCheck size={16} />
                        <span>Détails de Formation</span>
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="trainingTitle">Intitulé de la formation</label>
                        <input id="trainingTitle" type="text" name="trainingTitle" value={formData.trainingTitle || ""} onChange={onChange} placeholder="Ex: Formation React Avancée" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-group">
                            <label htmlFor="trainingHours">Nombre d'heures</label>
                            <input id="trainingHours" type="text" name="trainingHours" value={formData.trainingHours || ""} onChange={onChange} placeholder="Ex: 35h" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="assiduityRate">Taux d'assiduité (ex: 100%)</label>
                            <input id="assiduityRate" type="text" name="assiduityRate" value={formData.assiduityRate || ""} onChange={onChange} placeholder="100%" />
                        </div>
                    </div>
                </div>
            )}

            {/* Attestation de réussite */}
            {formData.documentType === 'attestation_reussite' && (
                <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                    <div className="form-section-header !mt-0 !mb-4">
                        <Award size={16} />
                        <span>Détails du Diplôme</span>
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="diplomaTitle">Intitulé du Diplôme / Titre</label>
                        <input id="diplomaTitle" type="text" name="diplomaTitle" value={formData.diplomaTitle || ""} onChange={onChange} placeholder="Ex: Master Informatique" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-group">
                            <label htmlFor="diplomaSpeciality">Spécialité / Option</label>
                            <input id="diplomaSpeciality" type="text" name="diplomaSpeciality" value={formData.diplomaSpeciality || ""} onChange={onChange} placeholder="Option IA" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="diplomaMention">Mention (Passable, Bien...)</label>
                            <input id="diplomaMention" type="text" name="diplomaMention" value={formData.diplomaMention || ""} onChange={onChange} placeholder="Bien" />
                        </div>
                    </div>
                </div>
            )}

            {/* Présence aux examens */}
            {formData.documentType === 'attestation_examen' && (
                <div className="p-4 border border-[var(--primary)]/20 rounded-lg bg-[var(--primary)]/5 mb-6">
                    <div className="form-section-header !mt-0 !mb-4">
                        <ClipboardCheck size={16} />
                        <span>Détails de l'Examen</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="examList">Liste des épreuves (Matières, Dates, Horaires)</label>
                        <textarea id="examList" name="examList" value={formData.examList || ""} onChange={onChange} rows={4} placeholder="Ex: Mathématiques (14h-17h)..." className="w-full bg-[var(--background)] border border-[var(--border)] rounded px-3 py-2 text-sm text-[var(--foreground)]" />
                    </div>
                </div>
            )}
        </>
    );
}
