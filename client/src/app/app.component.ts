import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth/auth-service.service';
import { UserInterface } from './models/user/user-interface';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  user: UserInterface
  isAuthenticated: boolean
  
  constructor(private authService: AuthService){
    this.authService.currentUser.subscribe((user) => {
      this.user = user
      console.log(this.user)
    })

    this.authService.isAuthenticated.subscribe((isAuth) => {
      this.isAuthenticated = isAuth
      console.log(this.isAuthenticated)
    })
  }

  ngOnInit() {
    
  }

  logout(ev) {
    if(ev === true) {
      this.authService.logout()
    }
  }
 




  

}
