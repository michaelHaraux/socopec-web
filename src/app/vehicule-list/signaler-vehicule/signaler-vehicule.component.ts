import { Component, OnInit, Input } from '@angular/core';
import { Vehicule } from '../../models/vehicule.model';
import { Signalement } from '../../models/signalement.model';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculesService } from '../../services/vehicule.service';
import { SignalementService } from '../../services/signalement.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FilterPipe } from 'ngx-filter-pipe';

@Component({
  selector: 'app-signaler-vehicule',
  templateUrl: './signaler-vehicule.component.html',
  styleUrls: ['./signaler-vehicule.component.scss']
})
export class SignalerVehiculeComponent implements OnInit {
  userFilter: any = { identifiant:''};
  vehicule: Vehicule;
  signalements: Signalement[];
  singleSignalement : Signalement[];
  signalementsSubscription: Subscription;
  id: number;
  enPret : boolean;
  messEnpret : string;
  unSignalement:Signalement;
  inputControl:string ="";

  @Input() nature: string;
  @Input() niveau: string;
  @Input() description: string;

  constructor(private filterPipe: FilterPipe,private route: ActivatedRoute, private formBuilder: FormBuilder, private vehiculesService: VehiculesService, private signelementService:SignalementService,
    private router: Router) { }
    
    ngOnInit() {
      this.vehicule = new Vehicule('', '');
      const id = this.route.snapshot.params['id'];
      this.id = id;
      this.vehiculesService.getSingleVehicule(+id).then(
        (vehicule: Vehicule) => {
          this.vehicule = vehicule;
          if (this.vehicule.add) {
            this.enPret = true;
            this.messEnpret ="En prêt";
          } else {
            this.enPret = false;
            this.messEnpret ="Disponible";
          }
        }
      );

 
      this.signalementsSubscription = this.signelementService.signalementsSubject.subscribe(
        (signalements: Signalement[]) => {
          this.signalements = signalements;
          //this.trierPar("modele");
        }
        );
        // this.singleSignalement =  this.signalements.filter(function(monSignalement) 
        // {
        //   return monSignalement.identifiant == this.vehicule.identifiant; 
        // }
        // );
    }


  addSignalement(pNature:string,pNiveau:string,pDescription:string)
  {
    if(pNature != "" && pNiveau != "" && pDescription!="")
    {
      this.unSignalement = new Signalement(this.vehicule.identifiant,pNature,pNiveau,pDescription);
      this.signelementService.createNewSignalement(this.unSignalement)
      this.onBack();
    }
    else
    {
        this.inputControl="Remplissez tous les champs !"
    }
  }

  onBack() {
    this.router.navigate(['/vehicules']);
  }

}