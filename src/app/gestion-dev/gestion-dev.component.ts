import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { StorageService } from '../Services/storage.service';
import { UserServiceService } from '../Services/user-service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { User } from '../Models/User.model';
import { Site } from '../Models/Sites.model';
import { Maj } from '../Models/Maj.model';
import { Marque } from '../Models/Marque.model';
import { Dev } from '../Models/dev.model';
import { PageEvent } from '@angular/material/paginator';
import { VehiculeService } from '../Services/Vehicule-service.service';
import { Vehicule } from '../Models/Vehicule.model';
import { MajService } from '../Services/Maj-service.service';
import { DevService } from '../Services/dev-service.service';
import { MarqueService } from '../Services/marques-service.service';
import { Version } from '@angular/compiler';
import { versionService } from '../Services/version-service.service';
import { SiteService } from '../Services/sites-service.service';
import { MenuItem } from 'primeng/api';
import * as XLSX from 'xlsx';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-gestion-dev',
  templateUrl: './gestion-dev.component.html',
  styleUrls: ['./gestion-dev.component.css']
})
export class GestionDevComponent implements OnInit {




  filters: any;
  showAdminBoard: any;


  selectedMarque: any;
  selectedSite: any;

  selectedmaj: number =192;
  selectedVersion: any;
  selectedDevNumber: any;
  selectemodel: any;

  pageSize: number = 10;
  searchcritiria: any;
  debounceTimeout: any;
  dll: string = '';
  numberdev: number = 0;
  id: number = 0;
  marques: any;
  majs: Maj[] = [];
  sites: Site[] = [];
  users: User[] = [];
  devs: Dev[] = [];
  Vehicules: Vehicule[] = [];
  Vehicules1: Vehicule[] = [];
  showTable: any;
  pageEvent: PageEvent = new PageEvent;
  filteredDevs!: Dev[];
  filterId = '';
  showModeratorBoard = false;
  alldev: Dev[] = [];
  private roles: string[] = [];
  selectedProducts!: Dev;
  items: MenuItem[] | undefined;
  visible: boolean = false;

  loading: boolean = true;
  customDialogClass = 'no-shadow';
  activityValues: number[] = [0, 100];
  user!: User;
  visible1: boolean | undefined;
  dev!: Dev;
  @ViewChild('dllInput') dllInput: any;
  selectedDev: any;
  showRSBoard = false;
  showRSPouvoirBoard = false;
 
  constructor(private authService: UserServiceService,
    private storageService: StorageService,
    private router: Router, private http: HttpClient,
    private vehiculeService: VehiculeService,
    private devService: DevService,
    private versionService: versionService,
    private marqueService: MarqueService,
    private siteService: SiteService,
    private majService: MajService,
    private sanitizer: DomSanitizer,
  ) { 
    
  }


  ngOnInit(): void {


    //this.getAllDev();
    this.getAllMarques()
    this.getAllSite()
    this.getAllVersion()
    this.getDevsByVersion(192)
   // this.getAllVehicule()
    //this.getVehiculeByMarque()
   
    this.user = this.storageService.getUser();
   
    this.roles = this.user.roles;
    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    this.showRSBoard = this.roles.includes('ROLE_RS');
    this.showRSPouvoirBoard = this.roles.includes('ROLE_RSPOUVOIR');
  }

 
 
  onMarqueChange(event:any){
    console.log("deted selected marque",this.selectedMarque)
    this.vehiculeService.getVehichulesByMarque(this.selectedMarque).subscribe(
      (data: Vehicule[]) => {
        this.Vehicules1 = data;
      },
      (error: any) => {
        console.log("error", error);
      }
    )

  }
 
  

  showDialog(selectedDevNumber: any) {
    this.visible = true;

    this.vehiculeService.getVehichulesByDev(selectedDevNumber).subscribe(
      (data: Vehicule[]) => {
        this.Vehicules = data;
      },
      (error: any) => {
        console.log("error", error);
      });
  }
 
  editDev(data : any){
    const url = "edit-dev/"+data.id
    this.router.navigateByUrl(url)
  }

  clear(table: any) {
    table.clear();
  }
  getAllDev() {
    this.loading = true;
    this.devService.getAllDev().subscribe(res => {
      this.alldev = res
      console.log(this.alldev, "this devs");
      this.loading = false;


    })

  }

