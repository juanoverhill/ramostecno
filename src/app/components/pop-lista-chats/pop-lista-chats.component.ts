import { ChatRoom, ListaChat, Turno, Ticket } from './../../../Model/models';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ChatRoomComponent } from '../chat-room/chat-room.component';
import { FirestoreService } from '../../../services/f-base.service';

@Component({
  selector: 'app-pop-lista-chats',
  templateUrl: './pop-lista-chats.component.html',
  styleUrls: ['./pop-lista-chats.component.scss']
})
export class PopListaChatsComponent implements OnInit {

  sender;
  usuariosMensSinLeer: ListaChat[] = [];
  cargoOK = false;

  constructor(private modalController: ModalController, private fb: FirestoreService, public navParams: NavParams) { }

  ngOnInit() {
    this.sender = true; // Es siempre true porque solo un user admin accede desde aca

    // Obtengo toda la lista de usuarios con mensajes pendientes de lectura
    this.fb.colWithIds$('CHAT_ROOM', ref => ref.where('sender', '==', false).where('leido', '==', false)).subscribe((mens: ChatRoom[]) => {
      mens.forEach(ms => {
        const nwMs = new ListaChat();
        nwMs.usuario_id = ms.usuario_id;
        nwMs.user = ms.nombreUsuario;
        nwMs.email = ms.email;
        nwMs.orderID = 'Sin Ticket';
        if (!this.existeUser(nwMs.usuario_id)) {
          this.usuariosMensSinLeer.push(nwMs);
        }
      });
      this.cargoOK = true;
    });
  }

  existeUser(userID: string): boolean {
    return this.usuariosMensSinLeer.some(u => u.usuario_id === userID);
  }

  async chatRoom(usuarioID, email, user) {
    const modal = await this.modalController.create({
      component: ChatRoomComponent,
      componentProps: {usuario_id: usuarioID, permiso: this.sender, nombreUsuario: user, usuarioMail: email}
    });
    return await modal.present();
  }

  async getLastOrderID(ms: ChatRoom) {
    let lastOrder = '';
    let lastTicket = '';
    let nombreUsuario = '';
    // tslint:disable-next-line:max-line-length
    await this.fb.colWithIds$('TURNO', ref => ref.where('usuario_id', '==', ms.usuario_id).orderBy('createdAt')).subscribe((tur: Turno[]) => {
            lastOrder = tur.pop().id.toString();
            nombreUsuario = tur.pop().nombre_usuario.toString();
            const nwMs = new ListaChat();
            nwMs.usuario_id = ms.usuario_id;
            nwMs.user = nombreUsuario;
            nwMs.orderID = 'Sin Ticket';
            this.fb.colWithIds$('TICKET', ref => ref.where('turno_id', '==', lastOrder)).subscribe((tkts: Ticket[]) => {
              lastTicket = tkts.pop().id;
              nwMs.orderID = lastTicket.toString().padStart(8, '0');
              this.usuariosMensSinLeer.push(nwMs);
              // Saco los duplicados
              this.usuariosMensSinLeer = this.usuariosMensSinLeer.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
              });
              this.cargoOK = true;
       });
    });
  }

}
