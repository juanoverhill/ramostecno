import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnularFechasComponent } from '../anular-fechas/anular-fechas.component';
import { HorariosTrabajoComponent } from '../horarios-trabajo/horarios-trabajo.component';



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
    private modalController: ModalController, public alertController: AlertController) { }

  ngOnInit() {
    this.autenticado = Boolean(localStorage.getItem('autenticado'));
    this.permisos = Boolean(localStorage.getItem('permiso'));
  }

  logOut() {
    this.auth.signOut().then(() => {
      this.autenticado = false;
      localStorage.setItem('autenticado', 'false');
      localStorage.setItem('permiso', 'false');
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

}
