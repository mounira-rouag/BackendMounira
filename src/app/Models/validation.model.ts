import { Dev } from "./dev.model";

export interface Validation {
    idValid: number,
     typeValid: string,
     dateValid: string,
     etatValid: string,
     idVer: number,
     devs:Dev[]
  }