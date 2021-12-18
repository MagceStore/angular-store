import { GlobalErrorHandlerService, HandleError } from './../../shared/services/global-error-handler.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Authentication, Register, ResetPassword } from '../interfaces/anthentication';
import { tap, catchError, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of, throwError, Observable } from 'rxjs';

const httpOptions = {
  responseType: 'json' as const,
  withCredentials: true,
};

interface isLoggedIn {
  status: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn = false;
  redirectUrl: string = '';
  private handleError: HandleError;


  private _backEndUrl = 'http://magce.store/api';
  private _setTokenUrl = 'http://magce.store/sanctum/csrf-cookie';

  constructor(
    private http: HttpClient,
    private _router: Router,
    httpErrorHandler: GlobalErrorHandlerService) {
    this.handleError = httpErrorHandler.createHandleError('AuthenticationService');
  }

  login(loginUser: Authentication) {
    this.initCSRFToken().subscribe();
    return this.http.post<any>(this._backEndUrl + '/login', loginUser, httpOptions).pipe(
      tap(() => this.isLoggedIn = true),
      catchError(this.handleError('login', []))

    );
  }

  initCSRFToken() {
    return this.http.get(this._setTokenUrl, httpOptions).pipe(
      catchError(this.handleError('init csrf', []))
    )
  }

  logout() {
    return this.http.post<any>(this._backEndUrl + '/logout', [], httpOptions).pipe(
      tap(() => this.isLoggedIn = false),
      catchError(this.handleError('logout', []))
    );
  }

  checkLogin(): Observable<boolean> {
    return this.http.get<isLoggedIn>(this._backEndUrl + '/isLoggedIn', httpOptions).pipe(
      catchError(this.handleError('check login', [])),
      switchMap((response: any) => {
        return of(response.status);
      }),
    );
  }

  register(registerUser: Register) {
    return this.http.post<any>(this._backEndUrl + '/register', registerUser, httpOptions).pipe(
      tap(() => this.isLoggedIn = true),
      catchError(this.handleError('register', [])),
    );
  }

  forgotPassword(email: string) {
    return this.http.post<any>(this._backEndUrl + '/forgot-password', {email: email}, httpOptions).pipe(
      catchError(this.handleError('forgot password', [])),
    );
  }

  resetPassword(resetPass: ResetPassword) {
    return this.http.post<any>(this._backEndUrl + '/reset-password', resetPass, httpOptions).pipe(
      catchError(this.handleError('reset password', [])),
    );
  }

  faildedLogin() {
    this.isLoggedIn = false;
    this._router.navigate(['/auth/login']);
  }
}
