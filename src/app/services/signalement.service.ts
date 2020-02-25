import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Signalement } from '../models/signalement.model';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class SignalementService {

  constructor(private authService: AuthService) {
    this.getSignalement();
  }

  agentDelete : string;
  isAdmin: boolean;
  isAuth: boolean;
  utilisateur: string
  signalements: Signalement[] = [];
  signalementsSubject = new Subject<Signalement[]>();

  
 
  emitSignalements() {
    this.signalementsSubject.next(this.signalements);
  }
  saveSignalements() {
    firebase.database().ref('/signalements').set(this.signalements);
  }

  getSignalement() {
    firebase.database().ref('/signalements')
      .on('value', (data: DataSnapshot) => {
        this.signalements = data.val() ? data.val() : [];
        this.emitSignalements();
      }
      );
  }

  getSingleSignalement() {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/signalements/').once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewSignalement(newSignalement: Signalement) {
    this.signalements.push(newSignalement);
    this.saveSignalements();
    this.emitSignalements();
  }
}
