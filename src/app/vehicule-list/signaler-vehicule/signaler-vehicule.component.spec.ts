import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalerVehiculeComponent } from './signaler-vehicule.component';

describe('SignalerVehiculeComponent', () => {
  let component: SignalerVehiculeComponent;
  let fixture: ComponentFixture<SignalerVehiculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignalerVehiculeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignalerVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
