import { tap } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ResetPassword } from '../../interfaces/anthentication';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  errors: any;
  token: string | null = null;

  constructor(
    private _service: AuthenticationService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.paramMap
      .pipe(
        tap((params) => {
          this.token = params.get('token');
          if (this.token === null) {
            this._router.navigate(['/auth/login']);
          }
        })
      )
      .subscribe();
  }

  onSubmit(f: NgForm): void {
    const resetPass: ResetPassword = { ...f.value, token: this.token };
    this._service.resetPassword(resetPass).subscribe({
      next: (v) => {
        if (v) {
          this._router.navigate(['/auth/login']);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.errors = Object.values(error.error.errors);
        throw error;
      },
    });
  }
}
