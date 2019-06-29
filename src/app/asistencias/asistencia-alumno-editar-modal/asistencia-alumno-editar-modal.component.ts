import { Component, OnInit } from '@angular/core';
import { AsistenciaAlumno, Asistencia, TipoAsistenciaAlumno } from 'src/app/_models/asistencia';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AsistenciaService } from 'src/app/_services/asistencia.service';
import { NavParams, ModalController, AlertController } from '@ionic/angular';
import { SedeProvider } from 'src/app/providers/sede.provider';
import { LoadingProvider } from 'src/app/providers/loading.provider';

@Component({
  selector: 'app-asistencia-alumno-editar-modal',
  templateUrl: './asistencia-alumno-editar-modal.component.html',
  styleUrls: ['./asistencia-alumno-editar-modal.component.scss'],
})
export class AsistenciaAlumnoEditarModalComponent implements OnInit {
  item:AsistenciaAlumno;
  tipos:TipoAsistenciaAlumno[];
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
      this.formulario = this.formBuilder.group({
        id_tipo_asistencia_alumno:['',Validators.required],
        observaciones:'',
      });
      this.sedeProvider.getIdSede().then(response=>{
        this.id_sede = response;
        this.service.sede(this.id_sede);
      });
    }

  ngOnInit() {
    this.service.tipos().subscribe(response=>{
      this.tipos = response;
    });
    this.item = this.navParams.get('item');
    if(this.item){
      this.f.id_tipo_asistencia_alumno.setValue(this.item.id_tipo_asistencia_alumno);
      this.f.observaciones.setValue(this.item.observaciones);
    }
  }

  get f(){
    return this.formulario.controls;
  }

  continuar(){
    if(!this.formulario.valid){

    }
    if(this.item){
      this.item.id_tipo_asistencia_alumno = this.f.id_tipo_asistencia_alumno.value;
      this.item.observaciones = this.f.observaciones.value;
      this.loading.present();
      this.service.alumno(this.item).subscribe(response=>{
        this.loading.dismiss();
        this.modalCtrl.dismiss(true);
      });
    }
  }

  cerrar(){
    this.modalCtrl.dismiss(false);
  }

}
