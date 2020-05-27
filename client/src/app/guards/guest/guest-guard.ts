import { Injectable,  } from "@angular/core";

import { Router,
    CanActivate, 
    ActivatedRouteSnapshot,
     RouterStateSnapshot } from "@angular/router";

import { AuthService } from "../../services/auth/auth-service.service";
import { Observable } from 'rxjs';

@Injectable()

export class GuestGuard implements CanActivate {

    constructor( 
        private authService: AuthService, 
        private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<true> | Promise<boolean> | boolean {

        let user = localStorage.getItem("currentUser")
        user = (user !== null) ? JSON.parse(user) : null
        if (!user) {
            return true
        }
        return false
    }
}