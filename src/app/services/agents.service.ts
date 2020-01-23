import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Agent } from '../models/agent.model';
import DataSnapshot = firebase.database.DataSnapshot;
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {

  constructor() {
    this.getAgents();
    }

  agents: Agent[] = [];
  agentsSubject = new Subject<Agent[]>();

  emitAgents() {
    this.agentsSubject.next(this.agents);
  }
  saveAgents() {
    firebase.database().ref('/agents').set(this.agents);
}
  
  getAgents() {
    firebase.database().ref('/agents')
      .on('value', (data: DataSnapshot) => {
          this.agents = data.val() ? data.val() : [];
          this.emitAgents();
        }
      );
  }

  getSingleAgent(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/agents/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  createNewAgent(newAgent: Agent) {
    this.agents.push(newAgent);
    this.saveAgents();
    this.emitAgents();
  }

  removeBook(agent: Agent) {
    const agentIndexToRemove = this.agents.findIndex(
      (agentEl) => {
        if(agentEl === agent) {
          return true;
        }
      }
    );
    this.agents.splice(agentIndexToRemove, 1);
    this.saveAgents();
    this.emitAgents();
  }

}
