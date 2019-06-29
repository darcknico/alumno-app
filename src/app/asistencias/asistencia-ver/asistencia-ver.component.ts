import { Component, OnInit } from '@angular/core';
import { Asistencia } from 'src/app/_models/asistencia';
import { Observable } from 'rxjs';
import { AsistenciaService } from 'src/app/_services/asistencia.service';
import { SedeProvider } from 'src/app/providers/sede.provider';
import { ActivatedRoute, Router } from '@angular/router';
import { AsistenciaAlumnoEditarModalComponent } from '../asistencia-alumno-editar-modal/asistencia-alumno-editar-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-asistencia-ver',
  templateUrl: './asistencia-ver.component.html',
  styleUrls: ['./asistencia-ver.component.scss'],
})
export class AsistenciaVerComponent implements OnInit {
  id_sede:number;
  item:Asistencia;
  dataSource$:Observable<Asistencia[]>;

  constructor(
    private service:AsistenciaService,
    private sedeProvider:SedeProvider,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.item = this.router.getCurrentNavigation().extras.state.item;
      }
      this.sedeProvider.getIdSede().then(response=>{
        this.id_sede = response;
        this.service.sede(this.id_sede);
        this.iniciar();
      });
    });
  }

  ngOnInit() {
    
  }

  iniciar(){
    this.route.params.subscribe(response=>{
      this.dataSource$ = this.service.alumnos(response['id']);
      if(this.item == null){
        this.service.getById(response['id']).subscribe(response=>{
          this.item = response;
        });
      }
    });
  }

  async editar(item){
    this.modalCtrl.create({
      component: AsistenciaAlumnoEditarModalComponent,
      componentProps:{
        item:item,
      }
    }).then((modal) => {
        modal.present();
        modal.onDidDismiss().then(response=>{
          if(response.data){
            this.refrescar();
          }
        });
    });
  }

  refrescar(){
    this.dataSource$ = this.service.alumnos(this.item.id);
  }
}
