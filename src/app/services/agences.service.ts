import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Agence } from '../models/agence.model';
import DataSnapshot = firebase.database.DataSnapshot;
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AgencesService {

  constructor() {
    this.getAgences();
    }

  agences: Agence[] = [];
  agencesSubject = new Subject<Agence[]>();

  emitAgences() {
    this.agencesSubject.next(this.agences);
  }
  saveAgences() {
    firebase.database().ref('/agences').set(this.agences);
}
  
  getAgences() {
    firebase.database().ref('/agences')
      .on('value', (data: DataSnapshot) => {
          this.agences = data.val() ? data.val() : [];
          this.emitAgences();
        }
      );
  }

  getSingleAgence(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/agences/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  createNewAgence(newAgence: Agence) {
    this.agences.push(newAgence);
    this.saveAgences();
    this.emitAgences();
  }

  removeAgenceEdit(id: number) {

    this.agences.splice(id, 1);
    this.saveAgences();
    this.emitAgences();
  } 

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
}
removeAgence(agence: Agence) {
  if(agence.photo) {
    const storageRef = firebase.storage().refFromURL(agence.photo);
    storageRef.delete().then(
      () => {
        console.log('Photo removed!');
      },
      (error) => {
        console.log('Could not remove photo! : ' + error);
      }
    );
  }
  const agenceIndexToRemove = this.agences.findIndex(
    (agenceEl) => {
      if(agenceEl === agence) {
        return true;
      }
    }
  );
  this.agences.splice(agenceIndexToRemove, 1);
  this.saveAgences();
  this.emitAgences();
}

}
