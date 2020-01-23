import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agent } from '../../models/agent.model';
import { AgentsService } from '../../services/agents.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-form',
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.scss']
})
export class AgentFormComponent implements OnInit {

  agentForm: FormGroup;

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
    this.agentsService.createNewAgent(newAgent);
    this.router.navigate(['/agents']);
  }
}


