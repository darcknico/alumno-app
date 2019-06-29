import { Component, OnInit, ViewChild } from '@angular/core';
import { SedeProvider } from 'src/app/providers/sede.provider';
import { LoadingProvider } from 'src/app/providers/loading.provider';
import { ComisionEditarModalComponent } from '../comision-editar-modal/comision-editar-modal.component';
import { IonContent, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { FiltroComision, ComisionService } from 'src/app/_services/comision.service';
import { Comision } from 'src/app/_models/comision';
import { AuthService } from 'src/app/_services/auth.service';
import { ToastProvider } from 'src/app/providers/toast.provider';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListadoComisionAlumnoModalComponent } from '../listado-comision-alumno-modal/listado-comision-alumno-modal.component';

@Component({
  selector: 'app-listado-comision',
  templateUrl: './listado-comision.component.html',
  styleUrls: ['./listado-comision.component.scss'],
})
export class ListadoComisionComponent implements OnInit {

  id_sede:number;
  id_producto:number;
  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  filtro:FiltroComision = {
    search:"",
    sort:"created_at",
    order:"desc",
    start:0,
    length:5,
    id_carrera:0,
    id_departamento:0,
    id_materia:0,
    cerrado:null,
  }
  dataSource:Comision[] = [];
  consultando:boolean = false;
  total:number = 0;

  constructor(
    private service:ComisionService,
    private sedeProvider:SedeProvider,
    private authService:AuthService,
    private loading: LoadingProvider,
    private toast:ToastProvider,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private router:Router,
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

  async ver(item){
    let navigationExtras: NavigationExtras = {
      state: {
        item: item
      }
    };
    this.router.navigate(['comisiones',item.id,'ver'],navigationExtras);
  }

  async alumnos(item){
    this.modalCtrl.create({
      component: ListadoComisionAlumnoModalComponent,
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
