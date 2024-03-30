import { Dev } from "./dev.model";

export interface User {
  id:number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    roles: string[]; 
    site: number; 
   devs:Dev[];
  }