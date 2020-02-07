import { Component, OnDestroy, OnInit ,ElementRef, ViewChild  } from '@angular/core';
import { VehiculesService } from '../../services/vehicule.service';
import { Vehicule } from '../../models/vehicule.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { vehiculeBackup } from '../../models/vehiculeBackup.models';
import * as XLSX from 'xlsx'; 

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
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;  
  title = 'Excel';  
  ExportTOExcel() {  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, 'ScoreSheet.xlsx');  
  } 
  ngOnDestroy() {
    this.vehiculesSubscription.unsubscribe();
  }
  onBack() {
    this.router.navigate(['/vehicules']);
  }

  deleteBackup(vehiculeBackup : vehiculeBackup[]){
    console.log("entrer deleteBackup");
    vehiculeBackup.forEach(vehicule => {
      
      this.vehiculesService.removeVehiculeBackup(vehicule);
      this.vehiculesService.removeVehiculeBackup(vehicule);
    });
    

  }
}
