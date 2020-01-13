import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LISTEAGENTSComponent } from './liste-agents.component';

describe('LISTEAGENTSComponent', () => {
  let component: LISTEAGENTSComponent;
  let fixture: ComponentFixture<LISTEAGENTSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LISTEAGENTSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LISTEAGENTSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
