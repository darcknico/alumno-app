import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PasswordModalComponent } from '../password-modal/password-modal.component';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { Usuario } from 'src/app/_models/usuario';
import { LoadingProvider } from 'src/app/providers/loading.provider';
import { SedeCambiarModalComponent } from '../sede-cambiar-modal/sede-cambiar-modal.component';
import { Sede } from 'src/app/_models/sede';
import { SedeProvider } from 'src/app/providers/sede.provider';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  usuario$:Observable<Usuario>;
  loading$:boolean = false;
  
  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    private usuarioService:UsuarioService,
    private sedeProvide:SedeProvider,
    private loading:LoadingProvider,
  ) { 
    this.usuario$ = this.authService.user$;
  }

  ngOnInit() {
    this.loading$ = true;
    this.usuarioService.me().subscribe(res=>{
      this.loading$ = false;
    });
  }

  cambiar(){
    this.modalCtrl.create({
      component: PasswordModalComponent,
    }).then((modal) => {
        modal.present();
    });
  }

  cambiar_sede(){
    this.modalCtrl.create({
      component: SedeCambiarModalComponent,
    }).then((modal) => {
        modal.present();
    });
  }

  salir(){
    this.loading.present();
    this.authService.logout().then(response=>{
      this.loading.dismiss();
    });
  }
}
