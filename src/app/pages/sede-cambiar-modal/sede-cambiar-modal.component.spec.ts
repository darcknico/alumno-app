import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SedeCambiarModalComponent } from './sede-cambiar-modal.component';

describe('SedeCambiarModalComponent', () => {
  let component: SedeCambiarModalComponent;
  let fixture: ComponentFixture<SedeCambiarModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SedeCambiarModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SedeCambiarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
