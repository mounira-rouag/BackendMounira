import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  @Injectable({
    providedIn: 'root'
  })
  
  export class ValidationService{
    constructor(private http: HttpClient) { }
   
    getValidationByDev(iddev: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/validation/by-dev/${iddev}`, { responseType: 'json' });
      }
  }