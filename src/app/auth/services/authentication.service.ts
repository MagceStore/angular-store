import { catchError, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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

  constructor(private http: HttpClient, private _router: Router) {}

  login(loginUser: Authentication) {
    this.initCSRFToken().subscribe();
    return this.http
      .post<any>(environment.backendUrl + '/login', loginUser, httpOptions)
      .pipe(tap(() => (this.isLoggedIn = true)));
  }

  initCSRFToken() {
    return this.http.get(environment.backendCsrfUrl, httpOptions).pipe();
  }

  logout() {
    return this.http
      .post<any>(environment.backendUrl + '/logout', [], httpOptions)
      .pipe(tap(() => (this.isLoggedIn = false)));
  }

  checkLogin(): Observable<boolean> {
    return this.http
      .get<isLoggedIn>(environment.backendUrl + '/isLoggedIn', httpOptions)
      .pipe(
        switchMap((response: any) => {
          return of(response.status);
        }),
        catchError(() => of(false))
      );
  }

  register(registerUser: Register) {
    return this.http
      .post<any>(
        environment.backendUrl + '/register',
        registerUser,
        httpOptions
      )
      .pipe(tap(() => (this.isLoggedIn = true)));
  }

  forgotPassword(email: string) {
    return this.http
      .post<any>(
        environment.backendUrl + '/forgot-password',
        { email: email },
        httpOptions
      )
      .pipe();
  }

  resetPassword(resetPass: ResetPassword) {
    return this.http
      .post<any>(
        environment.backendUrl + '/reset-password',
        resetPass,
        httpOptions
      )
      .pipe();
  }

  faildedLogin() {
    this.isLoggedIn = false;
    this._router.navigate(['/auth/login']);
  }
}
