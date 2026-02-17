export interface AttestationFormData {
    documentType: string;
    civility: string;
    nom: string;
    prenom: string;
    dateNaissance: string;
    lieuNaissance: string;
    email: string;
    poste: string;
    entreprise: string;
    address?: string;
    representativeName?: string;
    establishment?: string;
    level?: string;
    academicYear?: string;
    recommenderPosition?: string;
    relation?: string;
    hostDob?: string;
    hostPob?: string;
    hostedDob?: string;
    hostedPob?: string;
    dateDebut: string;
    dateFin?: string;
    signatureDate?: string;

    // Partner fields for Vie Commune
    partnerName?: string;
    partnerFirstname?: string;
    partnerDob?: string;
    partnerPob?: string;
    nationality?: string;
    partnerNationality?: string;
    relationshipType?: string; // mariés, pacsés, concubins
    city?: string;

    // Financial Support
    amount?: string;
    duration?: string;
    beneficiaryName?: string;
    beneficiaryFirstName?: string;

    // Non-Polygamy
    maritalStatus?: string;
    marriageDate?: string;

    // Concordance
    doc1Type?: string;
    doc1Name?: string;
    doc1Firstname?: string;
    doc2Type?: string;
    doc2Name?: string;
    doc2Firstname?: string;
    discordanceType?: string;

    // Work / Contract specific
    contractType?: string;
    trialPeriod?: string;
    salaryAmount?: string;
    salaryType?: string;
    salaryFrequency?: string;
    salaryGross?: string;
    salaryNet?: string;
    bonuses?: string;
    remoteDays?: string;
    remoteFixedDays?: string;
    remoteLocation?: string;

    // Personal / Judicial
    profession?: string;
    witnessLink?: string;
    facts?: string;
    mandataireNom?: string;
    mandatairePrenom?: string;
    mandataireAdresse?: string;
    mandateObject?: string;
    mandateDuration?: string;
    exPartnerNom?: string;
    exPartnerPrenom?: string;
    exPartnerAdresse?: string;
    separationDate?: string;

    // Education
    trainingTitle?: string;
    trainingHours?: string;
    assiduityRate?: string;
    diplomaTitle?: string;
    diplomaSpeciality?: string;
    diplomaSession?: string;
    diplomaMention?: string;
    examList?: string;

    // Domicile / Rent
    rentPeriod?: string;
    rentAmount?: string;
    chargesAmount?: string;
    paymentDate?: string;
    entryDate?: string;
    currentRentAmount?: string;
    departureDate?: string;
    paymentStatus?: string;
    newAddress?: string;
}
