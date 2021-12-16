import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '../../interfaces/anthentication';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  errors: any;
  constructor(
    private _service: AuthenticationService,
    private _router: Router
  ) { }
  ngOnInit(): void {
  }

  onSubmit(f: NgForm): void {
    const registerUser: Register = { ...f.value };
    console.log(registerUser);
    this._service.register(registerUser)
      .subscribe({
        next: () => {
          if (this._service.isLoggedIn) {
            this._router.navigate(['']);
          }
        },
        error: (e) => {
          this.errors  = Object.values(e.errors);
        }
      });
  }
}
