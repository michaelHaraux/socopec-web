import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AGENTComponent } from './agent/agent.component';
import { AGENCEComponent } from './agence/agence.component';
import { LISTEVEHICULESComponent } from './liste-vehicules/liste-vehicules.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AuthGuardService } from './services/auth-guard.service';

  const appRoutes: Routes = [
    { path: 'auth/signup', component: SignupComponent },
    { path: 'auth/signin', component: SigninComponent },
    { path: 'agents', canActivate: [AuthGuardService], component: AGENTComponent },
    { path: 'agences', canActivate: [AuthGuardService], component: AGENCEComponent },
    { path: 'listeVehicules', canActivate: [AuthGuardService], component: LISTEVEHICULESComponent },
    { path: 'accueil', canActivate: [AuthGuardService],component: AccueilComponent },
    
  ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
