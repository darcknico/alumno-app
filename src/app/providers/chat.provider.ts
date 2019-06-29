import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { AuthService } from '../_services/auth.service';
import { environment } from 'src/environments/environment';
import { SedeProvider } from './sede.provider';
import { Usuario } from '../_models/usuario';
import { Sede } from '../_models/sede';

@Injectable({
  providedIn: 'root'
})
export class ChatProvider {

  chatManager$:BehaviorSubject<boolean> = new BehaviorSubject(false);

  AUTH_URL = environment.base_path+'token';
  INSTANCE_LOCATOR = 'v1:us1:6f2c67fd-a86f-4e2a-a451-269d707cdd02';
  GENERAL_ROOM_ID = '19439597';
  GENERAL_ROOM_INDEX = 0;

  chatManager: ChatManager;
  currentUser;
  messages = [];

  usuario:Usuario;
  token:string;
  sede:Sede;

  usersSubject = new BehaviorSubject([]);
  isUsuario:boolean = false;
  isRoom:boolean = false;
  messagesSubject = new BehaviorSubject([]);

  constructor(
      private authService:AuthService,
      private sedeProvider:SedeProvider,
  ) { 
    this.authService.user$.subscribe(response=>{
        this.usuario=response;
        this.desconectar();
        if(this.token && this.sede){
            this.connectToChatkit();
        }
    });
    this.authService.token$.subscribe(response=>{
        this.token=response;
        this.desconectar();
        if(this.usuario && this.sede){
            this.connectToChatkit();
        }
    });
    this.sedeProvider.sede$.subscribe(response=>{
        this.sede=response;
        this.desconectar();
        if(this.usuario && this.token){
            this.connectToChatkit();
        }
    });
  }

  async connectToChatkit() {
    this.desconectar();
    console.log('iniciando chat');
    
    this.chatManager = new ChatManager({
      instanceLocator: this.INSTANCE_LOCATOR,
      userId: String(this.usuario.id),
      tokenProvider: new TokenProvider(
            { 
                url: this.AUTH_URL,
                queryParams:{
                    id_sede:String(this.sede.id),
                },
                headers: {
                    Authorization:this.token,
                }
            }
        )
    });
    this.chatManager$.next(true);

    /*
    this.currentUser = await this.chatManager.connect();

    await this.currentUser.subscribeToRoom({
      roomId: String(this.sede.room_id),
      hooks: {

        onMessage: message => {
          this.messages.push(message);
          this.messagesSubject.next(this.messages);
        }
      },
      messageLimit: 20
    });


    const users = this.currentUser.rooms[this.GENERAL_ROOM_INDEX].users;
    this.usersSubject.next(users);
    */
  }

  conectar(){
    return this.chatManager.connect().then(currentUser => {
      this.currentUser = currentUser;
      this.isUsuario = true;
      return true;
    })
    .catch(err => {
      console.log('Connect Error on connection', err);
      if(err.info.error == "services/chatkit/not_found/user_not_found"){
        this.isUsuario = false;
      }
      return false;
    });
  }

  suscribir(){
    return this.currentUser.subscribeToRoom({
      roomId: String(this.sede.room_id),
      hooks: {

        onMessage: message => {
          this.messages.push(message);
          this.messagesSubject.next(this.messages);
        }
      },
      messageLimit: 20
    }).then(room => {
      this.isRoom = true;
      return true;
    })
    .catch(err => {
      console.log('Room Error on connection', err);
      if(err.info.error == "services/chatkit_authorizer/authorization/url_param_parsing_failed"){
        this.isRoom = false;
      }
      return false;
    });
  }

  desconectar(){
    this.messages = [];
    if(this.currentUser){
      console.log('Cerrando anterior chat');
      this.currentUser.disconnect();
    }
  }

  getUsers() {
    return this.usersSubject;
  }

  getMessages() {
    return this.messagesSubject;
  }

  sendMessage(message) {
    return this.currentUser.sendMessage({
      text: message.text,
      roomId: message.roomId || this.sede.room_id
    })
  }

  isUserOnline(user): boolean {
    return user.presence.state == 'online';
  }

  getCurrentUser() {
    return this.currentUser;
  }
}
