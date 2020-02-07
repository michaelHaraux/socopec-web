import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Vehicule } from '../models/vehicule.model';
import { vehiculeBackup } from '../models/vehiculeBackup.models';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;


@Injectable({
  providedIn: 'root'
})
export class VehiculesService {


  constructor(private authService: AuthService) {
    this.getVehicules();
    this.getVehiculesBackup();
  }

  agentDelete : string;
  isAdmin: boolean;
  isAuth: boolean;
  utilisateur: string
  vehicules: Vehicule[] = [];
  vehiculesBackup : vehiculeBackup [] = [];
  vehiculesSubject = new Subject<Vehicule[]>();
  vehiculesBackupSubject = new Subject<vehiculeBackup[]>();

  
 
  emitVehicules() {
    this.vehiculesSubject.next(this.vehicules);
  }
  saveVehicules() {
    firebase.database().ref('/vehicules').set(this.vehicules);
  }

  emitVehiculesBackup() {
    this.vehiculesBackupSubject.next(this.vehiculesBackup);
  }
  saveVehiculesBackup() {
    firebase.database().ref('/vehiculeBackup').set(this.vehiculesBackup);
  }

  getVehicules() {
    firebase.database().ref('/vehicules')
      .on('value', (data: DataSnapshot) => {
        this.vehicules = data.val() ? data.val() : [];
        this.emitVehicules();
      }
      );
  }

  getVehiculesBackup() {
    firebase.database().ref('/vehiculeBackup')
      .on('value', (data: DataSnapshot) => {
        this.vehiculesBackup = data.val() ? data.val() : [];
        this.emitVehiculesBackup();
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

  backupVehicule(vehiculeBackup: vehiculeBackup){
    console.log(vehiculeBackup.dateDelete);
    this.vehiculesBackup.push(vehiculeBackup);
    this.saveVehiculesBackup();
    this.emitVehiculesBackup();
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

  removeVehiculeBackup(vehiculeBackup: vehiculeBackup) {
    const vehiculeIndexToRemove = this.vehiculesBackup.findIndex(
      (vehiculeBackupE1) => {
        if (vehiculeBackupE1 === vehiculeBackup) {
          return true;
        }
      }
    );
    this.vehiculesBackup.splice(vehiculeIndexToRemove, 1);
     this.saveVehiculesBackup();
     this.emitVehiculesBackup();
   }

}
