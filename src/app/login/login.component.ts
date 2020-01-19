import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
//import { BehaviorSubject, Observable } from 'rxjs';
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

  constructor(private formBuilder: FormBuilder, private router: Router) { }
  onSubmit() {
    
      this.submitted = true;
      if (this.loginForm.invalid) {
        return;
      }
      if (this.loginForm.controls.email.value == 'admin@gmail.com' && this.loginForm.controls.password.value == 'admin') {
        this.invalidLogin = false;
        this.router.navigate(['accueil']);

      } else {
        this.invalidLogin = true;
      }


    
  }
 
  
  
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }



}
