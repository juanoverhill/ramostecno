import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
import { ChatRoomComponent } from '../chat-room/chat-room.component';

@Component({
  selector: 'app-pop-lista-chats',
  templateUrl: './pop-lista-chats.component.html',
  styleUrls: ['./pop-lista-chats.component.scss']
})
export class PopListaChatsComponent implements OnInit {

  constructor(private modalController: ModalController, private auth: AuthService) { }

  ngOnInit() {
  }

  async chatRoom() {
    const modal = await this.modalController.create({
      component: ChatRoomComponent,
      componentProps: {}
    });
    return await modal.present();
  }

}
