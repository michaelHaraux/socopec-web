import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgenceListComponent } from './agence-list/agence-list.component';
import { VehiculeListComponent } from './vehicule-list/vehicule-list.component';
import {AgentListComponent} from './agent-list/agent-list.component';
import {AgentFormComponent} from './agent-list/agent-form/agent-form.component';
import {VehiculeFormComponent} from './vehicule-list/vehicule-form/vehicule-form.component';
import {SingleAgentComponent} from './agent-list/single-agent/single-agent.component';
import {AgenceFormComponent} from './agence-list/agence-form/agence-form.component';
import {SingleAgenceComponent} from './agence-list/single-agence/single-agence.component';
import {SingleVehiculeComponent} from './vehicule-list/single-vehicule/single-vehicule.component';
import { LISTEVEHICULESComponent } from './liste-vehicules/liste-vehicules.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AuthGuardService } from './services/auth-guard.service';
import {EditVehiculeComponent} from './vehicule-list/edit-vehicule/edit-vehicule.component'
import {EditAgenceComponent} from './agence-list/edit-agence/edit-agence.component'

  const appRoutes: Routes = [
    { path: 'auth/signup', component: SignupComponent },
    { path: 'auth/signin', component: SigninComponent },
    { path: 'agents', canActivate: [AuthGuardService], component: AgentListComponent },
    { path: 'accueil/agents', canActivate: [AuthGuardService], component: AgentListComponent },
    { path: 'agents/new', canActivate: [AuthGuardService], component: AgentFormComponent },
    { path: 'agents/view/:id', canActivate: [AuthGuardService], component: SingleAgentComponent },

    { path: 'vehicules', canActivate: [AuthGuardService], component: VehiculeListComponent },
    { path: 'accueil/vehicules', canActivate: [AuthGuardService], component: VehiculeListComponent },
    { path: 'vehicules/new', canActivate: [AuthGuardService], component: VehiculeFormComponent },
    { path: 'vehicules/edit/:id', canActivate: [AuthGuardService], component: EditVehiculeComponent },
    { path: 'vehicules/view/:id', canActivate: [AuthGuardService], component: SingleVehiculeComponent },

    { path: 'agences', canActivate: [AuthGuardService], component: AgenceListComponent },
    { path: 'accueil/agences', canActivate: [AuthGuardService], component: AgenceListComponent },
    { path: 'agences/new', canActivate: [AuthGuardService], component: AgenceFormComponent },
    { path: 'agences/edit/:id', canActivate: [AuthGuardService], component: EditAgenceComponent },
  
    { path: 'agences/view/:id', canActivate: [AuthGuardService], component: SingleAgenceComponent },
    { path: 'listeVehicules', canActivate: [AuthGuardService], component: LISTEVEHICULESComponent },
    { path: 'accueil/listeVehicules', canActivate: [AuthGuardService], component: LISTEVEHICULESComponent },
    { path: 'accueil', canActivate: [AuthGuardService],component: AccueilComponent },
    
  ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
