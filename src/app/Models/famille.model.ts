import { Ecu } from "./ecu.model";

export interface Famille {
  idFamille: number;
  nomfamille: string;
  description: string;
  phrase: string;
  descrAnglais: string;
  ordre: number; // Assuming the ordre property is a number in your Java entity
  guidedMethFilter: boolean;
  sparePartsFilter: boolean;
  ecu: Ecu[]; // Assuming Ecu model is already defined
}