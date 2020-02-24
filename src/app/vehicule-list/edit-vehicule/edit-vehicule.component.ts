import { Component, OnInit } from '@angular/core';
import { Vehicule } from '../../models/vehicule.model';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculesService } from '../../services/vehicule.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { vehiculeBackup } from '../../models/vehiculeBackup.models';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-edit-vehicule',
  templateUrl: './edit-vehicule.component.html',
  styleUrls: ['./edit-vehicule.component.scss']
})
export class EditVehiculeComponent implements OnInit {

 
  vehicule: Vehicule;
  vehiculeForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  listeFilesUrl: string[] = [];
  fileUploaded = false;
  id: number;
  idEdit : number;
  pret : boolean;
  add: boolean;
  isAdmin: boolean;
  isAuth: boolean;
  utilisateur: string
  
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private vehiculesService: VehiculesService,
    private router: Router) { }
    
  ngOnInit() {

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
    this.initForm();
  }

  initForm() {
   
    this.vehiculeForm = this.formBuilder.group({
      photo: '',
      identifiant: ['', Validators.required],
      modele: ['', Validators.required],
      dateFab: '',
      hauteur:'',
      largeur:'',
      poids:'',
      puissance:'',
      agence : '',
      add:'',
      recupAdd:''
    });

    this.vehicule = new Vehicule('', '');
    const id = this.route.snapshot.params['id'];
    this.idEdit = id;
    this.id = id;
    this.vehiculesService.getSingleVehicule(+id).then(
      (vehicule: Vehicule) => {
        
        this.vehicule = vehicule;
        this.pret = vehicule.add;
        console.log("3",this.pret);
        this.vehiculeForm = this.formBuilder.group({
          photo: this.vehicule.photo,
          identifiant: [this.vehicule.identifiant, Validators.required],
          modele: [this.vehicule.modele, Validators.required],
          dateFab: this.vehicule.dateFab,
          hauteur: this.vehicule.hauteur,
          largeur: this.vehicule.largeur,
          poids: this.vehicule.poids,
          puissance: this.vehicule.puissance,
          agence: this.vehicule.agence,
          add : this.vehicule.add,
          recupAdd : this.vehicule.add,
        });
        
      }
    );

  }

  onDeleteVehicule(vehicule : Vehicule) {
    //if(confirm("Etes vous sur de vouloir supprimer ce véhicule")) 
      console.log("Implement delete functionality here");
     // console.log(vehicule);
    
      this.vehiculesService.removeVehicule(vehicule);
  }

  toggleVisibility(e){
    this.add= e.target.checked;
  }
  date = new Date();
  dateString = this.date.toDateString();
  onSaveVehicule() {


    console.log('Mise à jour ...');
    const identifiant = this.vehiculeForm.get('identifiant').value;
    const photo = this.vehiculeForm.get('photo').value;
    const modele = this.vehiculeForm.get('modele').value;
    const dateFab = this.vehiculeForm.get('dateFab').value;
    const hauteur = this.vehiculeForm.get('hauteur').value;
    const largeur = this.vehiculeForm.get('largeur').value;
    const poids = this.vehiculeForm.get('poids').value;
    const puissance = this.vehiculeForm.get('puissance').value;
    const agence = this.vehiculeForm.get('agence').value;
    const recupAdd = this.vehiculeForm.get('recupAdd').value;
   
    const newVehicule = new Vehicule(identifiant, modele);
    newVehicule.dateFab = dateFab;
    newVehicule.hauteur = hauteur;
    newVehicule.largeur = largeur;
    newVehicule.poids = poids;
    newVehicule.puissance = puissance;
    newVehicule.photo = photo;
    newVehicule.agence = agence;
    console.log("1", this.add);
    console.log("2",this.pret);
    if(this.add != null){
      newVehicule.add = this.add;
    }else{
      newVehicule.add = recupAdd;
    }
    
    while (this.listeFilesUrl.length !=3)
    {
      this.listeFilesUrl.push('');
    }
    if(this.fileUrl && this.fileUrl !== '') {
      newVehicule.addPhotos(this.listeFilesUrl)
      newVehicule.photo = this.fileUrl;
    }
    this.listeFilesUrl=[];
    

    const EditVehicule = new vehiculeBackup(identifiant, modele);
    EditVehicule.dateFab = dateFab;
    EditVehicule.hauteur = hauteur;
    EditVehicule.largeur = largeur;
    EditVehicule.poids = poids;
    EditVehicule.puissance = puissance;
    EditVehicule.photo = photo;
    EditVehicule.agence = agence;
    EditVehicule.dateDelete = this.dateString;
    EditVehicule.AgentDelete = this.utilisateur;
    this.vehiculesService.backupVehicule(EditVehicule);
    this.vehiculesService.removeVehiculeEdit(this.idEdit); 
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
