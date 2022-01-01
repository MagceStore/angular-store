import { AuthenticationService } from 'src/app/auth/services/authentication.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-account-menu',
  templateUrl: './side-account-menu.component.html',
  styleUrls: ['./side-account-menu.component.css'],
})
export class SideAccountMenuComponent implements OnInit {
  constructor(
    private _service: AuthenticationService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this._service.logout().subscribe({
      next: () => {
        this._router.navigate(['auth/login']);
      },
    });
  }
}
