import { Component, OnDestroy, OnInit } from '@angular/core';
import { VehiculesService } from '../../services/vehicule.service';
import { Vehicule } from '../../models/vehicule.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { vehiculeBackup } from '../../models/vehiculeBackup.models';


@Component({
  selector: 'app-backup-vehicule',
  templateUrl: './backup-vehicule.component.html',
  styleUrls: ['./backup-vehicule.component.scss']
})
export class BackupVehiculeComponent implements OnInit, OnDestroy {

  vehiculesBackup: vehiculeBackup[];
  vehiculesSubscription: Subscription;
  
  constructor(private vehiculesService: VehiculesService, private router: Router) {}

  ngOnInit() {
    this.vehiculesSubscription = this.vehiculesService.vehiculesBackupSubject.subscribe(
      (vehiculesBackup: vehiculeBackup[]) => {
        this.vehiculesBackup = vehiculesBackup;
        
      }
    );
    this.vehiculesService.emitVehiculesBackup();
  }
  ngOnDestroy() {
    this.vehiculesSubscription.unsubscribe();
  }
  onBack() {
    this.router.navigate(['/vehicules']);
  }
}
