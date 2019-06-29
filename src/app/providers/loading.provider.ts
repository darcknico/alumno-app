import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class LoadingProvider {

  isLoading = false;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  constructor(public loadingController: LoadingController) { }

  async present() {
    this.setLoading(true);
    return await this.loadingController.create({
      spinner:'lines',
      translucent: true,
      duration: 60000,
      
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  setLoading(estado:boolean){
    this.isLoading = estado;
    this.loading$.next(estado);
  }

  async dismiss() {
    this.setLoading(false);
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }
}