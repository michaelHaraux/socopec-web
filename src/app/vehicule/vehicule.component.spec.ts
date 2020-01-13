import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VEHICULEComponent } from './vehicule.component';

describe('VEHICULEComponent', () => {
  let component: VEHICULEComponent;
  let fixture: ComponentFixture<VEHICULEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VEHICULEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VEHICULEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
