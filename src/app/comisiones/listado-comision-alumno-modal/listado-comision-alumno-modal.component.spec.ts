import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoComisionAlumnoModalComponent } from './listado-comision-alumno-modal.component';

describe('ListadoComisionAlumnoModalComponent', () => {
  let component: ListadoComisionAlumnoModalComponent;
  let fixture: ComponentFixture<ListadoComisionAlumnoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoComisionAlumnoModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoComisionAlumnoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
