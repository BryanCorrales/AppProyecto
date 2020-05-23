import { Component, OnInit } from '@angular/core';
import{AuthService} from '../../servicios/auth.service';
import{ReadchatsService} from '../../servicios/readchats.service';
import {ModalController} from '@ionic/angular';
import {SmsComponent} from '../sms/sms.component';

//FCM
import { FCM } from '@ionic-native/fcm/ngx';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  public chatsR : any =[];
  public to: string;
  
  constructor(private fcm: FCM, public Authservicies: AuthService, public chatservice: ReadchatsService,private modal:ModalController ) { }

  ngOnInit() {
    
    
    this.chatservice.getChats().subscribe( chats=>{
      this.chatsR= chats;
    });
    this.fcm.getToken().then(token=>{
      console.log(token);
      this.saveToken(token);
    })
  }

  

  SingOut(){
    this.Authservicies.logout();
  }
  saveToken(token){
    this.Authservicies.updateToken(token);
  }
  


  AbrirChat(chat){
    this.modal.create({
      component: SmsComponent, 
      componentProps :{
        chat : chat
      }
    }).then((modal)=> modal.present());
  }


}
