import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComisionesRoutingModule } from './comisiones-routing.module';
import { ComisionVerComponent } from './comision-ver/comision-ver.component';
import { ComisionEditarModalComponent } from './comision-editar-modal/comision-editar-modal.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComisionComponent } from './listado-comision/listado-comision.component';
import { ListadoComisionAlumnoModalComponent } from './listado-comision-alumno-modal/listado-comision-alumno-modal.component';
import { AsistenciaNuevoModalComponent } from './asistencia-nuevo-modal/asistencia-nuevo-modal.component';

@NgModule({
  declarations: [
    ListadoComisionComponent,
    ComisionVerComponent,
    ComisionEditarModalComponent,
    ListadoComisionAlumnoModalComponent,
    AsistenciaNuevoModalComponent,
  ],
  imports: [
    CommonModule,
    ComisionesRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    ComisionEditarModalComponent,
    ListadoComisionAlumnoModalComponent,
    AsistenciaNuevoModalComponent,
  ]
})
export class ComisionesModule { }
