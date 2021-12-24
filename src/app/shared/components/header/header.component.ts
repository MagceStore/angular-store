import { AuthenticationService } from 'src/app/auth/services/authentication.service';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() showSidebarEvent = new EventEmitter<boolean>();
  public showSidebar: boolean = true;
  public showDropDownList: boolean = false;
  public showDropDownListInSm: boolean = false;

  constructor(
    private _service: AuthenticationService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
    this.showSidebarEvent.emit(this.showSidebar);
  }

  toggleDropDown() {
    this.showDropDownList = !this.showDropDownList;
  }

  toggleDropDownInSm(): any {
    this.showDropDownListInSm = !this.showDropDownListInSm;
  }

  logout(): void {
    this._service.logout().subscribe({
      next: () => {
        this._router.navigate(['auth/login']);
      },
    });
  }
}
