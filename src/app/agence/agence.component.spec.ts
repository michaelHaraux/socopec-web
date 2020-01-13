import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AGENCEComponent } from './agence.component';

describe('AGENCEComponent', () => {
  let component: AGENCEComponent;
  let fixture: ComponentFixture<AGENCEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AGENCEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AGENCEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
