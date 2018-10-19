import { ChatRoomComponent } from '../chat-room/chat-room.component';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, MenuController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnularFechasComponent } from '../anular-fechas/anular-fechas.component';
import { HorariosTrabajoComponent } from '../horarios-trabajo/horarios-trabajo.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { PopEditaEstadoComponent } from '../pop-edita-estado/pop-edita-estado.component';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  autenticado: boolean;
  permisos: boolean;
  nombre_usuario;

  constructor(private auth: AuthService, private router: Router,
    private modalController: ModalController, public alertController: AlertController, public mController: MenuController) {

    }

  ngOnInit() {
    this.autenticado = Boolean(localStorage.getItem('autenticado'));
    if (localStorage.getItem('permiso') === 'false') {
      this.permisos = false;
    } else {
      this.permisos = true;
    }
    console.log(this.permisos);
  }

  logOut() {
    this.auth.signOut().then(() => {
      this.autenticado = false;
      this.permisos = false;
      localStorage.clear();
      // localStorage.setItem('autenticado', 'false');
      // localStorage.setItem('permiso', 'false');
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
      componentProps: {}
    });
    return await modal.present();
  }
}
