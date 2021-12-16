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

  private _backEndUrl = 'http://magce.store/api';
  private _setTokenUrl = 'http://magce.store/sanctum/csrf-cookie';

  constructor(private http: HttpClient, private _router: Router) {}

  login(loginUser: Authentication) {
    this.initCSRFToken().subscribe();
    return this.http.post<any>(this._backEndUrl + '/login', loginUser, httpOptions).pipe(
      tap(() => this.isLoggedIn = true),
      catchError(this.handleError)
    );
  }

  initCSRFToken() {
    return this.http.get(this._setTokenUrl, httpOptions)
  }

  logout() {
    return this.http.post<any>(this._backEndUrl + '/logout', [], httpOptions).pipe(
      tap(() => this.isLoggedIn = false),
      catchError(this.handleError)
    );
  }

  checkLogin(): Observable<boolean> {
    return this.http.get<isLoggedIn>(this._backEndUrl + '/isLoggedIn', httpOptions).pipe(
      switchMap(response => {
        return of(response.status);
      }),
      catchError(err => {
        console.error('An error occurred:', err.error);

        if (err.status === 401 || err.status === 419) {
          //Unauthenticated
          this.isLoggedIn = false;
          this._router.navigate(['/auth/login']);
        }

        return throwError(() => err.error);
      })
    );
  }

  register(registerUser: Register) {
    return this.http.post<any>(this._backEndUrl + '/register', registerUser, httpOptions).pipe(
      tap(() => this.isLoggedIn = true),
      catchError(this.handleError)
    );
  }

  forgotPassword(email: string) {
    return this.http.post<any>(this._backEndUrl + '/forgot-password', {email: email}, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  resetPassword(resetPass: ResetPassword) {
    return this.http.post<any>(this._backEndUrl + '/reset-password', resetPass, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    }

    // if (error.status === 401) {
    //   //Unauthenticated
    //   this.isLoggedIn = false;
    //   this._router.navigate(['/auth/login']);
    // }

    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(`Backend returned code ${error.status}, body was: `, error.error);
    // Return an observable with a user-facing error message.
    return throwError(() => error.error);
  }
}
