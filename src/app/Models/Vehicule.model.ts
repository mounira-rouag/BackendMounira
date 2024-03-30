import { Marque } from "./Marque.model";
import { Dev } from "./dev.model";

export interface Vehicule {
    codeVeh: number;
    nomVeh: string;
    nominterne: string;
    testGlobal: boolean;
    msgDiag?: string; 
    grpMarque: string; 
    from?: string; 
    to?: string; 
    onlyElec: boolean;
    avertissElec: boolean;
    marque: Marque; 
    devs?: Dev[]; 
  }