import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IonContent, IonInfiniteScroll, ModalController, Platform, NavController } from '@ionic/angular';
import { FiltroAsistencia, AsistenciaService } from 'src/app/_services/asistencia.service';
import { Asistencia } from 'src/app/_models/asistencia';
import { SedeProvider } from 'src/app/providers/sede.provider';
import { AuthService } from 'src/app/_services/auth.service';
import { LoadingProvider } from 'src/app/providers/loading.provider';
import { ToastProvider } from 'src/app/providers/toast.provider';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AsistenciaEditarModalComponent } from '../asistencia-editar-modal/asistencia-editar-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listado-asistencia',
  templateUrl: './listado-asistencia.component.html',
  styleUrls: ['./listado-asistencia.component.scss'],
})
export class ListadoAsistenciaComponent implements OnInit,OnDestroy {

  id_sede:number;
  id_producto:number;
  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  filtro:FiltroAsistencia = {
    search:"",
    sort:"created_at",
    order:"desc",
    start:0,
    length:5,
    id_carrera:0,
    id_departamento:0,
    id_materia:0,
  }
  dataSource:Asistencia[] = [];
  consultando:boolean = false;
  total:number = 0;

  subscription
  constructor(
    private service:AsistenciaService,
    private sedeProvider:SedeProvider,
    private authService:AuthService,
    private loading: LoadingProvider,
    private toast:ToastProvider,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private router:Router,
    private platform:Platform,
    private navCtrl: NavController,
    ) { 
      
  }

  ngOnInit() {
    this.authService.isAuthenticatedPromise().then(response=>{
      if(response){
        return this.sedeProvider.getIdSede();
      } else {
        return null;
      }
    }).then(response=>{
      if(response){
        this.id_sede = response;
        this.service.sede(this.id_sede);
        this.refrescar();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ionViewWillLeave(){
    this.subscription.unsubscribe();
  }
  ionViewDidEnter(){
    this.subscription = this.platform.backButton.subscribe(async()=>{
      const modal = await this.modalCtrl.getTop();
      if (modal) {
          modal.dismiss();
      } else {
          this.router.navigate(['home']);
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

  async editar(item){
    this.modalCtrl.create({
      component: AsistenciaEditarModalComponent,
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

  async refrescar(){
    this.dataSource = [];
    this.consultando = true;
    this.filtro.start = 0;
    this.buscar$ = this.service.ajax(this.filtro).subscribe((response:any)=>{
      if(response.items.length>0){
        for(let i = 0; i < response.items.length; i++){
          let item = response.items[i];
          setTimeout(() => {
              this.dataSource.push(item);
          }, 200*(i+1));
        }
      }
      this.total = response.total_count;
      this.consultando = false;
    });
  }

  async loadData(event) {
    if (this.dataSource.length >= this.total) {
      event.target.complete();
      event.target.disabled = true;
      return
    }
    this.filtro.start = this.dataSource.length;
    this.service.ajax(this.filtro).subscribe((response:any)=>{
      for(let i = 0; i < response.items.length; i++){
        let item = response.items[i];
        setTimeout(() => {
            this.dataSource.push(item);
        }, 200*(i+1));
      }
      event.target.complete();
    });
  }

  buscar$:Subscription;
  async buscar(ev){
    const val = ev.target.value;
    if(this.buscar$){
      this.buscar$.unsubscribe();
    }
    if(val.length<1){
      if(val.length==0){
        this.filtro.search="";
        this.refrescar();
      }
      return;
    }
    this.filtro.search = val;
    this.refrescar();
  }

}
