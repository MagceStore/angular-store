import { Login } from 'src/app/auth/interfaces/anthentication';

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _service: AuthenticationService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  errors: any;

  onSubmit(f: NgForm): void {
    const loginUser: Login = { ...f.value };
    this._service.login(loginUser).subscribe({
      next: (message) => {
        console.info('[LoginComponent][login]:' + message);
        if (this._service.isLoggedIn && this._service.user) {
          this._router.navigate([this._service.redirectUrl]);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.errors = Object.values(error.error.errors);
        throw error;
      },
    });
  }
}
