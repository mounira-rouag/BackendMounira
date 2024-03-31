import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, forkJoin, map, throwError } from "rxjs";
import { environment } from "src/environments/environment.development";
import { Dev } from "../Models/dev.model";
import { MajService } from "./Maj-service.service";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  @Injectable({
    providedIn: 'root'
  })
  
  export class DevService {
    constructor(private http: HttpClient,
      private majService: MajService) { }
    getAllDev(): Observable<any> {
        return this.http.get<any>( `${environment.apiUrl}/dev/all`, { responseType: 'json' });
      }
      getDevsByDll(dll: string): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/dev/dll-id`, { params: { dll } });
      }
      getDevsById(id: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/dev/${id}`, { responseType: 'json' });
      }
      findDevsByMarque(marqueId: any): Observable<any[]> {
        return this.http.get<any[]>(`${environment.apiUrl}/dev/by-marque/${marqueId}`);
      }
      findDevsByUser(userId: number): Observable<any[]> {
        return this.http.get<any[]>(`${environment.apiUrl}/dev/user/${userId}`);
      }
      findDevsByVersion(idmaj: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/dev/maj-version/${idmaj}`, { responseType: 'json' });
      }
      

      findDevsByCriteria(marqueId?: string, idmaj?: number, siteId?: number, codeVeh?:number ): Observable<Dev[]> {
        // Combine multiple observables using forkJoin
        const devStreams: Observable<Dev[]>[] = [];
      
        if (marqueId) {
          devStreams.push(this.findDevsByMarque(marqueId));
         
        }
      
        if (idmaj) {
          devStreams.push(this.majService.getDevsByVersion(idmaj));
        }
      
        if (siteId) {
          devStreams.push(this.findDevsBySite(siteId));
         

        }
      
        if (codeVeh) {
          devStreams.push(this.findDevsByVehicule(codeVeh)); 
        }
      if (devStreams.length===0){
        return this.getAllDev();
      }
       
      console.log (devStreams);
      
      return forkJoin(devStreams).pipe(
        map(devArrays => {
          const distinctDevs: Dev[] = [];
          const devSet = new Set<number>(); // Set to track unique Dev IDs
    
          
          devArrays.flat().forEach(dev => {
            if (dev &&!devSet.has(dev.id)) {
              devSet.add(dev.id);
              distinctDevs.push(dev);
            }
          });

          const filteredDevs = distinctDevs.filter(dev =>
            (!marqueId || dev.vehicules.find(vehicule => vehicule.grpMarque == marqueId)) &&
            (!idmaj || dev.maj.idMaj == idmaj) &&
            (!siteId || dev.user?.site == siteId) &&
            (!codeVeh || dev.vehicules.find(vehicle => vehicle.codeVeh == codeVeh))
          );
          
    
          return filteredDevs;
        }),
        catchError((error) => {
          console.error('Error occurred while fetching distinct devs by criteria:', error);
          return throwError('Error occurred while fetching distinct devs by criteria');
        })
      );
      
           /** 
             return alldev.filter(
              (dev) =>
                 (!marqueId || dev?.vehicules?.find(vehicule=>vehicule.marque.idMarque === marqueId) &&
              (!idmaj || dev.maj.idMaj === idmaj) &&
              (!siteId || dev.user.siteid === siteId) &&
              (!codeVeh ||
                 dev.vehicules?.find(vehicle => vehicle.codeVeh === codeVeh)) // Approach 2
              )
            );*/

      /**return alldev
          }),
          catchError((error) => {
            console.error('Error occurred while fetching devs by criteria:', error);
            return throwError('Error occurred while fetching devs by criteria');
          })
        );*/
      }


    findDevsBySite(siteId: number): Observable<any[]> {
      return this.http.get<any[]>(`${environment.apiUrl}/site/${siteId}`);
    }

    findDevsByVehicule(codeVeh: number): Observable<any[]> {
      return this.http.get<any[]>(`${environment.apiUrl}/dev/veh-model/${codeVeh}`);
    }
    registerDev(DevRequest: any): Observable<any> {
      return this.http.post<any>(`${environment.apiUrl}/dev/create`, DevRequest);
    } 
    
    duplicateDev(originalDev: Dev): Observable<Dev> {
      // Assuming originalDev contains the data of the original row
      return this.http.post<Dev>(`${environment.apiUrl}/dev/add`, originalDev);
    }
    updateDev(id: number, updatedDev: Dev): Observable<Dev> {
      return this.http.put<Dev>(`${environment.apiUrl}/update/${id}`, updatedDev);
    }
  }