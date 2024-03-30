import { Vehicule } from "./Vehicule.model";

export interface Marque {
  idMarque: number; 
    nomMarque: string;
    vehicules:Vehicule[];
  }