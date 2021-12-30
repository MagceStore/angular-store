import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vertical-two',
  templateUrl: './vertical-two.component.html',
  styleUrls: ['./vertical-two.component.css'],
})
export class VerticalTwoLayoutComponent implements OnInit {
  public showSidebar: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  toggleSidebar(value: boolean) {
    this.showSidebar = value;
  }
}
