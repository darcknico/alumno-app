import { Component, OnInit, OnDestroy } from '@angular/core';
import { MesaExamenMateria, MesaExamenMateriaAlumno } from 'src/app/_models/mesa.examen';
import { Observable } from 'rxjs';
import { MesaExamenMateriaService } from 'src/app/_services/mesa_examen_materia.service';
import { SedeProvider } from 'src/app/providers/sede.provider';
import { ModalController, Platform, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mesa-examen-materia-ver',
  templateUrl: './mesa-examen-materia-ver.component.html',
  styleUrls: ['./mesa-examen-materia-ver.component.scss'],
})
export class MesaExamenMateriaVerComponent implements OnInit, OnDestroy {
  id_sede:number;
  item:MesaExamenMateria;
  dataSource$:Observable<MesaExamenMateriaAlumno[]>;

  subscription
  constructor(
    private service:MesaExamenMateriaService,
    private sedeProvider:SedeProvider,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    private platform:Platform,
    private nav:NavController,
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
    
    this.subscription = this.platform.backButton.subscribe(async()=>{
      const modal = await this.modalCtrl.getTop();
      if (modal) {
          modal.dismiss();
      } else {
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  refrescar(){
    this.dataSource$ = this.service.alumnos(this.item.id);
  }
}
