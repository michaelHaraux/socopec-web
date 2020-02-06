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

  id: number;
  agent: Agent;
  droitAdd: boolean;
  isAdmin: boolean;
  isAuth: boolean;
  utilisateur: string;
  emailTest: string;
  agentCourant: boolean;
  test : number;

  constructor(private route: ActivatedRoute, private agentsService: AgentsService,
    private router: Router) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
          this.utilisateur = user.email;
          //console.log("1", this.utilisateur);
          if (this.utilisateur == "admin@gmail.com") {
            this.isAdmin = true;
          //  console.log("admin",this.isAdmin);
          } else { this.isAdmin = false }
        } else {
          this.isAuth = false;
        }
      }
      
    );
   
    this.agent = new Agent('', '');
    const id = this.route.snapshot.params['id'];
    this.id = id;
    this.agentsService.getSingleAgent(+id).then(
      (agent: Agent) => {
        this.agent = agent;
        this.emailTest = agent.email;
       // console.log("2", this.emailTest);
        //console.log("3", this.utilisateur);
      
        console.log(this.emailTest.valueOf());
        console.log(this.utilisateur.valueOf());

        if (this.emailTest.valueOf() === this.utilisateur.valueOf()) {
          this.agentCourant = true;
        } else {
          this.agentCourant = false;
        }

        console.log(this.agentCourant);
        if (this.agent.add) {
          this.droitAdd = true
        } else {
          this.droitAdd = false;
        }

      }



    );





  }
  onEditAgent(id: number) {
    this.router.navigate(['/agents', 'edit', this.id]);
  }
  onBack() {
    this.router.navigate(['/agents']);
  }


}