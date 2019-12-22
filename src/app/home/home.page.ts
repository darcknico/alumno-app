import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ChatProvider } from '../providers/chat.provider';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { IonContent, ModalController, PopoverController, Platform } from '@ionic/angular';
import { ChatNameEditModalComponent } from './chat-name-edit-modal/chat-name-edit-modal.component';
import { LoadingProvider } from '../providers/loading.provider';
import { PopoverHomeComponent } from './componentes/popover-home/popover-home.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit,OnDestroy {
  
  subscription
  constructor(
    private platform:Platform,
  ) { }

  ngOnInit() {
    this.subscription = this.platform.backButton.subscribe(()=>{
      navigator['app'].exitApp();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
