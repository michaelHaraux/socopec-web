import { Component, OnInit } from '@angular/core';
import { Vehicule } from '../../models/vehicule.model';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculesService } from '../../services/vehicule.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-single-vehicule',
  templateUrl: './single-vehicule.component.html',
  styleUrls: ['./single-vehicule.component.scss']
})
export class SingleVehiculeComponent implements OnInit {

  
  vehicule: Vehicule;
  id : number;
  constructor(private route: ActivatedRoute, private vehiculesService: VehiculesService,
              private router: Router) {}

  ngOnInit() {
    this.vehicule = new Vehicule('', '');
    const id = this.route.snapshot.params['id'];
    this.id = id;
    this.vehiculesService.getSingleVehicule(+id).then(
      (vehicule: Vehicule) => {
        this.vehicule = vehicule;
      }
    );
  }
   onEditVehicule(id: number) {
     this.router.navigate(['/vehicules', 'edit',this.id]);
 }
  onBack() {
    this.router.navigate(['/vehicules']);
  }


}