import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AGENTComponent } from './agent.component';

describe('AGENTComponent', () => {
  let component: AGENTComponent;
  let fixture: ComponentFixture<AGENTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AGENTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AGENTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
