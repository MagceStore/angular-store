import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _service: AuthenticationService, private _router: Router
) {}

  ngOnInit(): void {
  }

  logout(): void {
    this._service.logout().subscribe({
        next: () => {
          this._router.navigate(['auth/login']);
        },
    });
  }

}
