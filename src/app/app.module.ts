import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';

import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import es from '@angular/common/locales/es-AR';
registerLocaleData(es);

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpAngularProvider } from './providers/http-angular';
import { HttpNativeProvider } from './providers/http-native';
import { HttpInterceptorProvider } from './providers/http-interceptor';
import { ToastProvider } from './providers/toast.provider';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from './_services/auth.service';
import { UsuarioService } from './_services/usuario.service';
import { LoadingProvider } from './providers/loading.provider';
import { AlertProvider } from './providers/alert.provider';
import { DepositoProvider } from './providers/deposito.provider';
import { SedeProvider } from './providers/sede.provider';
import { ComisionService } from './_services/comision.service';
import { AsistenciaService } from './_services/asistencia.service';
import { ErrorComponent } from './external/error/error.component';
import { NotFoundComponent } from './external/not-found/not-found.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { registerLocaleData } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SedeService } from './_services/sede.service';
import { Network } from '@ionic-native/network/ngx';
import { NetworkProvider } from './providers/network.provider';
import { ChatProvider } from './providers/chat.provider';
import { ChatService } from './_services/chat.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Device } from '@ionic-native/device/ngx';
import { NovedadSistemaService } from './_services/novedad_sistema.service';
import { MesaExamenMateriaService } from './_services/mesa_examen_materia.service';
import { AppAsistenciaService } from './_services/app_asistencia.service';
import { AppDispositivoService } from './_services/app_dispositivo.service';
import { DispositivoProvider } from './providers/dispositivo.provider';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    NotFoundComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    HttpAngularProvider,
    HttpNativeProvider,
    LoadingProvider,
    AlertProvider,
    ToastProvider,
    FileTransfer,
    FileOpener,
    File,
    DocumentViewer,
    Toast,
    NativeStorage,
    Network,
    DepositoProvider,
    AuthService,
    UsuarioService,
    SedeProvider,
    HttpInterceptorProvider,
    NetworkProvider,
    ChatProvider,
    ChatService,
    DispositivoProvider,
    OneSignal,
    Geolocation,
    Device,

    SedeService,
    ComisionService,
    AsistenciaService,
    NovedadSistemaService,
    MesaExamenMateriaService,
    AppAsistenciaService,
    AppDispositivoService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: "es-AR" },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
