import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
//import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {
  title = 'SOCOPEC';
  afficher = false;
  login: Boolean;


  /*constructor(private loginComponent: LoginComponent) { }
  ngOnInit() {
    const loginObservable = this.loginComponent.getLogin();
    loginObservable.subscribe((loginData: boolean) => {
      this.login = loginData;
    });
  }*/
    

  }


