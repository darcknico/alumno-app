import { Component, OnInit } from '@angular/core';
import { MesaExamenMateriaService, FiltroMesaExamenMateria } from 'src/app/_services/mesa_examen_materia.service';
import { MesaExamenMateria } from 'src/app/_models/mesa.examen';
import { SedeProvider } from 'src/app/providers/sede.provider';
import { AuthService } from 'src/app/_services/auth.service';
import * as moment from 'moment';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-tab-schedule',
  templateUrl: './tab-schedule.component.html',
  styleUrls: ['./tab-schedule.component.scss'],
})
export class TabScheduleComponent implements OnInit {
  id_sede;
  usuario;
  materias:MesaExamenMateria[] = [];
  filtroMaterias:FiltroMesaExamenMateria=<FiltroMesaExamenMateria>{};
  loadingMaterias:boolean = false;

  constructor(
    private auth:AuthService,
    private sedeProvider:SedeProvider,
    private mesaExamenMateriaSerivce:MesaExamenMateriaService,
    private router:Router,
    ) { }

  ngOnInit() {
    this.auth.isAuthenticatedPromise().then(response=>{
      if(response){
        return this.sedeProvider.getIdSede();
      } else {
        return null;
      }
    }).then(id_sede=>{
      if(id_sede){
        this.id_sede = id_sede;
        this.mesaExamenMateriaSerivce.sede(this.id_sede);
      }
      return this.auth.getUsuario();
    }).then(usuario=>{
      this.usuario = usuario;
      this.refrescar();
    });
  }

  refrescar(){
    this.filtroMaterias.id_usuario = this.usuario.id;
    this.filtroMaterias.order = 'asc';
    this.filtroMaterias.sort = 'fecha';
    this.filtroMaterias.fecha_ini = moment().format('YYYY-MM-DD');
    this.filtroMaterias.length = 7;

    this.mesaExamenMateriaSerivce.ajax(this.filtroMaterias).subscribe(response=>{
      this.materias = response.items;
    });
  }

  async ver(item){
    let navigationExtras: NavigationExtras = {
      state: {
        item: item
      }
    };
    this.router.navigate(['mesa_examen_materia',item.id,'ver'],navigationExtras);
  }

}
