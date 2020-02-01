import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehicule } from '../../models/vehicule.model';
import { VehiculesService } from '../../services/vehicule.service';
import { Router, ActivatedRoute } from '@angular/router';

import * as firebase from 'firebase';
import { Agence } from 'src/app/models/agence.model';

@Component({
  selector: 'app-vehicule-form',
  templateUrl: './vehicule-form.component.html',
  styleUrls: ['./vehicule-form.component.scss']
})
export class VehiculeFormComponent implements OnInit {

  
  //vehicule: Vehicule;
  vehiculeForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  add =false;
  

  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder, private vehiculesService: VehiculesService,
              private router: Router) { }
              
  ngOnInit() {
   
  
    this.initForm();
  }

  initForm() {
    this.vehiculeForm = this.formBuilder.group({
      identifiant: ['', Validators.required],
      modele: ['', Validators.required],
      dateFab: '',
      hauteur:'',
      largeur:'',
      poids:'',
      puissance:'',
      agence : '',
      add:'',
    });
  }
  
  onSaveVehicule() {
    const identifiant = this.vehiculeForm.get('identifiant').value;
    const modele = this.vehiculeForm.get('modele').value;
    const dateFab = this.vehiculeForm.get('dateFab').value;
    const hauteur = this.vehiculeForm.get('hauteur').value;
    const largeur = this.vehiculeForm.get('largeur').value;
    const poids = this.vehiculeForm.get('poids').value;
    const puissance = this.vehiculeForm.get('puissance').value;
    const agence = this.vehiculeForm.get('agence').value;

    const newVehicule = new Vehicule(identifiant, modele);
    newVehicule.dateFab = dateFab;
    newVehicule.hauteur = hauteur;
    newVehicule.largeur = largeur;
    newVehicule.poids = poids;
    newVehicule.puissance = puissance;
    newVehicule.dateFab = dateFab;
    newVehicule.agence = agence;
    newVehicule.add = this.add;

    if(this.fileUrl && this.fileUrl !== '') {
      newVehicule.photo = this.fileUrl;
    }
    this.vehiculesService.createNewVehicule(newVehicule);
    this.router.navigate(['/vehicules']);
  }
  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.vehiculesService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
    
}
toggleVisibility(e){
  this.add= e.target.checked;
}
detectFiles(event) {
  this.onUploadFile(event.target.files[0]);
}

  onBack() {
    this.router.navigate(['/vehicules']);
  }
  

}


