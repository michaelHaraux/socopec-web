import { Agence } from './agence.model';

export class Signalement {

    identifiant:string;
    nature:string;
    niveau:string;
    description:string;
    dateSignalement:string;
    utilisateur:string;

    constructor(pIndentifiant:string,pNature:string,pNiveau:string,pDescription:string)
    {
      this.identifiant = pIndentifiant;
      this.nature = pNature;
      this.niveau = pNiveau;
      this.description = pDescription;

      
      var today = new Date();
      var date = today.getFullYear()+'/'+today.getDate()+'/'+(today.getMonth()+1);  
      this.dateSignalement = date
    }
    setSignalement(pIndentifiant:string,pNature:string,pNiveau:string,pDescription:string)
    {
      this.identifiant = pIndentifiant;
      this.nature = pNature;
      this.niveau = pNiveau;
      this.description = pDescription;
    }
  }