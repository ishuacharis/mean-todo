import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {  } from "@angular/router";
import { map } from "rxjs/operators";

import { AuthService } from "../../services/auth/auth-service.service";
import { UserInterface } from 'src/app/models/user/user-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  usernameErr: string
  emailErr: string

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
    ) { 
    
    }

  ngOnInit() {
    this.registerForm = this.formGroup()
  }

  register() {
    try {
      const newUser: UserInterface = {
        username: this.username.value,
        email: this.email.value,
        password: this.password.value
      }
      this.authService.registerUser(newUser)
      .pipe(map((res) => {
        localStorage.setItem('token', JSON.stringify(res["token"]))
        return res["user"]
      })).subscribe(
          (user) => {
            if (user) {
              localStorage.setItem('currentUser', JSON.stringify(user))
              localStorage.setItem('isLoggedIn', JSON.stringify(true))
              //this.store.dispatch(new Register(user))
              this.authService.user$.next(user)
              this.authService.isAuthenticated$.next(true)
              this.router.navigate(['/'])
            }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log(`Client-side error ${JSON.stringify(err)}`)
          } else {
            if(Object.keys(err.error)[0] === 'username') {
              this.usernameErr = err.error.username
            }
            if (Object.keys(err.error)[0] === 'email') {
              this.emailErr = err.error.email
            }
            console.log(err)
            console.log(`Server-side error ${JSON.stringify(err)}`)
          }
        }
      )
    } catch (error) {
      console.log(error.message)
    }
    
  }

  formGroup() {
    return this.fb.group({
      username: ['', [Validators.required, Validators.min(5), Validators.max(15)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required, ]
    })
  }

  get username() {
    return this.registerForm.get('username')
  }

  get email() {
    return this.registerForm.get('email')
  } 

  get password() {
    return this.registerForm.get('password')
  }


}
