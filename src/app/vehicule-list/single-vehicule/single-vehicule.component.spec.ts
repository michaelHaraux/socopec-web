import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleVehiculeComponent } from './single-vehicule.component';

describe('SingleVehiculeComponent', () => {
  let component: SingleVehiculeComponent;
  let fixture: ComponentFixture<SingleVehiculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleVehiculeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
