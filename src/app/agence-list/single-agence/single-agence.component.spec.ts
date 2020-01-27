import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAgenceComponent } from './single-agence.component';

describe('SingleAgenceComponent', () => {
  let component: SingleAgenceComponent;
  let fixture: ComponentFixture<SingleAgenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleAgenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
