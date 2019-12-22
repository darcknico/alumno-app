import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MesaExamenMateriaRoutingModule } from './mesa-examen-materia-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoMesaExamenMateriaComponent } from './listado-mesa-examen-materia/listado-mesa-examen-materia.component';
import { MesaExamenMateriaVerComponent } from './mesa-examen-materia-ver/mesa-examen-materia-ver.component';

@NgModule({
  declarations: [
    ListadoMesaExamenMateriaComponent,
    MesaExamenMateriaVerComponent,
  ],
  imports: [
    CommonModule,
    MesaExamenMateriaRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MesaExamenMateriaModule { }
