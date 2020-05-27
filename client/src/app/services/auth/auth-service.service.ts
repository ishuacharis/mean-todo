import { Injectable } from '@angular/core';
import { HttpClient , HttpResponse, HttpHeaders} from "@angular/common/http";
import { map } from "rxjs/operators";
import { UserInterface } from "../../models/user/user-interface"
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$ = new BehaviorSubject<UserInterface>(<UserInterface>{})
  currentUser: Observable<UserInterface>
  public isAuthenticated$ = new BehaviorSubject<boolean>(false)
  isAuthenticated: Observable<boolean>
  
  constructor(private http: HttpClient, private router: Router) { 

    const savedUser = JSON.parse(localStorage.getItem("currentUser"))
    this.user$ = new BehaviorSubject(savedUser)
    this.currentUser = this.user$.asObservable()
    const auth = JSON.parse(localStorage.getItem("isLoggedIn"))
    this.isAuthenticated$ = new BehaviorSubject(auth)
    this.isAuthenticated = this.isAuthenticated$.asObservable()
  }

  get currentUserValue() : UserInterface {
    return this.user$.value
  }

  get isAuthenticatedValue(): boolean {
    return this.isAuthenticated$.value
  }
 

  registerUser(newUser: UserInterface): Observable<UserInterface> {
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': "application/json"
      })
    }

    const {username, email ,password} =  newUser
    const body = {
      username: username,
      email: email,
      password: password
    }
    
    return this.http.post<UserInterface>('http://localhost:3000/auth/register', body, {
      headers: headerOptions.headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<UserInterface>) => res["body"]))

  }

  authenticateUser(returnUser: UserInterface): Observable<UserInterface> {
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    const {username, password}  = returnUser
    const body = {
      username: username,
      password: password
    }
    return this.http.post<UserInterface>('http://localhost:3000/auth/login', body, {
      headers: headerOptions.headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<UserInterface>) => res["body"]))
  }


  logout() {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("token")
    this.isAuthenticated$.next(false)
    this.router.navigate(['login'])
  }



}
