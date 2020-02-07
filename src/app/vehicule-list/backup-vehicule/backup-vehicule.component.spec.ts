import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupVehiculeComponent } from './backup-vehicule.component';

describe('BackupVehiculeComponent', () => {
  let component: BackupVehiculeComponent;
  let fixture: ComponentFixture<BackupVehiculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupVehiculeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
