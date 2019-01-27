import { ChatRoomComponent } from '../chat-room/chat-room.component';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, MenuController, PopoverController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnularFechasComponent } from '../anular-fechas/anular-fechas.component';
import { HorariosTrabajoComponent } from '../horarios-trabajo/horarios-trabajo.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { PopEditaEstadoComponent } from '../pop-edita-estado/pop-edita-estado.component';
import { PopListaChatsComponent } from '../pop-lista-chats/pop-lista-chats.component';
import * as Cookies from 'es-cookie';
import { FirestoreService } from '../../../services/f-base.service';
import { ListaChat, ChatRoom } from '../../../Model/models';
import { NuevoTurnoComponent } from '../nuevo-turno/nuevo-turno.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  autenticado: boolean;
  permisos: boolean;
  nombre_usuario;
  usuario_id;
  usuariosMensSinLeer: ListaChat[] = [];
  cantidadMensajesSinLeer = 0;
  cantidadMensajesSinLeerUsr = 0;
  cargoOK = false;
  usuarioMail;

  constructor(private auth: AuthService, private router: Router,
    private modalController: ModalController,
    public alertController: AlertController, public mController: MenuController,
    public popoverController: PopoverController, private fb: FirestoreService) {

    }

  ngOnInit() {
    if (window.atob(localStorage.getItem('usuario_id')) === undefined) {
      this.logOut();
    } else {
      this.usuario_id = window.atob(localStorage.getItem('usuario_id'));
      this.nombre_usuario = window.atob(localStorage.getItem('nombreUsuario'));
      this.usuarioMail = window.atob(localStorage.getItem('usuarioMail'));
      this.autenticado = Boolean(window.atob(localStorage.getItem('autenticado')));
      if (window.atob(localStorage.getItem('permiso')) === 'false') {
        this.permisos = false;
        this.getMensajesPendientesUsr();
      } else {
        this.permisos = true;
        this.getMensajesPendientes();
      }
    }
  }

  getMensajesPendientes() {
    // Obtengo toda la lista de usuarios con mensajes pendientes de lectura
    this.fb.colWithIds$('CHAT_ROOM', ref => ref.where('sender', '==', false).where('leido', '==', false)).subscribe((mens: ChatRoom[]) => {
      this.cantidadMensajesSinLeer = 0;
      mens.forEach(ms => {
        const nwMs = new ListaChat();
        nwMs.usuario_id = ms.usuario_id;
        if (!this.existeUser(nwMs.usuario_id)) {
          this.usuariosMensSinLeer.push(nwMs);
          this.cantidadMensajesSinLeer++;
        }
      });
      this.cargoOK = true;
    });
  }

  getMensajesPendientesUsr() {
    // Obtengo toda la lista de usuarios con mensajes pendientes de lectura
    this.fb.colWithIds$('CHAT_ROOM', ref => ref.where('sender', '==', true)
    .where('leido', '==', false)
    .where('usuario_id', '==', this.usuario_id)).subscribe((mens: ChatRoom[]) => {
      this.cantidadMensajesSinLeerUsr = 0;
      mens.forEach(ms => {
        const nwMs = new ListaChat();
        nwMs.usuario_id = ms.usuario_id;
        if (!this.existeUser(nwMs.usuario_id)) {
          this.usuariosMensSinLeer.push(nwMs);
          this.cantidadMensajesSinLeerUsr++;
        }
      });
      this.cargoOK = true;
    });
  }

  existeUser(userID: string): boolean {
    return this.usuariosMensSinLeer.some(u => u.usuario_id === userID);
  }

  logOut() {
    this.auth.signOut().then(() => {
      localStorage.clear();
      this.autenticado = false;
      this.permisos = false;
      this.deleteAllCookies();
      this.router.navigateByUrl('/loguear');
    });
  }

   deleteAllCookies() {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
}


  async anularFechas() {
    const modal = await this.modalController.create({
      component: AnularFechasComponent,
      componentProps: {}
    });
    return await modal.present();
  }

  async horariosTrabajo() {
    const modal = await this.modalController.create({
      component: HorariosTrabajoComponent,
      componentProps: {}
    });
    return await modal.present();
  }

  async estadosReparacion() {
    const modal = await this.modalController.create({
      component: PopEditaEstadoComponent,
      componentProps: {}
    });
    return await modal.present();
  }

  async chatRoom() {
    const modal = await this.modalController.create({
      component: ChatRoomComponent,
      // tslint:disable-next-line:max-line-length
      componentProps: {usuario_id : this.usuario_id, permiso: this.permisos, nombreUsuario: this.nombre_usuario, usuarioMail: this.usuarioMail}
    });
    return await modal.present();
  }

  async listaChats(ev: any) {
    if (this.cantidadMensajesSinLeer !== 0) {
      const popover = await this.popoverController.create({
        component: PopListaChatsComponent,
        event: ev,
        translucent: false
      });
      return await popover.present();
    }
  }

  async nuevoTurno() {
    const modal = await this.modalController.create({
      component: NuevoTurnoComponent,
      componentProps: {}
    });
    return await modal.present();
  }

}
