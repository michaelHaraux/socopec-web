import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agence } from '../../models/agence.model';
import { AgencesService } from '../../services/agences.service';
import { Router,ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-agence',
  templateUrl: './edit-agence.component.html',
  styleUrls: ['./edit-agence.component.scss']
})
export class EditAgenceComponent implements OnInit {

  agence : Agence;
  agenceForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  id:number;

  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder, private agencesService: AgencesService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.agenceForm = this.formBuilder.group({
      nom: ['', Validators.required],
      rue: ['', Validators.required],
      complement: '',
      code: '',
      ville: '',
      numero: '',
      fax: '',
      photo:'',
    });
    this.agence = new Agence('', '');
    const id = this.route.snapshot.params['id'];
    this.id = id;
    this.agencesService.getSingleAgence(+id).then(
      (agence: Agence) => {
        this.agence = agence;
        this.agenceForm = this.formBuilder.group({
          photo: this.agence.photo,
          nom: [this.agence.nom, Validators.required],
          rue: [this.agence.rue, Validators.required],
          complement: this.agence.complement,
          code: this.agence.code,
          ville: this.agence.ville,
          numero: this.agence.numero,
          fax: this.agence.fax,
         
        });
      }
    );
  }

  onDeleteAgence(agence: Agence) {
    this.agencesService.removeAgence(agence);

  }
  onEditAgence() {
    this.agencesService.removeAgence(this.agence);

    const nom = this.agenceForm.get('nom').value;
    const rue = this.agenceForm.get('rue').value;
    const complement = this.agenceForm.get('complement').value;
    const code = this.agenceForm.get('code').value;
    const ville = this.agenceForm.get('ville').value;
    const numero = this.agenceForm.get('numero').value;
    const fax = this.agenceForm.get('fax').value;
    const photo = this.agenceForm.get('photo').value;

    const newAgence = new Agence(nom, rue);
    newAgence.complement = complement;
    newAgence.code = code;
    newAgence.ville = ville;
     newAgence.numero = numero; 
     newAgence.fax = fax;
     newAgence.photo = photo;



    if (this.fileUrl && this.fileUrl !== '') {
      newAgence.photo = this.fileUrl;
    }
    this.agencesService.createNewAgence(newAgence);
    this.router.navigate(['/agences']);
  }
  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.agencesService.uploadFile(file).then(
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
    this.router.navigate(['/agences']);
  }

}


