import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agent } from '../../models/agent.model';
import { AgentsService } from '../../services/agents.service';
import { Router,ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-agent',
  templateUrl: './edit-agent.component.html',
  styleUrls: ['./edit-agent.component.scss']
})
export class EditAgentComponent implements OnInit {

  agent:Agent;
  agentForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  add =false;
  id:number;

  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder, private agentsService: AgentsService,
              private router: Router) { }
              
  ngOnInit() {
    this.initForm();
  }
  toggleVisibility(e){
    this.add= e.target.checked;
  }
  initForm() {
    this.agentForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      synopsis: '',
      tel: '',
      add:'',
      email: ''
    });
    this.agent = new Agent('', '');
    const id = this.route.snapshot.params['id'];
    this.id = id;
    this.agentsService.getSingleAgent(+id).then(
      (agent: Agent) => {
        this.agent = agent;
        this.agentForm = this.formBuilder.group({
          photo: this.agent.photo,
          title: [this.agent.title, Validators.required],
          author: [this.agent.author, Validators.required],
          synopsis: this.agent.synopsis,
          tel: this.agent.tel,
          add: this.agent.add,
          email: this.agent.email,
        
         
        });
      }
    );


  }

  onDeleteAgence(agent: Agent) {
    this.agentsService.removeAgent(agent);

  }
  
  onSaveAgent() {
    this.agentsService.removeAgent(this.agent);

    const title = this.agentForm.get('title').value;
    const author = this.agentForm.get('author').value;
    const synopsis = this.agentForm.get('synopsis').value;
    const email = this.agentForm.get('email').value;
    const tel = this.agentForm.get('tel').value;
    const newAgent = new Agent(title, author);
    newAgent.synopsis = synopsis;
    newAgent.tel = tel;
    newAgent.add = this.add;
    newAgent.email = email;

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

  onBack() {
    this.router.navigate(['/agents']);
  }
  


}


  
  



