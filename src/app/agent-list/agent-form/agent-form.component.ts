import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agent } from '../../models/agent.model';
import { AgentsService } from '../../services/agents.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-agent-form',
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.scss']
})
export class AgentFormComponent implements OnInit {

  
  agentForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder, private agentsService: AgentsService,
              private router: Router) { }
              
  ngOnInit() {
    this.initForm();
  }
  
  initForm() {
    this.agentForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      synopsis: ''
    });
  }
  
  onSaveAgent() {
    const title = this.agentForm.get('title').value;
    const author = this.agentForm.get('author').value;
    const synopsis = this.agentForm.get('synopsis').value;
    const newAgent = new Agent(title, author);
    newAgent.synopsis = synopsis;
    if(this.fileUrl && this.fileUrl !== '') {
      newAgent.photo = this.fileUrl;
    }
    this.agentsService.createNewAgent(newAgent);
    this.router.navigate(['/agents']);
  }
  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.agentsService.uploadFile(file).then(
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



}


