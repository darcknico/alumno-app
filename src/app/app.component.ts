import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SedeProvider } from './providers/sede.provider';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './_services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { UsuarioService } from './_services/usuario.service';
import { Sede } from './_models/sede';
import { LoadingProvider } from './providers/loading.provider';
import { Usuario } from './_models/usuario';
import { NetworkProvider, ConnectionStatus } from './providers/network.provider';
import { ToastProvider } from './providers/toast.provider';
import { ChatProvider } from './providers/chat.provider';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  sede:BehaviorSubject<Sede>;
  usuario;
  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Mis datos',
      url: '/pages/perfil',
      icon: 'person',
    },
    {
      title: 'Comisiones',
      url: '/comisiones',
      icon: 'clipboard',
    },
    {
      title: 'Asistencias',
      url: '/asistencias',
      icon: 'clipboard',
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService:AuthService,
    private translateService: TranslateService,
    private sedeProvider: SedeProvider,
    private usuarioService:UsuarioService,
    private loadingService:LoadingProvider,
    private networkProvider:NetworkProvider,
    private toast:ToastProvider,
    private chat:ChatProvider,
  ) {
    this.initializeApp();
    this.sede = this.sedeProvider.sede$;
    this.usuario = this.authService.user$;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.networkProvider.initializeNetworkEvents();
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.translateService.setDefaultLang('es');
      this.translateService.use('es');

      this.authService.getTokenStateObserver().subscribe(response=>{
        if(response){
          this.sedeProvider.actualizar();
          this.usuarioService.me().subscribe();
        }
      });

      this.networkProvider.getNetworkStatus().subscribe(data => {
        if(data == ConnectionStatus.Offline){
          this.toast.present('Conexion',data + ' ' +  this.networkProvider.getNetworkType());
        }
      });
    });
  }

  async salir(){
    this.loadingService.present();
    this.usuarioService.logout().subscribe(response=>{
      this.loadingService.dismiss();
    });
  }
}
