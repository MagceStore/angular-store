import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Login } from 'src/app/shared/interfaces/auth/login';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _service: AuthService) { }

  ngOnInit(): void {
  }

  errors: any;

  onSubmit(f: NgForm) {
    let loginUser: Login = {...f.value}
    console.log(loginUser);
    this._service.login(loginUser)
      .subscribe({
        next: (v) => console.log(v),
        error: (e) => {
          this.errors  = Object.values(e.error.errors);
          console.error(e);
        },
        complete: () => console.info
      });
  }
}
