import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehicule } from '../../models/vehicule.model';
import { VehiculesService } from '../../services/vehicule.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-vehicule-form',
  templateUrl: './vehicule-form.component.html',
  styleUrls: ['./vehicule-form.component.scss']
})
export class VehiculeFormComponent implements OnInit {

  
  vehiculeForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  //add =false;
  

  constructor(private formBuilder: FormBuilder, private vehiculesService: VehiculesService,
              private router: Router) { }
              
  ngOnInit() {
    this.initForm();
  }
  // toggleVisibility(e){
  //   this.add= e.target.checked;
  // }
  initForm() {
    this.vehiculeForm = this.formBuilder.group({
      identifiant: ['', Validators.required],
      modele: ['', Validators.required],

    });
  }
  
  onSaveVehicule() {
    const identifiant = this.vehiculeForm.get('identifiant').value;
    const modele = this.vehiculeForm.get('modele').value;
 
    const newVehicule = new Vehicule(identifiant, modele);


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
detectFiles(event) {
  this.onUploadFile(event.target.files[0]);
}

  onBack() {
    this.router.navigate(['/vehicules']);
  }
  

}


