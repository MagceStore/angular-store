import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalTwoComponent } from './vertical-two.component';

describe('VerticalTwoComponent', () => {
  let component: VerticalTwoComponent;
  let fixture: ComponentFixture<VerticalTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerticalTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
