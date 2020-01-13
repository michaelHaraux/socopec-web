import { Component, OnInit,Input } from '@angular/core';
import { HTTPNODESERVICEService } from 'D:/RIL/Projet Web - Alexandre DE BEUKELAER/Projet Angular/SOCOPEC/src/app/http-node-service.service';
//import { VEHICULEComponent } from 'C:/Users/Lucas/Documents/01 CESI/Projet Angular/SOCOPEC/src/app/vehicule/vehicule.component';
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
  constructor( private HTTPSERV: HTTPNODESERVICEService) 
  {
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
    this.HTTPSERV.VEHICULESBDD.sort((a,b) => (a.modele < b.modele) ? 1 : -1);
    //this.HTTPSERV.VEHICULESBDD.sort((a,b) => (a.modele < b.modele) ? 1 : ((b.modele < a.modele) ? -1 : 0));
  }

}

