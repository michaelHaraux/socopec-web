import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTPNODESERVICEService } from './http-node-service.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VEHICULEComponent } from './vehicule/vehicule.component';
import { LISTEVEHICULESComponent } from './liste-vehicules/liste-vehicules.component';
import { AGENTComponent } from './agent/agent.component';
import { LISTEAGENTSComponent } from './liste-agents/liste-agents.component';
import { LISTEAGENCESComponent } from './liste-agences/liste-agences.component';
import { AGENCEComponent } from './agence/agence.component';
import { AjoutVehiculeComponent } from './ajout-vehicule/ajout-vehicule.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    VEHICULEComponent,
    LISTEVEHICULESComponent,
    AGENTComponent,
    LISTEAGENTSComponent,
    LISTEAGENCESComponent,
    AGENCEComponent,
    AjoutVehiculeComponent,
    AccueilComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    
  ],
  providers: [HTTPNODESERVICEService,AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
