import { catchError, Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as authInterface from '../interfaces/anthentication';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isLoggedIn: boolean = false;
  user: authInterface.User | null = null;
  redirectUrl: string = '';

  constructor(private http: HttpClient) {}

  login(loginUser: authInterface.Login): Observable<string> {
    this.initCSRFToken();
    return this.http
      .post<authInterface.LoginAndRegisterResponse>(
        environment.backendUrl + '/login',
        loginUser
      )
      .pipe(
        map((response) => {
          this.loginSequent(response.user);
          console.info('[AuthService][login]:' + response.message);
          return response.message;
        })
      );
  }

  private loginSequent(user: authInterface.User): void {
    this.isLoggedIn = true;
    this.user = user;
  }

  private initCSRFToken() {
    return this.http.get(environment.backendCsrfUrl).pipe(take(1));
  }

  logout(): Observable<string> {
    return this.http
      .post<authInterface.MessageResponse>(
        environment.backendUrl + '/logout',
        []
      )
      .pipe(
        map((response) => {
          this.logoutSequent();
          console.info('[AuthService][logout]:' + response.message);
          return response.message;
        })
      );
  }

  logoutSequent(): void {
    this.isLoggedIn = false;
    this.user = null;
  }

  checkLogin(): Observable<boolean> {
    if (this.isLoggedIn) {
      return of(this.isLoggedIn);
    }

    return this.http
      .get<authInterface.IsLoggedInResponse>(
        environment.backendUrl + '/isLoggedIn'
      )
      .pipe(
        map((response) => {
          this.loginSequent(response.user);
          console.info('[AuthService][checkLogin]:' + response.status);
          return response.status;
        }),
        catchError(() => of(false))
      );
  }

  register(registerUser: authInterface.Register): Observable<string> {
    return this.http
      .post<authInterface.LoginAndRegisterResponse>(
        environment.backendUrl + '/register',
        registerUser
      )
      .pipe(
        map((response) => {
          this.loginSequent(response.user);
          console.info('[AuthService][register]:' + response.message);
          return response.message;
        })
      );
  }

  forgotPassword(
    forgotPassword: authInterface.ForgotPassword
  ): Observable<authInterface.ForgotPasswordResponse> {
    return this.http.post<authInterface.ForgotPasswordResponse>(
      environment.backendUrl + '/forgot-password',
      forgotPassword
    );
  }

  resetPassword(
    resetPass: authInterface.ResetPassword
  ): Observable<authInterface.ResetPasswordResponse> {
    return this.http.post<authInterface.ResetPasswordResponse>(
      environment.backendUrl + '/reset-password',
      resetPass
    );
  }
}
