import { ChatRoom } from './../../../Model/models';
import { Component, OnInit, ViewChild, SimpleChanges, ChangeDetectorRef} from '@angular/core';
import { FirestoreService } from '../../../services/f-base.service';
import { NavParams, ModalController, Content } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {

  @ViewChild(Content) contentArea: Content;

  messages: Observable<ChatRoom[]>;
  usuario;
  sender;

  constructor(private fb: FirestoreService, public navParams: NavParams,
    private router: Router, private modalCtrl: ModalController, private auth: AuthService) {
     }

  ngOnInit() {

    this.usuario = this.navParams.get('usuario_id');
    this.sender = this.navParams.get('permiso');

    // Obtengo los mensajes del usuario cliente
    this.messages = this.fb.colWithIds$('CHAT_ROOM', ref => ref.where('usuario_id', '==', this.usuario).orderBy('createdAt'));
    this.messages.subscribe((mesgs: ChatRoom[]) => {
      setTimeout(() => {
        this.contentArea.scrollToBottom();
      }, 150);
      // Marco como leidos los mensajes
      mesgs.forEach(msg => {
        if (msg.leido === false) {
            msg.leido = true;
            this.fb.update('CHAT_ROOM', msg);
        }
      });
    });
    // setTimeout(() => {
    //   this.contentArea.scrollToBottom();
    // }, 150);
  }


  login() {
    this.router.navigateByUrl('loguear');
  }

  newMessagge() {
    const textoMessage = document.getElementById('mens') as HTMLIonTextareaElement;

    const newMess = new ChatRoom();
    newMess.mensaje = textoMessage.value;
    newMess.usuario_id = this.usuario;
    newMess.time = new Date();
    newMess.empresa = 'RamosTecno';
    newMess.leido = false;
    newMess.sender = this.sender;
    this.fb.add('CHAT_ROOM', newMess);

    textoMessage.value = '';

    setTimeout(() => {
      this.contentArea.scrollToBottom();
    }, 100);
  }

  OnChanges(changes: SimpleChanges): void {
    this.contentArea.scrollToBottom();
  }

}
