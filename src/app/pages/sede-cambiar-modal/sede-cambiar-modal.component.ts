import { Component, OnInit } from '@angular/core';
import { Sede } from 'src/app/_models/sede';
import { SedeProvider } from 'src/app/providers/sede.provider';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavParams, ModalController, AlertController } from '@ionic/angular';
import { LoadingProvider } from 'src/app/providers/loading.provider';
import { SedeService } from 'src/app/_services/sede.service';
import { ToastProvider } from 'src/app/providers/toast.provider';

@Component({
  selector: 'app-sede-cambiar-modal',
  templateUrl: './sede-cambiar-modal.component.html',
  styleUrls: ['./sede-cambiar-modal.component.scss'],
})
export class SedeCambiarModalComponent implements OnInit {
  
  sedes:Sede[];
  formulario:FormGroup;

  constructor(
    private sedeService:SedeService,
    private sedeProvider:SedeProvider,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private loading: LoadingProvider,
    private toast: ToastProvider,
    public alert: AlertController,
  ) {
    this.formulario = this.formBuilder.group({
      id_sede:['',Validators.required],
    });
  }

  ngOnInit() {
    this.sedeProvider.getIdSede().then(response=>{
      this.f.id_sede.setValue(response);
    });
    this.sedeService.getAll().subscribe(response=>{
      this.sedes = response;
    });
  }

  get f(){
    return this.formulario.controls;
  }

  continuar(){
    if(!this.formulario.valid){
      return;
    }
    let id_sede = Number(this.f.id_sede.value);
    let sede = this.sedes.find(item=>item.id == id_sede);
    this.loading.present();
    this.sedeProvider.seleccionar(sede).subscribe(response=>{
      this.loading.dismiss();
      this.toast.present('Sede','Se ha cambiado la sede con exitó');
      this.cerrar();
    })
  }

  cerrar(){
    this.modalCtrl.dismiss(false);
  }
}
