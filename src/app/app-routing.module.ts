import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AGENTComponent } from './agent/agent.component';
import { AGENCEComponent } from './agence/agence.component';
import { LISTEVEHICULESComponent } from './liste-vehicules/liste-vehicules.component';
import { AccueilComponent } from './accueil/accueil.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/accueil',
    pathMatch: 'full'
  },
  { path: 'agents', component: AGENTComponent },
  { path: 'agences', component: AGENCEComponent },
  { path: 'listeVehicules', component: LISTEVEHICULESComponent },
  { path: 'accueil', component: AccueilComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
