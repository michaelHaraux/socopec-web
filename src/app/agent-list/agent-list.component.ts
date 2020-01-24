import { Component, OnDestroy, OnInit } from '@angular/core';
import { AgentsService } from '../services/agents.service';
import { Agent } from '../models/agent.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent implements OnInit, OnDestroy {

  agents: Agent[];
  agentsSubscription: Subscription;

  constructor(private agentsService: AgentsService, private router: Router) {}

  ngOnInit() {
    this.agentsSubscription = this.agentsService.agentsSubject.subscribe(
      (books: Agent[]) => {
        this.agents = books;
      }
    );
    this.agentsService.emitAgents();
  }

  onNewAgent() {
    this.router.navigate(['/agents', 'new']);
  }

  onDeleteAgent(agent: Agent) {
    this.agentsService.removeBook(agent);
  }

  onViewAgent(id: number) {
    this.router.navigate(['/agents', 'view', id]);
  }
  
  ngOnDestroy() {
    this.agentsSubscription.unsubscribe();
  }

  

}