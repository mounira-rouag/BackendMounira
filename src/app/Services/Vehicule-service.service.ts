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
  
  export class VehiculeService{
    constructor(private http: HttpClient) { }

    getAllVehicules(): Observable<any> {
        return this.http.get<any>( `${environment.apiUrl}/vehicule/all`, { responseType: 'json' });
      }
      getVehichulesByDev(devId:number): Observable<any> {
        return this.http.get<any>( `${environment.apiUrl}/vehicule/by-dev/${devId}`, { responseType: 'json' });
      }
      getVehichulesByMarque(marqueId:any): Observable<any> {
        return this.http.get<any>( `${environment.apiUrl}/vehicule/by-grmarque?grpmarque=${marqueId}`);
      }

  }