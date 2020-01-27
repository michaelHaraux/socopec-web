import { Component, OnDestroy, OnInit } from '@angular/core';
import { AgencesService } from '../services/agences.service';
import { Agence } from '../models/agence.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-agence-list',
  templateUrl: './agence-list.component.html',
  styleUrls: ['./agence-list.component.scss']
})
export class AgenceListComponent implements OnInit, OnDestroy {

  agences: Agence[];
  agencesSubscription: Subscription;

  constructor(private agencesService: AgencesService, private router: Router) {}

  ngOnInit() {
    this.agencesSubscription = this.agencesService.agencesSubject.subscribe(
      (agences: Agence[]) => {
        this.agences = agences;
      }
    );
    this.agencesService.emitAgences();
  }

  onNewAgence() {
    this.router.navigate(['/agences', 'new']);
  }

  onDeleteAgence(agence: Agence) {
    this.agencesService.removeAgence(agence);
  }

  onViewAgence(id: number) {
    this.router.navigate(['/agences', 'view', id]);
  }
  
  ngOnDestroy() {
    this.agencesSubscription.unsubscribe();
  }
  onBack() {
    this.router.navigate(['/accueil']);
  }
  

}
