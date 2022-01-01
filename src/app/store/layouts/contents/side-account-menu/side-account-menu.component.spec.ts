import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideAccountMenuComponent } from './side-account-menu.component';

describe('SideAccountMenuComponent', () => {
  let component: SideAccountMenuComponent;
  let fixture: ComponentFixture<SideAccountMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideAccountMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideAccountMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
