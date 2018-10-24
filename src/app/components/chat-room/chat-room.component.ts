import { ChatRoom } from './../../../Model/models';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FirestoreService } from '../../../services/f-base.service';
import { NavParams, ModalController, Content, List } from '@ionic/angular';
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
  @ViewChild(List, {read: ElementRef}) chatList: ElementRef;

  messages: Observable<ChatRoom[]>;
  autenticado = false;
  usuario;
  private mutationObserver: MutationObserver;

  constructor(private fb: FirestoreService, public navParams: NavParams,
    private router: Router, private modalCtrl: ModalController, private auth: AuthService) { }

  ngOnInit() {

    this.mutationObserver = new MutationObserver((mutations) => {
      this.contentArea.scrollToBottom();
  });

  this.mutationObserver.observe(this.chatList.nativeElement, {
      childList: true
  });

    // Verifico previamente si esta logueado
    this.auth.afAuth.authState.subscribe(user => {
      if (user) {
        this.autenticado = true;
        this.usuario = user.uid;
        // Obtengo los mensajes
        this.messages = this.fb.colWithIds$('CHAT_ROOM', ref => ref.orderBy('createdAt'));
      } else {
        this.login();
      }
    }, () => {
      this.login();
    }
    );
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
    newMess.sender = false;
    this.fb.add('CHAT_ROOM', newMess);

    textoMessage.value = '';
  }

}
