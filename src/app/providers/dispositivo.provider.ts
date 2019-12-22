import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';
import { DepositoProvider } from './deposito.provider';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { AuthService } from '../_services/auth.service';
import { Device } from '@ionic-native/device/ngx';
import { AppDispositivoService } from '../_services/app_dispositivo.service';
import { UsuarioDispositivo } from '../_models/app';

const key_dispositivo='ALUMNO_APP_KEY_DISPOSITIVO';
const key_dispositivo_enable='ALUMNO_APP_KEY_DISPOSITIVO_ENABLE';

@Injectable({
  providedIn: 'root'
})
export class DispositivoProvider {
  
  constructor(
    private platform: Platform,
    private service:AppDispositivoService,
    private deposito:DepositoProvider,
    private oneSignal:OneSignal,
    private auth:AuthService,
    private device:Device,
  ) {
  }

  iniciar(){
    this.auth.authState$.subscribe(value=>{
      if(!value){
          console.log('Dispositivo desuscribiendose');
          this.desuscribirse().catch(error=>{
              console.log('Dispositivo Error',error);
          });
      } else {
          console.log('Dispositivo suscribiendose');
          this.suscribiendose().catch(error=>{
              console.log('Dispositivo Error',error);
          });
      }
    });
  }

  async suscribiendose(){
    let data = await this.oneSignal.getIds();
    let usuario = await this.auth.getUsuario();
    let dispositivo = <UsuarioDispositivo>{};
    
    dispositivo.id_usuario = usuario.id;
    dispositivo.device_model = this.device.model;
    dispositivo.device_id = data.userId;
    dispositivo.device_os = this.device.version;
    dispositivo.manufacturer = this.device.manufacturer;
    console.log(dispositivo);
    this.service.register(dispositivo).subscribe(response=>{
        this.setDispositivo(response);
    });
  }

  async desuscribirse(){
    let dispositivo = await this.getDispositivo();
    if(dispositivo){
      this.service.destroy(dispositivo.id).subscribe(response=>{
        this.setDispositivo(response);
    });
    }
    
  }

  private setDispositivo(item){
    this.deposito.setItem(key_dispositivo,item).then(()=>{});
  }

  public getDispositivo():Promise<UsuarioDispositivo>{
    return this.deposito.getItem(key_dispositivo)
  }
}