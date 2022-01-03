import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ForgotPassword } from '../../interfaces/anthentication';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  errors: any;
  constructor(
    private _service: AuthenticationService,
    private _router: Router
  ) {}
  ngOnInit(): void {}

  onSubmit(f: NgForm): void {
    console.log(f.value.email);
    const forgotPassword: ForgotPassword = { email: f.value.email };
    this._service.forgotPassword(forgotPassword).subscribe({
      next: (response) => {
        console.info('[ForgotPasswordComponent][onSubmit]:' + response.message);
        if (response.token) {
          this._router.navigate([
            '/auth/reset-pass',
            { token: response.token },
          ]);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.errors = Object.values(error.error.errors);
        throw error;
      },
    });
  }
}
