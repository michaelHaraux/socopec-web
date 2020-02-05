import { Component, OnDestroy, OnInit } from '@angular/core';
import { VehiculesService } from '../services/vehicule.service';
import { Vehicule } from '../models/vehicule.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


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
        
      }
    );
    this.vehiculesService.emitVehicules();
  }

  onNewVehicule() {
    this.router.navigate(['/vehicules', 'new']);
  }

  onDeleteVehicule(vehicule: Vehicule) {
    this.vehiculesService.removeVehicule(vehicule);
  }

  onViewVehicule(id: number) {
    this.router.navigate(['/vehicules', 'view', id]);
  }
  
  ngOnDestroy() {
    this.vehiculesSubscription.unsubscribe();
  }
  onBack() {
    this.router.navigate(['/accueil']);
  }
  
  trierPar(tri:string)
  {
    switch(tri) { 
      case "modele": { 
         this.vehiculesService.vehicules.sort((a,b) => (a.modele > b.modele) ? 1 : -1);
         break; 
      } 
      case "agence": { 
        this.vehiculesService.vehicules.sort((a,b) => (a.agence > b.agence) ? 1 : -1);
         break; 
      } 
      default: { 
         this.vehiculesService.vehicules.sort((a,b) => (a.modele > b.modele) ? 1 : -1);
         break; 
      } 
   } 
}
}
