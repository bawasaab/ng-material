import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGaurd implements CanActivate {

    constructor( private authService: AuthService, private router: Router ) {}

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) : any {

        if( this.authService.isAuth() ) {
            return true;
        } else {
            this.router.navigate([`/login`]);
        }
    }
}