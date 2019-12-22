import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IonContent, ModalController, PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/_services/auth.service';
import { ChatProvider } from 'src/app/providers/chat.provider';
import { LoadingProvider } from 'src/app/providers/loading.provider';
import { Router } from '@angular/router';
import { ChatNameEditModalComponent } from '../chat-name-edit-modal/chat-name-edit-modal.component';
import { PopoverHomeComponent } from '../componentes/popover-home/popover-home.component';

@Component({
  selector: 'app-tab-chat',
  templateUrl: './tab-chat.component.html',
  styleUrls: ['./tab-chat.component.scss'],
})
export class TabChatComponent implements OnInit,OnDestroy {

  @ViewChild('content') private content: IonContent;
  
  usuario$;
  messageList: any[] = [];
  chatMessage: string = "";
  suscription;
  chatSuscription;
  isUsuario:boolean = false;
  isRoom;
  currentUser:string = null;
  constructor(
    private auth:AuthService,
    private chat: ChatProvider,
    private modalCtrl: ModalController,
    public popoverController: PopoverController,
    private loading:LoadingProvider,
    private router: Router, 
    ) {
      this.chatSuscription = this.chat.chatManager$.subscribe(ok=>{
        if(ok){
          this.iniciarChat();
        }
      });
    }


  ngOnInit() {
    this.usuario$ = this.auth.user$;
  }

  iniciarChat(){
    this.currentUser = null;
    this.loading.present();
    this.chat.conectar().then(response => {
      console.log('Estado coneccion', response);
      console.log('Estado usuario', this.chat.isUsuario);
      this.isUsuario = this.chat.isUsuario;
      if(this.chat.isUsuario){
        this.currentUser = this.chat.getCurrentUser().name;
      }
      if(response){
        if(this.suscription){
          this.suscription.unsubscribe();
        }
        this.isRoom = this.chat.suscribir().then(room=>{
          if(room){
            this.suscription = this.chat.getMessages().subscribe(messages => {
              this.messageList = this.chat.messages;
              setTimeout(() => { 
                if(this.content){
                  this.content.scrollToBottom(500);
                }
                
              },500);
            });
          }
          return room;
        });

        return this.isRoom;
      } else {
        return null;
      }
    }).then(response=>{
      this.loading.dismiss();
    });
  }

  ngOnDestroy(){
    if(this.suscription){
      this.suscription.unsubscribe();
    }
    if(this.chatSuscription){
      this.chatSuscription.unsubscribe();
    }
  }

  sendMessage() {
    if(this.chat.isUsuario && this.chat.isRoom){
      this.chat.sendMessage({ text: this.chatMessage }).catch(error=>{
        console.log('sendMessage error');
        console.log(error);
        return null
      }).then(response => {
        if(response){
          this.chatMessage = "";
          setTimeout(() => { 
            if(this.content){
              this.content.scrollToBottom(500);
            }
          },500);
        }
      });
    }
  }

  async agregarUsuario(){
    this.modalCtrl.create({
      component: ChatNameEditModalComponent,
      componentProps:{
        item:null,
      }
    }).then((modal) => {
        modal.present();
        modal.onDidDismiss().then(response=>{
          if(response.data){
            this.iniciarChat();
          }
        });
    });
  }

  async editarUsuario(){
    this.modalCtrl.create({
      component: ChatNameEditModalComponent,
      componentProps:{
        item:this.chat.getCurrentUser(),
      }
    }).then((modal) => {
        modal.present();
        modal.onDidDismiss().then(response=>{
          if(response.data){
            this.chat.desconectar();
            this.iniciarChat();
          }
        });
    });
  }

  async popover(ev: any) {
    const popover = await this.popoverController.create({
        component: PopoverHomeComponent,
        event: ev,
        animated: true,
        showBackdrop: true
    });
    popover.onDidDismiss().then(response=>{
      if(response.data){
        switch(response.data){
          case 1: //refrescar
            this.editarUsuario();
          break;
        }
      }
    });
    return await popover.present();
  }
}
