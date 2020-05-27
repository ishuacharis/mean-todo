import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import {select, Store  } from "@ngrx/store";
import { Observable } from "rxjs";

import { AuthService } from "../../../services/auth/auth-service.service";
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/models/user/user-interface';

import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() user: UserInterface
  @Input() isAuthenticated: boolean
  @Output() logout = new EventEmitter<boolean>()
  constructor(

    ) { 
      
      
    }

  ngOnInit() {
    //this.user = this.store.pipe(select('auth'))
    //this.user.subscribe(value => console.log(value))
    
  }

 logOut(event){
   this.logout.emit(true)
 }








} 
