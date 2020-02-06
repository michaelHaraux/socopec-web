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
    recupAdd:boolean;
    
    constructor(public identifiant: string, public modele: string) {
    }
  }