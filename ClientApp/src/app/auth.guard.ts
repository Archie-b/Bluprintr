import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserToken } from './shared/UserToken';
import * as moment from 'moment';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('token')) {
      var token: UserToken = JSON.parse(localStorage.getItem('token'));
      if (((Date.now() - token.timestamp) / 1000 / 60) < 120) {
        localStorage.setItem('token', JSON.stringify(token));
        return true;
      }
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
