import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

import { AuthService } from "../../services/auth/auth-service.service";
import { Observable } from 'rxjs';

@Injectable()

export class AuthenticatedGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<true> | Promise<boolean> | boolean {
        this.authService.isAuthenticated.subscribe((isAuth) => {
            if(!isAuth) {
                this.router.navigate(['login'])
                return false
            }
        })
        return true
        
    }
}

