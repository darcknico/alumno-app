import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMesaExamenMateriaComponent } from './listado-mesa-examen-materia.component';

describe('ListadoMesaExamenMateriaComponent', () => {
  let component: ListadoMesaExamenMateriaComponent;
  let fixture: ComponentFixture<ListadoMesaExamenMateriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoMesaExamenMateriaComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoMesaExamenMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
