import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
// this check if we are the admin every time we try to navigate to an other route
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;

    return this.authService.isAdmin().then(auth => {
      if(auth){

        return true;
      }
      console.log("Unauthorized - back to home page")
      this.router.navigate(["/home"]);
      return false;
    })
  }
  
}
