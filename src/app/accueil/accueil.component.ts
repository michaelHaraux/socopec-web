import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  getLogin() {
    return JSON.parse(localStorage.getItem('user')).login;
  }

  logout() {
    console.log('Tentative de déconnexion');

    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
