import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';

import { Authentication } from 'src/app/auth/interfaces/anthentication';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _service: AuthenticationService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  errors: any;

  onSubmit(f: NgForm): void {
    const loginUser: Authentication = {...f.value}
    this._service.login(loginUser)
      .subscribe({
        next: () => {
          if (this._service.isLoggedIn) {
            this._router.navigate([this._service.redirectUrl]);
          }
        },
      });
  }
}
