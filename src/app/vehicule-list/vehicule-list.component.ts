import { Component, OnDestroy, OnInit } from '@angular/core';
import { VehiculesService } from '../services/vehicule.service';
import { Vehicule } from '../models/vehicule.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { vehiculeBackup } from '../models/vehiculeBackup.models';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FilterPipe } from 'ngx-filter-pipe';


@Component({
  selector: 'app-vehicule-list',
  templateUrl: './vehicule-list.component.html',
  styleUrls: ['./vehicule-list.component.scss']
})
export class VehiculeListComponent implements OnInit, OnDestroy {
  userFilter: any = { modele: '', agence:'', identifiant:'', dateFab:'' };
  isAdmin: boolean;
  isAuth: boolean;
  utilisateur: string
  AgentDelete : string;
  vehicules: Vehicule[];
  vehiculesSubscription: Subscription;
  

  constructor(private filterPipe: FilterPipe,private vehiculesService: VehiculesService, private router: Router) { }

  ngOnInit() {
 
    this.vehiculesSubscription = this.vehiculesService.vehiculesSubject.subscribe(
      (vehicules: Vehicule[]) => {
        this.vehicules = vehicules;
        
      }
    );
    this.vehiculesService.emitVehicules();

      firebase.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            this.isAuth = true;
            this.utilisateur=user.email
            if(this.utilisateur=="admin@gmail.com"){
              this.isAdmin = true;
            }else{this.isAdmin=false}
          } else {
            this.isAuth = false;
          }
        }
      );
    
  }

  onNewVehicule() {
    this.router.navigate(['/vehicules', 'new']);
  }

  date = new Date();
  dateString = this.date.toDateString();

  onDeleteVehicule(vehicule: Vehicule, vehiculeBackup: vehiculeBackup) {
    // if(confirm("Etes vous sur de vouloir supprimer ce véhicule")) {
    console.log("Implement delete functionality here");

    vehiculeBackup.dateDelete = this.dateString;
    vehiculeBackup.AgentDelete = this.utilisateur;
    vehiculeBackup.vehiculeDeleted = true;
    console.log("agent", vehiculeBackup.AgentDelete);
    console.log("date", vehiculeBackup.dateDelete);

    this.vehiculesService.backupVehicule(vehiculeBackup);
    this.vehiculesService.removeVehicule(vehicule);

    // }
  }

  onViewBackupVehicule() {
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

  trierPar(tri: string) {
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
