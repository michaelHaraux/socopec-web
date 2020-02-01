import { Component, OnInit } from '@angular/core';
import { Vehicule } from '../../models/vehicule.model';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculesService } from '../../services/vehicule.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  fileUploaded = false;
  id: number;
  pret : boolean;
  add: boolean;
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private vehiculesService: VehiculesService,
    private router: Router) { }

  ngOnInit() {


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
    });
    this.vehicule = new Vehicule('', '');
    const id = this.route.snapshot.params['id'];
    this.id = id;
    this.vehiculesService.getSingleVehicule(+id).then(
      (vehicule: Vehicule) => {
        this.vehicule = vehicule;
        this.pret = vehicule.add;
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
        });

      }
    );

  }

  onDeleteVehicule(vehicule: Vehicule) {
    this.vehiculesService.removeVehicule(vehicule);

  }
  toggleVisibility(e){
    this.add= e.target.checked;
  }
  onEditVehicule(vehicule: Vehicule) {
    this.vehiculesService.removeVehicule(vehicule);
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
   
    const newVehicule = new Vehicule(identifiant, modele);
    newVehicule.dateFab = dateFab;
    newVehicule.hauteur = hauteur;
    newVehicule.largeur = largeur;
    newVehicule.poids = poids;
    newVehicule.puissance = puissance;
    newVehicule.photo = photo;
    newVehicule.agence = agence;
    newVehicule.add = this.add;

    if (this.fileUrl && this.fileUrl !== '') {
      newVehicule.photo = this.fileUrl;
    }
    console.log(identifiant);
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
