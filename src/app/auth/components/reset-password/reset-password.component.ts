import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { tap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { ResetPassword } from '../../interfaces/anthentication';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  errors: any;
  token: string | null = null;

  constructor(
    private _service: AuthenticationService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._route.paramMap.pipe(
      tap(params => {
        this.token = params.get('token');
        if (this.token === null) {
          this._router.navigate(['/auth/login']);
        }
      })
    ).subscribe();
  }


  onSubmit(f: NgForm): void {
    const resetPass: ResetPassword = { ...f.value, token: this.token }
    console.log(resetPass);
    this._service.resetPassword(resetPass)
      .subscribe({
        next: () => {
          this._router.navigate(['/auth/login']);
        },
        error: (e) => {
          this.errors  = Object.values(e.errors);
        }
      });
  }

}
