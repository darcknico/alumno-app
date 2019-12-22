import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoMesaExamenMateriaComponent } from './listado-mesa-examen-materia/listado-mesa-examen-materia.component';
import { MesaExamenMateriaVerComponent } from './mesa-examen-materia-ver/mesa-examen-materia-ver.component';

const routes: Routes = [
  {
    path:'',
    component:ListadoMesaExamenMateriaComponent,
  },
  {
    path:':id',
    children:[
      {
        path:'ver',
        component:MesaExamenMateriaVerComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MesaExamenMateriaRoutingModule { }
