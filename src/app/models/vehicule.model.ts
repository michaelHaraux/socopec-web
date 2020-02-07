import { Agence } from './agence.model';

export class Vehicule {

    photo: string;
    dateFab : string;
    hauteur : string;
    largeur : string;
    poids: number;
    puissance : number;
    agence : string;
    add:boolean;

    photos = [
      {
        photoA: '',
        photoB: '',
        photoC: ''
      }
    ];
    
    recupAdd:boolean;
    dateDelete : string;
    AgentDelete : string;
    
    constructor(public identifiant: string, public modele: string) 
    {
      this.photos = [];
    }

    addPhotos(listePhotos : string[])
    {
      this.photos.push
      (
        {
          photoA:listePhotos[0],photoB:listePhotos[1],photoC:listePhotos[2]
        }
      )
    }
  }