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
  
  export class MajService{
    constructor(private http: HttpClient) { }

    getDevsByVersion(idmaj: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/dev/maj-version/${idmaj}`, { responseType: 'json' });
      }
      getMajById(idmaj: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/dev/maj/${idmaj}`, { responseType: 'json' });
      }
  }