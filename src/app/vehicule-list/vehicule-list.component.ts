import { Component, OnDestroy, OnInit } from '@angular/core';
import { VehiculesService } from '../services/vehicule.service';
import { Vehicule } from '../models/vehicule.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { vehiculeBackup } from '../models/vehiculeBackup.models';



@Component({
  selector: 'app-vehicule-list',
  templateUrl: './vehicule-list.component.html',
  styleUrls: ['./vehicule-list.component.scss']
})
export class VehiculeListComponent implements OnInit, OnDestroy {

  vehicules: Vehicule[];
  vehiculesSubscription: Subscription;
  
  constructor(private vehiculesService: VehiculesService, private router: Router) {}

  ngOnInit() {
    this.vehiculesSubscription = this.vehiculesService.vehiculesSubject.subscribe(
      (vehicules: Vehicule[]) => {
        this.vehicules = vehicules;
        //this.trierPar("modele");
      }
    );
    this.vehiculesService.emitVehicules();
  }

  onNewVehicule() {
    this.router.navigate(['/vehicules', 'new']);
  }

  onBackupVehicule(vehicule : vehiculeBackup){
        this.vehiculesService.backupVehicule(vehicule);
        console.log("Backup du vehicule");
  }

  onDeleteVehicule(vehicule: Vehicule, vehiculeBackup : vehiculeBackup) {
   // if(confirm("Etes vous sur de vouloir supprimer ce véhicule")) {
      console.log("Implement delete functionality here");
       this.vehiculesService.backupVehicule(vehiculeBackup);
       this.vehiculesService.removeVehicule(vehicule);

   // }
  }

  onViewBackupVehicule(){
    this.router.navigate(['/ListeBackupVehicules']);

  }
  onViewVehicule(id: number) {
    this.router.navigate(['/vehicules', 'view', id]);
  }
  
  ngOnDestroy() {
    this.vehiculesSubscription.unsubscribe();
    //this.trierPar("modele");
  }
  onBack() {
    this.router.navigate(['/accueil']);
  }
  
  trierPar(tri:string)
  {
  //   switch(tri) 
  //   { 
  //       case "modele": 
  //       { 
  //         this.vehiculesService.vehicules.sort((a,b) => (a.modele > b.modele) ? 1 : -1);
  //         break; 
  //       } 
  //       case "agence": 
  //       { 
  //         this.vehiculesService.vehicules.sort((a,b) => (a.agence > b.agence) ? 1 : -1);
  //         break; 
  //       } 
  //       case "statut": 
  //       { 
  //         this.vehiculesService.vehicules.sort((a,b) => (a.add > b.add) ? 1 : -1);
  //         break; 
  //       } 
  //       case "datefab": 
  //       { 
  //         this.vehiculesService.vehicules.sort((a,b) => (a.dateFab > b.dateFab) ? 1 : -1);
  //         break; 
  //       } 
  //       default: 
  //       { 
  //         this.vehiculesService.vehicules.sort((a,b) => (a.modele > b.modele) ? 1 : -1);
  //         break; 
  //       } 
  //  } 
  }
}
