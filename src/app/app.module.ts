import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTPNODESERVICEService } from './http-node-service.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VEHICULEComponent } from './vehicule/vehicule.component';
import { LISTEVEHICULESComponent } from './liste-vehicules/liste-vehicules.component';
import { AjoutVehiculeComponent } from './ajout-vehicule/ajout-vehicule.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AgentListComponent } from './agent-list/agent-list.component';
import { SingleAgentComponent } from './agent-list/single-agent/single-agent.component';
import { AgentFormComponent } from './agent-list/agent-form/agent-form.component';
import { Subject } from 'rxjs';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { AgenceListComponent } from './agence-list/agence-list.component';
import { AgenceFormComponent } from './agence-list/agence-form/agence-form.component';
import { SingleAgenceComponent } from './agence-list/single-agence/single-agence.component';
import { VehiculeListComponent } from './vehicule-list/vehicule-list.component';
import { SingleVehiculeComponent } from './vehicule-list/single-vehicule/single-vehicule.component';
import { VehiculeFormComponent } from './vehicule-list/vehicule-form/vehicule-form.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    VEHICULEComponent,
    LISTEVEHICULESComponent,
    AjoutVehiculeComponent,
    AccueilComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    AgentListComponent,
    SingleAgentComponent,
    AgentFormComponent,
    AgenceListComponent,
    AgenceFormComponent,
    SingleAgenceComponent,
    VehiculeListComponent,
    SingleVehiculeComponent,
    VehiculeFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    
  ],
  providers: [HTTPNODESERVICEService,AuthService, AuthGuardService,Subject,{provide: LOCALE_ID, useValue: "fr-CA" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
