import { User } from './../interfaces/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Login } from '../interfaces/auth/login';

const httpOptions = {
  responseType: 'json' as const,
  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _backEndUrl = 'http://magce.store/api';
  private _setTokenUrl = 'http://magce.store/sanctum/csrf-cookie';

  constructor(private http: HttpClient) {}

  login(loginUser: Login) {
    return this.http.post<any>(this._backEndUrl + '/login', loginUser, httpOptions);
  }

  initCSRFToken() {
    return this.http.get(this._setTokenUrl, httpOptions)
  }
}
