import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaExamenMateriaVerComponent } from './mesa-examen-materia-ver.component';

describe('MesaExamenMateriaVerComponent', () => {
  let component: MesaExamenMateriaVerComponent;
  let fixture: ComponentFixture<MesaExamenMateriaVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesaExamenMateriaVerComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesaExamenMateriaVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
