import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastProvider {

  isActive = false;

  constructor(public toastController: ToastController) { }

  async present(header,message,position:any="bottom",buttons?) {
    this.isActive = true;
    return await this.toastController.create({
        header: header,
        message: message,
        position: position,
        buttons: buttons,
        duration:7000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isActive) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isActive = false;
    return await this.toastController.dismiss().then(() => console.log('dismissed'));
  }
}