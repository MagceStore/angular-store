import { catchError, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Authentication, isLoggedIn, Register, ResetPassword } from '../interfaces/anthentication';

const httpOptions = {
  responseType: 'json' as const,
  withCredentials: true,
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isLoggedIn = false;
  redirectUrl: string = '';

  private _backEndUrl = 'http://magce.store/api';
  private _setTokenUrl = 'http://magce.store/sanctum/csrf-cookie';

  constructor(private http: HttpClient, private _router: Router) {}

  login(loginUser: Authentication) {
    this.initCSRFToken().subscribe();
    return this.http
      .post<any>(this._backEndUrl + '/login', loginUser, httpOptions)
      .pipe(tap(() => (this.isLoggedIn = true)));
  }

  initCSRFToken() {
    return this.http.get(this._setTokenUrl, httpOptions).pipe();
  }

  logout() {
    return this.http
      .post<any>(this._backEndUrl + '/logout', [], httpOptions)
      .pipe(tap(() => (this.isLoggedIn = false)));
  }

  checkLogin(): Observable<boolean> {
    return this.http
      .get<isLoggedIn>(this._backEndUrl + '/isLoggedIn', httpOptions)
      .pipe(
        switchMap((response: any) => {
          return of(response.status);
        }),
        catchError(() => of(false))
      );
  }

  register(registerUser: Register) {
    return this.http
      .post<any>(this._backEndUrl + '/register', registerUser, httpOptions)
      .pipe(tap(() => (this.isLoggedIn = true)));
  }

  forgotPassword(email: string) {
    return this.http
      .post<any>(
        this._backEndUrl + '/forgot-password',
        { email: email },
        httpOptions
      )
      .pipe();
  }

  resetPassword(resetPass: ResetPassword) {
    return this.http
      .post<any>(this._backEndUrl + '/reset-password', resetPass, httpOptions)
      .pipe();
  }

  faildedLogin() {
    this.isLoggedIn = false;
    this._router.navigate(['/auth/login']);
  }
}
