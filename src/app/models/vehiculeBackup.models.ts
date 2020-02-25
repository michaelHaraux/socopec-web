
export class vehiculeBackup {

    photo: string;
    dateFab : string;
    hauteur : string;
    largeur : string;
    poids: number;
    puissance : number;
    agence : string;
    add:boolean;
    recupAdd:boolean;
    dateDelete : string;
    AgentDelete : string;
    vehiculeDeleted : boolean;
    vehiculeCreated : boolean;
    
    constructor(public identifiant: string, public modele: string) {
    }
    
  }