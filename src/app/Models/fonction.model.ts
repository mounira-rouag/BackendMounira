import { DevService } from "../Services/dev-service.service";
import { Dev } from "./dev.model";

export interface Fonction {
    IdFonction: number;
    NomFonction: string;
    Ordre: number;
    CodeDico: number;
    DescrAnglais: string;
    devs:Dev[];
  }