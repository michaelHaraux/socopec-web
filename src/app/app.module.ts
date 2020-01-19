import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule

  ],
  providers: [HTTPNODESERVICEService],
  bootstrap: [AppComponent]
})
export class AppModule { }
