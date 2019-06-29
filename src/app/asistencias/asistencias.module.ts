import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsistenciasRoutingModule } from './asistencias-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoAsistenciaComponent } from './listado-asistencia/listado-asistencia.component';
import { AsistenciaVerComponent } from './asistencia-ver/asistencia-ver.component';
import { AsistenciaEditarModalComponent } from './asistencia-editar-modal/asistencia-editar-modal.component';
import { AsistenciaAlumnoEditarModalComponent } from './asistencia-alumno-editar-modal/asistencia-alumno-editar-modal.component';

@NgModule({
  declarations: [
    ListadoAsistenciaComponent,
    AsistenciaVerComponent,
    AsistenciaEditarModalComponent,
    AsistenciaAlumnoEditarModalComponent,
  ],
  imports: [
    CommonModule,
    AsistenciasRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    AsistenciaEditarModalComponent,
    AsistenciaAlumnoEditarModalComponent,
  ]
})
export class AsistenciasModule { }
