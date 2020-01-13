import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LISTEVEHICULESComponent } from './liste-vehicules.component';

describe('LISTEVEHICULESComponent', () => {
  let component: LISTEVEHICULESComponent;
  let fixture: ComponentFixture<LISTEVEHICULESComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LISTEVEHICULESComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LISTEVEHICULESComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
