import { Component, OnInit } from '@angular/core';
import { ChatService, ChatUser } from 'src/app/_services/chat.service';
import { NavParams, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingProvider } from 'src/app/providers/loading.provider';

@Component({
  selector: 'app-chat-name-edit-modal',
  templateUrl: './chat-name-edit-modal.component.html',
  styleUrls: ['./chat-name-edit-modal.component.scss'],
})
export class ChatNameEditModalComponent implements OnInit {

  item;
  formulario:FormGroup;

  constructor(
    private service:ChatService,
    private navParams:NavParams,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private loading: LoadingProvider,
  ) { 
    this.formulario = this.formBuilder.group({
      nombre:['',Validators.required],
    });
  }

  ngOnInit() {
    this.item = this.navParams.get('item');
    if(this.item){
      this.f.nombre.setValue(this.item.name);
    }
    console.log(this.item);
  }

  get f(){
    return this.formulario.controls;
  }

  continuar(){
    if(!this.formulario.valid){
      return;
    }
    let chatUser = <ChatUser>{};
    chatUser.nombre = this.f.nombre.value;
    this.loading.present();
    if(this.item){
      chatUser.id = this.item.id;
      this.service.update(chatUser).subscribe(response=>{
        this.loading.dismiss();
        this.modalCtrl.dismiss(true);
      });
    } else {
      this.service.register(chatUser).subscribe(response=>{
        this.loading.dismiss();
        this.modalCtrl.dismiss(true);
      });
    }
  }

  cerrar(){
    this.modalCtrl.dismiss(false);
  }
}
