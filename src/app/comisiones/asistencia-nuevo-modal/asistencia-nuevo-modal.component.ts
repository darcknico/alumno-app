import { Component, OnInit } from '@angular/core';
import { Comision } from 'src/app/_models/comision';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AsistenciaService } from 'src/app/_services/asistencia.service';
import { SedeProvider } from 'src/app/providers/sede.provider';
import { NavParams, ModalController, AlertController } from '@ionic/angular';
import { LoadingProvider } from 'src/app/providers/loading.provider';
import { Asistencia } from 'src/app/_models/asistencia';
import * as moment from 'moment';
import { Auxiliar } from 'src/app/_helpers/auxiliar';

@Component({
  selector: 'app-asistencia-nuevo-modal',
  templateUrl: './asistencia-nuevo-modal.component.html',
  styleUrls: ['./asistencia-nuevo-modal.component.scss'],
})
export class AsistenciaNuevoModalComponent implements OnInit {
  monthNames:string[]=Auxiliar.dateTimeMonthNames;
  item:Comision;
  hoy;
  id_sede:number;
  formulario:FormGroup;
  constructor(
    private service:AsistenciaService,
    private sedeProvider:SedeProvider,
    private navParams:NavParams,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private loading: LoadingProvider,
    public alertController: AlertController,
    ) { 
      let hoy = moment();
      this.formulario = this.formBuilder.group({
        fecha:[hoy.toDate().toDateString(),Validators.required],
        carrera:'',
        materia:'',
        numero:'',
      });
      this.f.carrera.disable();
      this.f.materia.disable();
      this.f.numero.disable();
      this.sedeProvider.getIdSede().then(response=>{
        this.id_sede = response;
        this.service.sede(this.id_sede);
      });
      this.hoy = hoy.format('YYYY-MM-DD');
    }

  ngOnInit() {
    this.item = this.navParams.get('item');
    if(this.item){
      this.f.carrera.setValue(this.item.carrera.nombre);
      this.f.materia.setValue(this.item.materia.nombre);
      this.f.numero.setValue(this.item.numero);
    }
  }

  get f(){
    return this.formulario.controls;
  }

  continuar(){
    if(!this.formulario.valid){

    }
    let asistencia = <Asistencia>{};
    asistencia.id_comision = this.item.id;
    asistencia.fecha = moment(this.f.fecha.value).format('YYYY-MM-DD');
    this.loading.present();
    this.service.register(asistencia).subscribe(response=>{
      this.loading.dismiss();
      this.modalCtrl.dismiss(response);
    });
  }

  cerrar(){
    this.modalCtrl.dismiss(false);
  }

}
