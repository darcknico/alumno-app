import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoComisionComponent } from './listado-comision/listado-comision.component';
import { ComisionVerComponent } from './comision-ver/comision-ver.component';

const routes: Routes = [
  {
    path:'',
    component:ListadoComisionComponent,
  },
  {
    path:':id',
    children:[
      {
        path:'ver',
        component:ComisionVerComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComisionesRoutingModule { }
