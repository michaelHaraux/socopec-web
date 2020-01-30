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
  

}
