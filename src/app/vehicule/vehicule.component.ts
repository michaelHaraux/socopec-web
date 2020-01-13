import { Component, OnInit, Input } from '@angular/core';
import { HTTPNODESERVICEService } from 'D:/RIL/Projet Web - Alexandre DE BEUKELAER/Projet Angular/SOCOPEC/src/app/http-node-service.service';
import { LISTEVEHICULESComponent } from 'D:/RIL/Projet Web - Alexandre DE BEUKELAER/Projet Angular/SOCOPEC/src/app/liste-vehicules/liste-vehicules.component';
@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.scss'],
})
export class VEHICULEComponent implements OnInit {

  id:number
  miniature:string
  modele:string
  agence:string
  statut:string
  dateDeb:string
  dateFin:string
  puissance:string
  longueur:string
  largeur:string
  dateFab:string
  
  VEHICULES = [{}];
  @Input() showMePartially: boolean;
  @Input() IDFocus: number;
  idGet:number = this.IDFocus;
  constructor(private listeVehi: LISTEVEHICULESComponent, private HTTPSERV: HTTPNODESERVICEService) 
  {
  }

  ngOnInit()
  {
    this.VEHICULES=[];
    console.log(this.VEHICULES);
    console.log(this.idGet);
  }
  getVehicule()
  {
    this.VEHICULES=[];
    this.VEHICULES.push(this.HTTPSERV.VEHICULESBDD.find(vehic => vehic.id === this.IDFocus));
  }
  callToggleChild()
  {
    this.listeVehi.toggleChild(-1)
  }
}
