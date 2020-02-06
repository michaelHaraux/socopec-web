import { Component, OnDestroy, OnInit } from '@angular/core';
import { AgentsService } from '../services/agents.service';
import { Agent } from '../models/agent.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent implements OnInit, OnDestroy {

  agents: Agent[];
  agentsSubscription: Subscription;
  isAdmin: boolean;
  isAuth: boolean;
  utilisateur: string

  constructor(private agentsService: AgentsService, private router: Router) {}

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
    this.agentsSubscription = this.agentsService.agentsSubject.subscribe(
      (agents: Agent[]) => {
        this.agents = agents;
      }
    );
    this.agentsService.emitAgents();
  }

  onNewAgent() {
    this.router.navigate(['/agents', 'new']);
  }

  onDeleteAgent(agent: Agent) {
    this.agentsService.removeAgent(agent);
  }

  onViewAgent(id: number) {
    this.router.navigate(['/agents', 'view', id]);
  }
  
  ngOnDestroy() {
    this.agentsSubscription.unsubscribe();
  }
  onBack() {
    this.router.navigate(['/accueil']);
  }
  

}
