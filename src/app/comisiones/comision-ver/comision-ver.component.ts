import { Component, OnInit } from '@angular/core';
import { SedeProvider } from 'src/app/providers/sede.provider';
import { ComisionService } from 'src/app/_services/comision.service';
import { Asistencia } from 'src/app/_models/asistencia';
import { Comision } from 'src/app/_models/comision';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { AsistenciaNuevoModalComponent } from '../asistencia-nuevo-modal/asistencia-nuevo-modal.component';
import { AsistenciaService } from 'src/app/_services/asistencia.service';
import { ToastProvider } from 'src/app/providers/toast.provider';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-comision-ver',
  templateUrl: './comision-ver.component.html',
  styleUrls: ['./comision-ver.component.scss'],
})
export class ComisionVerComponent implements OnInit {
  id_sede:number;
  item:Comision;
  dataSource$:Observable<Asistencia[]>;
  noData:boolean=false;

  constructor(
    private service:ComisionService,
    private asistenciaService:AsistenciaService,
    private sedeProvider:SedeProvider,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    private toast:ToastProvider,
    public alertController: AlertController,
    ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.item = this.router.getCurrentNavigation().extras.state.item;
      }
      this.sedeProvider.getIdSede().then(response=>{
        this.id_sede = response;
        this.service.sede(this.id_sede);
        this.asistenciaService.sede(this.id_sede);
        this.iniciar();
      });
    });
  }

  ngOnInit() {
    
  }

  iniciar(){
    this.route.params.subscribe(response=>{
      if(this.item == null){
        this.service.getById(response['id']).subscribe(response=>{
          this.item = response;
          this.refrescar();
        });
      } else {
        this.refrescar();
      }
    });
  }

  async ver(item){
    let navigationExtras: NavigationExtras = {
      state: {
        item: item
      }
    };
    this.router.navigate(['asistencias',item.id,'ver'],navigationExtras);
  }

  async nuevo(){
    this.modalCtrl.create({
      component: AsistenciaNuevoModalComponent,
      componentProps:{
        item:this.item,
      }
    }).then((modal) => {
        modal.present();
        modal.onDidDismiss().then(response=>{
          if(response.data){
            this.router.navigate(['asistencias',response.data.id,'ver']);
          }
        });
    });
  }

  async eliminar(item){
    const alert = await this.alertController.create({
      header: 'Eliminar',
      message: '',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }, {
          text: 'Continuar',
          handler: () => {
            this.asistenciaService.delete(item.id).subscribe(response=>{
              this.modalCtrl.dismiss(true);
              this.toast.present('Asistencia Eliminada',null);
              this.refrescar();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  refrescar(){
    this.dataSource$ = this.service.asistencias(this.item.id).pipe(
      map(response=>{
        if(response.length == 0){
          this.noData = true;
        } else {
          this.noData = false;
        }
        return response;
      })
    );
  }
}
