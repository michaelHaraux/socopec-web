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
      title: ['', Validators.required],
      author: ['', Validators.required],
      synopsis: ''
    });
  }

  onSaveAgence() {
    const title = this.agenceForm.get('title').value;
    const author = this.agenceForm.get('author').value;
    const synopsis = this.agenceForm.get('synopsis').value;
    const newAgence = new Agence(title, author);
    newAgence.synopsis = synopsis;
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


