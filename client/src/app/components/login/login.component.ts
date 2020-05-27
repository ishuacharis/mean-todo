import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpErrorResponse } from "@angular/common/http";
import {  map } from "rxjs/operators";


import { AuthService } from "../../services/auth/auth-service.service";

import { UsernameCustomValidators } from "../../validators/username-validator";

import { ShowErrorsComponent } from '../show-errors/show-errors.component'
import { UserInterface } from 'src/app/models/user/user-interface';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Login } from 'src/app/actions/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>) { 
      
    }

  ngOnInit() {
    this.loginForm = this.formGroup()
  }

  login() {
    const returnUser: UserInterface = {
      username: this.username.value,
      password: this.password.value
    }
    this.authService.authenticateUser(returnUser)
      .pipe(map((res) => {
        localStorage.setItem('token', JSON.stringify(res["token"]))
        return res["user"]
      }))
      .subscribe(
      (user) =>{
        if (user){
          localStorage.setItem('currentUser', JSON.stringify(user))
          localStorage.setItem('isLoggedIn', JSON.stringify(true))
          this.authService.user$.next(user)
          this.authService.isAuthenticated$.next(true)
          this.router.navigate(['/'])
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log(`Client-side error ${JSON.stringify(err)}`)
        } else {
          console.log(err)
          console.log(`Server-side error ${JSON.stringify(err)}`)
        }

      }
    )
    
  }

  formGroup() {
    return this.fb.group({
      username: ['', [Validators.required,]],
      password: ['', Validators.required]
    })
  }

  get username() {
    return this.loginForm.get('username')
  }

  get password() {
    return this.loginForm.get('password')
  }

}
