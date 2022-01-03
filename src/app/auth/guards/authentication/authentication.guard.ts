import { map, Observable, take } from 'rxjs';

import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree
} from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate, CanActivateChild {
  constructor(
    private _router: Router,
    private _service: AuthenticationService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this._service.checkLogin().pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          return true;
        }

        // Store the attempted URL for redirecting
        this._service.redirectUrl = state.url;

        // Redirect to the login page
        return this._router.parseUrl('auth');
      }),
      take(1)
    );
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }
}
