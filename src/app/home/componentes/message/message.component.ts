import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from 'src/app/_models/usuario';
import { Auxiliar } from 'src/app/_helpers/auxiliar';

@Component({
  selector: 'chat-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {

  @Input('usuario') usuario:Usuario;
  @Input('messageList') messageList:[any];
  @Input('message') message;

  itemStyle:string;
  labelRecieved:string;
  labelSent:string;
  constructor() { }

  ngOnInit() {
    this.itemStyle = 'message '+this.messageStyles(this.message);
    this.labelRecieved = 'ion-text-end '+ this.labelStyle(this.message);
    this.labelSent = 'ion-text-start '+ this.labelStyle(this.message);
  }

  messageStyles(msg):String{
    let styles ='';
    let index = Auxiliar.binarySearch(this.messageList,msg);
    //{{u.id == msg.senderId?'received':'sent'}} {{(msg.senderId == messageList[i+1]?.senderId)?'same':'last'}}
    if(this.usuario.id == msg.senderId){
      styles+=' received';
    } else {
      styles+=' sent';
    }
    if(this.messageList[index + 1]){
      if(this.messageList[index + 1].senderId == msg.senderId){
        styles+=' same';
      } else {
        styles+=' last';
      }
    } else {
      styles+=' last';
    }
    return styles;
  }

  labelStyle(msg):String{
    let styles ='';
    let index = Auxiliar.binarySearch(this.messageList,msg);
    //{{(msg.senderId == messageList[i+1]?.senderId)?'same':'last'}}
    if(this.messageList[index + 1]){
      if(this.messageList[index + 1].senderId == msg.senderId){
        styles+=' same';
      } else {
        styles+=' last';
      }
    } else {
      styles+=' last';
    }
    return styles; 
  }
  ifAutor(msg):boolean{
    return this.usuario.id == msg.senderId;
  }
  ifFirstAutorMessage(msg):boolean{
    let index = Auxiliar.binarySearch(this.messageList,msg);
    //msg.senderId != messageList[i-1]?.senderId
    return (this.messageList[index - 1]?(this.messageList[index - 1].senderId != msg.senderId):true);
  }
  ifLastAutorMessage(msg):boolean{
    let index = Auxiliar.binarySearch(this.messageList,msg);
    //msg.senderId != messageList[i+1]?.senderId
    return (this.messageList[index + 1]?(this.messageList[index + 1].senderId != msg.senderId):true);
  }

  identify(index, item){
    return item.id; 
  }
}
