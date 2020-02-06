import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Vehicule } from '../models/vehicule.model';
import DataSnapshot = firebase.database.DataSnapshot;
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class VehiculesService {

  constructor() {
    this.getVehicules();
  }

  vehicules: Vehicule[] = [];
  vehiculesSubject = new Subject<Vehicule[]>();

  emitVehicules() {
    this.vehiculesSubject.next(this.vehicules);
  }
  saveVehicules() {
    firebase.database().ref('/vehicules').set(this.vehicules);
  }

  getVehicules() {
    firebase.database().ref('/vehicules')
      .on('value', (data: DataSnapshot) => {
        this.vehicules = data.val() ? data.val() : [];
        this.emitVehicules();
      }
      );
  }

  getSingleVehicule(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/vehicules/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  createNewVehicule(newVehicule: Vehicule) {
    this.vehicules.push(newVehicule);
    this.saveVehicules();
    this.emitVehicules();
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
  removeVehicule(vehicule: Vehicule) {
    console.log("service; " + vehicule);
    if(vehicule.photo) {
      const storageRef = firebase.storage().refFromURL(vehicule.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
    const vehiculeIndexToRemove = this.vehicules.findIndex(
      (vehiculeEl) => {
        if (vehiculeEl === vehicule) {
          return true;
        }
      }
    );
    this.vehicules.splice(vehiculeIndexToRemove, 1);
    this.saveVehicules();
    this.emitVehicules();
  }
  removeVehiculeEdit(id: number) {
   // console.log("service; " + id);

    this.vehicules.splice(id, 1);
    this.saveVehicules();
    this.emitVehicules();
  }

}
