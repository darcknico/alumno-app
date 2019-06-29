import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaAlumnoEditarModalComponent } from './asistencia-alumno-editar-modal.component';

describe('AsistenciaAlumnoEditarModalComponent', () => {
  let component: AsistenciaAlumnoEditarModalComponent;
  let fixture: ComponentFixture<AsistenciaAlumnoEditarModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsistenciaAlumnoEditarModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciaAlumnoEditarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
