import { ChatRoom } from './../../../Model/models';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/f-base.service';
import { NavParams, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {

  messages: Observable<ChatRoom[]>;

  constructor(private fb: FirestoreService, public navParams: NavParams,
    private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.messages = this.fb.colWithIds$('CHAT_ROOM');
    window.scrollTo(0, document.body.scrollHeight);
  }

  newMessagge(message) {
    const newMess = new ChatRoom();
    newMess.mensaje = message;
    newMess.usuario_id = '';
    newMess.time = new Date();
    newMess.empresa = 'RamosTecno';
    newMess.leido = false;
    newMess.sender = true;
    this.fb.add('CHAT_ROOM', newMess);
  }

}
