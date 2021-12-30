import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalTwoLayoutComponent } from './vertical-two.component';

describe('VerticalTwoComponent', () => {
  let component: VerticalTwoLayoutComponent;
  let fixture: ComponentFixture<VerticalTwoLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerticalTwoLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalTwoLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
