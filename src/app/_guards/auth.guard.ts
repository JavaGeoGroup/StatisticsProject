import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){}

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(localStorage.getItem('currentUser')){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
