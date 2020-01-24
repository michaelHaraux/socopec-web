import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  date = new Date();
  constructor() {
    const config = {
      
        apiKey: "AIzaSyBKo2au7gS7ax_Od9YgDa0z239aJMOBwVY",
        authDomain: "socopec-4432c.firebaseapp.com",
        databaseURL: "https://socopec-4432c.firebaseio.com",
        projectId: "socopec-4432c",
        storageBucket: "socopec-4432c.appspot.com",
        messagingSenderId: "750500139522",
        appId: "1:750500139522:web:5ce7ce036ffd2a63cc4d1b",
        measurementId: "G-0DD799JPB1"
      };
    
    firebase.initializeApp(config);
    
  }
}
