import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideGlobalMenuComponent } from './side-global-menu.component';

describe('SideGlobalMenuComponent', () => {
  let component: SideGlobalMenuComponent;
  let fixture: ComponentFixture<SideGlobalMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideGlobalMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideGlobalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
