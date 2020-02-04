import { Component, OnInit,Input } from '@angular/core';
import { HTTPNODESERVICEService } from '../http-node-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-vehicules',
  templateUrl: './liste-vehicules.component.html',
  styleUrls: ['./liste-vehicules.component.scss']
})
export class LISTEVEHICULESComponent implements OnInit {

  VEHICULES = [{}];
  @Input() IDSel: string;
  @Input() index: number;
  addVehic:boolean = false;
  showVar: boolean = false;
  hideTable: boolean = true;
  IDSelect:number;
  cheminImage:string
  constructor( private HTTPSERV: HTTPNODESERVICEService,private router: Router) 
  {
  }
 

  getLogin() {
    return JSON.parse(localStorage.getItem('user')).login;
  }

  logout() {
    console.log('Tentative de déconnexion');

    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
 
  //Liaison avec la liste des vehicules du service SQL
  ngOnInit()
  {
    this.cheminImage="https://cdn3.iconfinder.com/data/icons/buttons/512/Icon_11-512.png"
    this.VEHICULES=this.HTTPSERV.VEHICULESBDD;
  }
  

  toggleChild(pID:number)
  {
    this.showVar = !this.showVar;
    this.hideTable = !this.hideTable;
    this.IDSelect = pID;
  }
  setAddVehic()
  {
   this.addVehic =!this.addVehic;
   this.hideTable = !this.hideTable;
   this.cheminImage="https://cdn3.iconfinder.com/data/icons/ui-essential-elements-buttons/110/MinusCircle-512.png"
   if(!this.addVehic)
   {
     if(!confirm("Etes vous sur de vouloir annuler l'ajout ? "))
     {
      this.addVehic =!this.addVehic;
      this.hideTable = !this.hideTable;
     }
     else
     {
      this.cheminImage="https://cdn3.iconfinder.com/data/icons/buttons/512/Icon_11-512.png"
     }
   }
  }

  trierPar(tri:string)
  {
    switch(tri) { 
      case "modele": { 
         this.HTTPSERV.VEHICULESBDD.sort((a,b) => (a.modele > b.modele) ? 1 : -1);
         break; 
      } 
      case "agence": { 
         this.HTTPSERV.VEHICULESBDD.sort((a,b) => (a.agence > b.agence) ? 1 : -1);
         break; 
      } 
      case "statut": { 
        this.HTTPSERV.VEHICULESBDD.sort((a,b) => (a.statut > b.statut) ? 1 : -1);
        break; 
      } 
      case "puissance": { 
        this.HTTPSERV.VEHICULESBDD.sort((a,b) => (a.puissance > b.puissance) ? 1 : -1);
        break; 
      } 
      case "supprime": { 
        this.HTTPSERV.VEHICULESBDD.sort((a,b) => (a.supprime > b.supprime) ? 1 : -1);
        break; 
      } 
      default: { 
         this.HTTPSERV.VEHICULESBDD.sort((a,b) => (a.modele > b.modele) ? 1 : -1);
         break; 
      } 
   } 


    //this.HTTPSERV.VEHICULESBDD.sort((a,b) => (a.modele < b.modele) ? 1 : ((b.modele < a.modele) ? -1 : 0));
  }
  onBack() {
    this.router.navigate(['/accueil']);
  }
}

