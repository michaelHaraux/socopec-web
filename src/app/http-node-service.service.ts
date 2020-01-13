import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HTTPNODESERVICEService {

  constructor() { }

  VEHICULESBDD = [
    {
      id: 0,
      miniature: 'https://cdn3.iconfinder.com/data/icons/glyph/227/Button-Add-1-512.png',
      modele: 'Ford 2000 ',
      agence: 'Nancy',
      statut: 'Location',
      dateDebStatut:new Date(),
      dateFinStatut:new Date(),
      puissance:'',
      largeur:'',
      longueur:'',
      supprime: false
      
    },
    {
      id: 1,
      miniature: 'https://cdn3.iconfinder.com/data/icons/glyph/227/Button-Add-1-512.png',
      modele: 'Mustang 1970',
      agence: 'Paris',
      statut: 'Demonstration',
      dateDebStatut:new Date(),
      dateFinStatut:new Date(),
      puissance:'',
      largeur:'',
      longueur:'',
      supprime: true
    },
    {
      id: 2,
      miniature: 'https://cdn3.iconfinder.com/data/icons/glyph/227/Button-Add-1-512.png',
      modele: 'mustang 1971',
      agence: 'Paris',
      statut: 'Demonstration',
      dateDebStatut:new Date(),
      dateFinStatut:new Date(),
      puissance:'',
      largeur:'',
      longueur:'',
      supprime: true
    }
    ,
    {
      id: 2,
      miniature: 'https://cdn3.iconfinder.com/data/icons/glyph/227/Button-Add-1-512.png',
      modele: 'atz',
      agence: 'Paris',
      statut: 'Demonstration',
      dateDebStatut:new Date(),
      dateFinStatut:new Date(),
      puissance:'',
      largeur:'',
      longueur:'',
      supprime: true
    }
  ];

  addVEHICULEBDD
  (
    pMiniature:string, pModele:string, pAgence:string, pStatut:string,pDateDeb:Date,pDateFin:Date,pPuissance:string,
    pLongueur:string, pLargeur:string, pDateFab:string
  )
  {
    if
    (this.VEHICULESBDD.push
      (
        {
        id:this.VEHICULESBDD.length,miniature:pMiniature,modele:pModele,
        agence:pAgence,statut:pStatut,dateDebStatut:pDateDeb,dateFinStatut:pDateFin,
        puissance:pPuissance,largeur:pLargeur,longueur:pLongueur,supprime:true
        }
      )
    )
    {
      return(true);
    }
    else
    {
      return(false);
    }
  } 
  getVEHICULEBDD(pID:number)
  {
    const resultat = this.VEHICULESBDD.find(vehic => vehic.id === 1);
    return(resultat);
  }

  sortVEHICULLEBDD(pPropriete:string)
  {
  }
}
