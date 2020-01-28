import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAdmin: boolean;
  isAuth: boolean;
  utilisateur: string
  constructor(private authService: AuthService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
          this.utilisateur=user.email
          if(this.utilisateur=="admin@gmail.com"){
            this.isAdmin = true;
          }else{this.isAdmin=false}
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  onSignOut() {
    this.isAdmin=false;
    this.authService.signOutUser();
  }

}
