import { Famille } from "./famille.model";

export interface Ecu {
    idEcu: number;
    nomEcu: string;
    typeInj: string;
    phraseTypeInj: string;
    famille: Famille; // Assuming Famille model is already defined
  }