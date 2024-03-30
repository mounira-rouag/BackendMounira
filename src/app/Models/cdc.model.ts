import { Dev } from "./dev.model";
import { Reverse } from "./reverse.model";

export interface CDC {
    idCdc: number;
    nomCdc: string;
    refCdc: string;
    indCdc: string;
    creation: Date; 
    signatureOk: boolean;
    refCdcArdia: string;
    dev: Dev[]; 
    reverse: Reverse; 
  }