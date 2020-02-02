import { Component, OnInit } from '@angular/core';
import { Agent } from '../../models/agent.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentsService } from '../../services/agents.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-single-agent',
  templateUrl: './single-agent.component.html',
  styleUrls: ['./single-agent.component.scss']
})
export class SingleAgentComponent implements OnInit {

  id : number;
  agent: Agent;
  droitAdd: boolean;
  constructor(private route: ActivatedRoute, private agentsService: AgentsService,
    private router: Router) { }

  ngOnInit() {
    this.agent = new Agent('', '');
    const id = this.route.snapshot.params['id'];
    this.id = id;
    this.agentsService.getSingleAgent(+id).then(
      (agent: Agent) => {
        this.agent = agent;
        if (this.agent.add) {
          this.droitAdd = true
        } else {
          this.droitAdd = false;
        }

      }
    );

  }
  onEditAgent(id: number) {
    this.router.navigate(['/agents', 'edit',this.id]);
}
  onBack() {
    this.router.navigate(['/agents']);
  }


}