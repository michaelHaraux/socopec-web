import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehicule } from '../../models/vehicule.model';
import { VehiculesService } from '../../services/vehicule.service';
import { Router, ActivatedRoute } from '@angular/router';
import { vehiculeBackup } from '../../models/vehiculeBackup.models';

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
  listeFilesUrl: string[] = [];
  fileUploaded = false;
  add = false;
  isAdmin: boolean;
  isAuth: boolean;
  utilisateur: string
  vehiculeCreated : boolean;
  

  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder, private vehiculesService: VehiculesService,
              private router: Router) { }
              
  ngOnInit() {
    this.initForm();
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
  
  date = new Date();
  dateString = this.date.toDateString();
  
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
   

    while (this.listeFilesUrl.length !=3)
    {
      this.listeFilesUrl.push('');
    }
    if(this.fileUrl && this.fileUrl !== '') {
      newVehicule.addPhotos(this.listeFilesUrl)
      newVehicule.photo = this.fileUrl;
    }
    this.listeFilesUrl=[];

    const createVehicule = new vehiculeBackup(identifiant, modele);
    createVehicule.dateFab = dateFab;
    createVehicule.hauteur = hauteur;
    createVehicule.largeur = largeur;
    createVehicule.poids = poids;
    createVehicule.puissance = puissance;
    createVehicule.dateFab = dateFab;
    createVehicule.agence = agence;
    createVehicule.add = this.add;
    createVehicule.dateDelete = this.dateString;
    createVehicule.AgentDelete = this.utilisateur;
    createVehicule.vehiculeCreated = true;
    
    this.vehiculesService.backupVehicule(createVehicule);
    this.vehiculesService.createNewVehicule(newVehicule);
    this.router.navigate(['/vehicules']);
  }
  onUploadFile(file: File) 
  {
    this.fileIsUploading = true;
    this.vehiculesService.uploadFile(file).then(
      (url: string) => 
      {
        this.fileUrl = url;
        this.listeFilesUrl.push(this.fileUrl);
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

detectMultipleFiles(event) {

  if (event.target.files.length < 4)
  {
    for (var i = 0; i < event.target.files.length; i++) 
    {
      this.onUploadFile(event.target.files[i]);
    }
  }
  //this.onUploadFile(event.target.files[0]);
}

  onBack() {
    this.router.navigate(['/vehicules']);
  }
  

}


