import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agence } from '../../models/agence.model';
import { AgencesService } from '../../services/agences.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-agence-form',
  templateUrl: './agence-form.component.html',
  styleUrls: ['./agence-form.component.scss']
})
export class AgenceFormComponent implements OnInit {


  agenceForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder, private agencesService: AgencesService,
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
    });
  }

  onSaveAgence() {
    const nom = this.agenceForm.get('nom').value;
    const rue = this.agenceForm.get('rue').value;
    const complement = this.agenceForm.get('complement').value;
    const code = this.agenceForm.get('code').value;
    const ville = this.agenceForm.get('ville').value;
    const numero = this.agenceForm.get('numero').value;
    const fax = this.agenceForm.get('fax').value;

    const newAgence = new Agence(nom, rue);
    newAgence.complement = complement;
    newAgence.code = code;
    newAgence.ville = ville;
     newAgence.numero = numero; 
     newAgence.fax = fax;



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


