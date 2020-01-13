import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LISTEAGENCESComponent } from './liste-agences.component';

describe('LISTEAGENCESComponent', () => {
  let component: LISTEAGENCESComponent;
  let fixture: ComponentFixture<LISTEAGENCESComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LISTEAGENCESComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LISTEAGENCESComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
