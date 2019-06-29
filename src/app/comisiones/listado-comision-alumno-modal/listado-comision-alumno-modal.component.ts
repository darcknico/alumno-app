import { Component, OnInit } from '@angular/core';
import { Comision, ComisionAlumno } from 'src/app/_models/comision';
import { ComisionService } from 'src/app/_services/comision.service';
import { SedeProvider } from 'src/app/providers/sede.provider';
import { NavParams, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-listado-comision-alumno-modal',
  templateUrl: './listado-comision-alumno-modal.component.html',
  styleUrls: ['./listado-comision-alumno-modal.component.scss'],
})
export class ListadoComisionAlumnoModalComponent implements OnInit {
  item:Comision;
  id_sede:number;
  dataSource$:Observable<ComisionAlumno[]>;

  constructor(
    private service:ComisionService,
    private sedeProvider:SedeProvider,
    private navParams:NavParams,
    private modalCtrl: ModalController,
    ) { 
      this.sedeProvider.getIdSede().then(response=>{
        this.id_sede = response;
        this.service.sede(this.id_sede);
      });
    }

  ngOnInit() {
    this.item = this.navParams.get('item');
    if(this.item){
      this.service.sede(this.item.id_sede);
      this.dataSource$ = this.service.alumnos(this.item.id);
    }
  }

  cerrar(){
    this.modalCtrl.dismiss(false);
  }

}