  exportToExcel() {
    // Prepare export data
    const exportData = this.alldev.map(dev => ({
      Id: dev.id,
      DevName: dev.devname,
      Dll: dev.dll,
      DevDuplique: dev.devDuplique,
      status: dev.etatdev ? dev.etatdev.nomEtatDev : ' ',
      CDCName: dev.cdc ? dev.cdc.nomCdc : '',
      CDCRef: dev.cdc ? dev.cdc.refCdc : '',
      EcuName: dev.ecu ? dev.ecu.nomEcu : '',
      Developer: dev.user ? dev.user.username : ' ',
      Family: dev.ecu?.famille ? dev.ecu?.famille?.nomfamille : ' ',
    }));

    // Convert data to Excel workbook
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

    // Export to Excel file
    XLSX.writeFile(workbook, 'exported_data.xlsx');
  }


  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  /**getAllVehicule() {
    this.vehiculeService.getAllVehicules().subscribe(
      (data5: Vehicule[]) => {
        this.Vehicules = data5;
        console.log(this.Vehicules, "vehicules ksit");
      },
      (error: any) => {
        console.log("error", error);
      }
    );
  }*/

  getDevsByVersion(selectedmaj: any) {
    this.loading = true;
   
    this.majService.getDevsByVersion(selectedmaj).subscribe(
      (data4: Dev[]) => {
        this.alldev = data4;

 
        this.devService.findDevsByUser(this.user.id).subscribe(
          (defaultDevs: Dev[]) => {

            this.alldev = this.alldev.concat(defaultDevs);

            console.log('getDevsByVersion', this.alldev);
           
            this.loading = false;
          },
          (error: any) => {
            console.log("error fetching default devs", error);
            this.loading = false;
          }
        );
      },
      (error: any) => {
        console.log("error fetching devs by version", error);
        this.loading = false;
      }
    );
  }

  getAllSite() {
    this.siteService.getAllsites().subscribe(
      (data2: Site[]) => {
        this.sites = data2;
        console.log(this.sites)
      },
      (error: any) => {
        console.log("error", error);
      }
    );
  }

  getAllVersion() {
    this.versionService.getAllversions().subscribe(
      (data1: Maj[]) => {
        this.majs = data1;
      },
      (error: any) => {
        console.log("error", error);
      }
    );
  }

  getAllMarques() {
    this.marqueService.getAllMarques().subscribe(
      (data: any) => {
        this.marques = data;
      console.log(this.marques);
            },
      (error) => {
        console.log("error", error);
      }
    );
  }

  showVehicles(selectedDevNumber: any) {

    this.vehiculeService.getVehichulesByDev(selectedDevNumber).subscribe(
      (data: Vehicule[]) => {
        this.Vehicules = data;
      },
      (error: any) => {
        console.log("error", error);
      }
    )

  }
  /** 
    filterDevs() {
      this.filteredDevs = this.devs.filter((dev) => {
        let include = true;
        for (const key in this.filters) {
          if (this.filters.hasOwnProperty(key)) {
            const filterValue = this.filters[key].toString().toLowerCase();
            const devValue = dev?.id?.toString().toLowerCase() || '';
  
            include = include && (devValue.includes(filterValue) || filterValue === '');
          }
        }
        return include;
      });
    }*/

  searchDevsByFilters() {
    const marqueId = this.selectedMarque;
    const siteId = this.selectedSite;
    const idmaj = this.selectedmaj;
    const modelCode = this.selectemodel;
    console.log("Selected Marque ID:", this.selectedMarque);
    console.log("Selected version ID:", this.selectedmaj);
    console.log("Selected site ID:", this.selectedSite);
    console.log("Selected vehicule ID:", this.selectemodel);
    this.loading = true;

    this.devService.findDevsByCriteria(marqueId,idmaj, siteId, modelCode).subscribe(
      (data4: Dev[]) => {
        this.alldev = data4;
       console.log(this.alldev)
        this.loading = false;
       
      },
      (error) => {
        this.loading=false;
        // Handle error
        console.error('Error fetching developers:', error);
      }
    );
  }

  toggleTable() {
    this.showTable = !this.showTable;
  }
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize
  }
  reset() {

    this.selectedMarque = 0;
    this.selectedSite = 0;
    this.selectedVersion = 0;
    this.selectemodel = 0;

    // ... etc.
  }



}
