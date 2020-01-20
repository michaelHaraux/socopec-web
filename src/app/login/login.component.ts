import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from 'rxjs';
//import { FirebaseAuth } from 'angularfire2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

@Injectable()
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
  model: any = {};

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  onSubmit() {
    
      this.submitted = true;
      if (this.loginForm.invalid) {
        return;
      }
      if (this.loginForm.controls.email.value == 'admin@gmail.com' && this.loginForm.controls.password.value == 'admin') {
        this.invalidLogin = false;
        localStorage.setItem('user', JSON.stringify({ login: this.model.username }));
        this.router.navigate(['accueil']);

      } else {
        this.invalidLogin = true;
      }

  
 

  }
 
/*  public getLogin(): any {
  const loginObservable = new Observable(observer => {
    if (this.loginForm.invalid) observer.next(false)
    else observer.next(true);
    })
 
  return loginObservable;

  }*/
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }



}
