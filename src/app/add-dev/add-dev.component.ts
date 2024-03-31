import { ChangeDetectorRef, Component } from '@angular/core';
import { Dev } from '../Models/dev.model';
import { versionService } from '../Services/version-service.service';
import { Maj } from '../Models/Maj.model';
import { UserServiceService } from '../Services/user-service.service';
import { Vehicule } from '../Models/Vehicule.model';
import { VehiculeService } from '../Services/Vehicule-service.service';
import { SiteService } from '../Services/sites-service.service';
import { Site } from '../Models/Sites.model';
import { DevService } from '../Services/dev-service.service';
import { ThemePalette } from '@angular/material/core';
import { Reverse } from '../Models/reverse.model';
import { ReverseService } from '../Services/reverse-service.service';
import { ActivatedRoute } from '@angular/router';
import { ValidationService } from '../Services/validation-service.sevice';
import { CDCService } from '../Services/cdc-service.service';
import { CDC } from '../Models/cdc.model';
import { MessageService } from 'primeng/api';
import { FonctionService } from '../Services/fonctions-service.service';
import { Validation } from '../Models/validation.model';
import { StorageService } from '../Services/storage.service';

@Component({
  selector: 'app-add-dev',
  templateUrl: './add-dev.component.html',
  styleUrls: ['./add-dev.component.css']
})
export class AddDevComponent {
  role = "user"
  idDev = this.route.snapshot.params['idDev']
  dev!: Dev;
  selectedVersion: any;
  visible: boolean | undefined;
  visible1: boolean | undefined
  visible2: boolean | undefined
  majs:any;
  selectedmaj: any;
  allUsers: any;
  Vehicules!: Vehicule[];
  sourceProducts!: Vehicule[];
  targetProducts!: Vehicule[];
  sites!: Site[];
  
  background: ThemePalette = undefined;
  devname: any;
  reverses: any;
  myDev:any
  validations: any;
  cdc!:CDC[];
  cdc1!:CDC;
  dev1!:Dev;
 fonctions:any;
 showRSBoard = false;
  showRSPouvoirBoard = false;
  showAdminBoard: any;
  user: any;
  private roles: string[] = [];
  isModificationAllowed=false;
  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }
  
  selectProduct(cdc: CDC) {
    this.messageService.add({ severity: 'info', summary: 'cdc Selected', detail: cdc.nomCdc });
    console.log("hneeeee")
}


  showDialog() {
    this.visible = true;
  }

  showDialog1() {
    this.visible1 = true;
  }
  showDialog2() {
    this.visible2 = true;
  }
  constructor(private versionService: versionService,
    private userService: UserServiceService,
    private vehiculeService: VehiculeService,
    private cdr: ChangeDetectorRef,
    private devService: DevService,
    private siteService: SiteService,
    private reversService: ReverseService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private fonctionService: FonctionService,
    private validationService: ValidationService,
    private cdcService: CDCService,
    private storageService: StorageService
   ) {

  }

  ngOnInit(): void {

    this.getDevByID()
    this.getValidationByDev();
   
    this.getAllVersion();
    this.getAllUser();
    this.getAllVehicule();
    this.getAllCdc();
    this.getAllReverse();
    this.getAllSite(); 
    this.getCdcByDev();
   // this.getFonctionByCdc();
   this.user = this.storageService.getUser();
   this.role = this.user.roles;
   //this.isModificationAllowed = this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_RS') || this.roles.includes('ROLE_RSPOUVOIR');
  

   console.log("allowed",this.isModificationAllowed);
 
  }

  getCdcByDev(){
    this.cdcService.getCdcByDev(this.idDev).subscribe(res=>{
      this.cdc1=res
    this.fonctions=this.cdc1.fonctions;
    console.log(this.fonctions)
  })
  }
getAllCdc(){
  this.cdcService.getAllCdc().subscribe(res=>{
      this.cdc=res
  })
}
getFonctionByCdc(){
  console.log("before",this.fonctions)
  this.fonctionService.getFonctionByCdc(this.cdc1.idCdc).subscribe(res=>{
    this.fonctions=res;
    console.log("fonctions",this.fonctions)
  })
}

  getValidationByDev(){
    this.validationService.getValidationByDev(this.idDev).subscribe(res=>{
      this.validations=res
    })
  }
  getDevByID(){
    this.devService.getDevsById(this.idDev).subscribe(res=>{
      this.myDev = res
      this.dev = this.myDev
      console.log('-----mydev------',this.dev)
    })
  }
  
getVehiculeByDev(){
  this.vehiculeService.getVehichulesByDev(this.dev.id).subscribe(
    (data: Vehicule[]) => {
      this.Vehicules = data;
      this.targetProducts = data
    },
    (error: any) => {
      console.log("error", error);
    }
  )
}



  getAllVersion() {
    this.versionService.getAllversions().subscribe(
      (data1: any) => {
        this.majs = data1;
        console.log("version " , this.majs)
      },
      (error: any) => {
        console.log("error", error);
      }
    );
  }
  getAllUser() {
    this.userService.getAllUsers().subscribe(res => {
      this.allUsers = res

    })
  }

  getAllVehicule() {
    this.vehiculeService.getAllVehicules().subscribe(
      (data5: Vehicule[]) => {
        this.sourceProducts = data5;
        this.getVehiculeByDev()
        this.cdr.markForCheck();
      },
      (error: any) => {
        console.log("error", error);
      }
    )
  }
  getAllSite() {
    this.siteService.getAllsites().subscribe(
      (data2: Site[]) => {
        this.sites = data2;
      },
      (error: any) => {
        console.log("error", error);
      }
    );
  }
  getAllReverse() {
    this.reversService.getAllReverse().subscribe(
      (data: Reverse[]) => {
        this.reverses = data;
      },
      (error: any) => {
        console.log("error", error);
      }
    );

  }
  onSubmit() {
console.log("submition",this.dev)
this.dev.vehicules=this.targetProducts
    this.devService.updateDev(this.idDev,this.dev)
      .subscribe(response => {
        this.cdr.detectChanges();
        // Handle successful response (optional)
        console.log('Form data submitted successfully:', response);
      }, error => {
        // Handle errors (important)
        console.error('Error submitting form data:', error);
      });
  }

}
