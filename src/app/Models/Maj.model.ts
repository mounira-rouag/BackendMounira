export interface Maj {
    idMaj: number;
    nomMaj: string;
    typeMaj: string | null;  // Allow null for optional typeMaj
    statusMaj: string | null;  // Allow null for optional statusMaj
    ordre: number;
    enCours: boolean | null;    // Allow null for optional enCours
    atalMaj: string | null;    // Allow null for optional atalMaj
    nomMajOffice: string | null; // Allow null for optional nomMajOffice
  }