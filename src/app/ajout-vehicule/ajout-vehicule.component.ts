import { Component, OnInit, Input } from '@angular/core';
import { HTTPNODESERVICEService } from 'D:/RIL/Projet Web - Alexandre DE BEUKELAER/Projet Angular/SOCOPEC/src/app/http-node-service.service';
import { LISTEVEHICULESComponent } from 'D:/RIL/Projet Web - Alexandre DE BEUKELAER/Projet Angular/SOCOPEC/src/app/liste-vehicules/liste-vehicules.component';
@Component({
  selector: 'app-ajout-vehicule',
  templateUrl: './ajout-vehicule.component.html',
  styleUrls: ['./ajout-vehicule.component.scss']
})
export class AjoutVehiculeComponent implements OnInit {

  constructor(private HTTPSERV: HTTPNODESERVICEService, private listeVehi: LISTEVEHICULESComponent) { }

  ngOnInit() {
  }
  addVehicule
  (
    pMiniature:string, pModele:string, pAgence:string, pStatut:string,pDateDeb:Date,pDateFin:Date,pPuissance:string,
    pLongueur:string, pLargeur:string, pDateFab:string
  )
  {
    if(this.HTTPSERV.addVEHICULEBDD("https://cdn3.iconfinder.com/data/icons/glyph/227/Button-Add-1-512.png",pModele,pAgence,pStatut,pDateDeb,pDateFin,pPuissance,pLongueur,pLargeur,pDateFab))
    {
      alert ("Ajout du véhicule "+pModele+" effectué avec succès");
      this.listeVehi.addVehic = false;
      this.listeVehi.hideTable = true;
      this.listeVehi.cheminImage="https://cdn3.iconfinder.com/data/icons/buttons/512/Icon_11-512.png"
    }
    else
    {
      alert ("Echec de l'ajout du vehicule "+pModele);
    }
  }
}
