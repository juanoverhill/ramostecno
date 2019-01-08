import { ChatRoom } from './../../../Model/models';
import { Component, OnInit, ViewChild, SimpleChanges, forwardRef} from '@angular/core';
import { FirestoreService } from '../../../services/f-base.service';
import { NavParams, ModalController, IonContent } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { SendMailService } from '../../../services/send-mail.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {

  @ViewChild(forwardRef(() => IonContent)) contentArea: IonContent;

  messages: Observable<ChatRoom[]>;
  usuario;
  sender;
  nombreUsuario;
  textoTitulo;
  emailUsuario;

  constructor(private fb: FirestoreService, public navParams: NavParams,
    private router: Router, private modalCtrl: ModalController, private mail: SendMailService) {
     }

  ngOnInit() {

    this.usuario = this.navParams.get('usuario_id');
    this.nombreUsuario = this.navParams.get('nombreUsuario');
    this.sender = this.navParams.get('permiso');
    this.emailUsuario = this.navParams.get('usuarioMail');

    this.textoTitulo = this.sender ? this.nombreUsuario : 'Chatea con nosotros!';

    // Obtengo los mensajes del usuario cliente
    this.messages = this.fb.colWithIds$('CHAT_ROOM', ref => ref.where('usuario_id', '==', this.usuario).orderBy('createdAt'));
    this.messages.subscribe((mesgs: ChatRoom[]) => {
      setTimeout(() => {
        this.contentArea.scrollToBottom();
      }, 300);
      // Marco como leidos los mensajes
      mesgs.forEach(msg => {
        if (msg.leido === false) {
            if (this.sender) {
              if (msg.sender === false) {
                msg.leido = true;
                this.fb.update('CHAT_ROOM/' + msg.id, msg);
              }
            } else {
              if (msg.sender) {
                msg.leido = true;
                this.fb.update('CHAT_ROOM/' + msg.id, msg);
              }
          }
        }
      });
    });
  }


  login() {
    this.router.navigateByUrl('loguear');
  }

  public async close() {
    const modal = await this.modalCtrl.getTop();
    modal.dismiss();
  }

  newMessagge() {
    const textoMessage = document.getElementById('mens') as HTMLIonTextareaElement;

    if (textoMessage.value.trim() !== '') {

    const newMess = new ChatRoom();
    newMess.mensaje = textoMessage.value;
    newMess.usuario_id = this.usuario;
    newMess.time = new Date();
    newMess.empresa = 'RamosTecno';
    newMess.leido = false;
    newMess.sender = this.sender;
    newMess.nombreUsuario = this.nombreUsuario;
    newMess.email = this.emailUsuario;
    this.fb.add('CHAT_ROOM', newMess);

    // Envio el mail solo si el usuario es de tipo sender
    if (this.sender) {
      // tslint:disable-next-line:max-line-length
      this.mail.sendEmail(this.emailUsuario, this.nombreUsuario, '', '', 'd-427e460dbdfc4c28afc2eebd07b79d74', 'https://www.reservas.ramostecnoreparaciones.com/historial-turnos/');
    } else {
    }

    textoMessage.value = '';

    setTimeout(() => {
      this.contentArea.scrollToBottom();
    }, 100);

    }
  }

  OnChanges(changes: SimpleChanges): void {
    this.contentArea.scrollToBottom();
  }

}
