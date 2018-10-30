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

  constructor(private auth: AuthService, private router: Router,
    private modalController: ModalController,
    public alertController: AlertController, public mController: MenuController,
    public popoverController: PopoverController) {

    }

  ngOnInit() {
    if (window.atob(Cookies.get('usuario_id')) === undefined) {
      this.logOut();
    }
    this.usuario_id = window.atob(Cookies.get('usuario_id'));
    this.autenticado = Boolean(window.atob(Cookies.get('autenticado')));
    if (window.atob(Cookies.get('permiso')) === 'false') {
      this.permisos = false;
    } else {
      this.permisos = true;
    }
  }

  logOut() {
    this.auth.signOut().then(() => {
      this.autenticado = false;
      this.permisos = false;
      Cookies.remove('usuario_id');
      Cookies.remove('autenticado');
      Cookies.remove('permiso');
      this.router.navigateByUrl('/loguear');
    });
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
      componentProps: {usuario_id : this.usuario_id, permiso: this.permisos}
    });
    return await modal.present();
  }

  async listaChats(ev: any) {
    const popover = await this.popoverController.create({
      component: PopListaChatsComponent,
      event: ev,
      translucent: false
    });
    return await popover.present();
  }

}
