import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/f-base.service';
import { AuthService } from '../../services/auth.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Marca, Equipo } from '../../Model/models';
import { PopUpComponent } from '../components/pop-up/pop-up.component';

@Component({
  selector: 'app-admnistrar-equipos',
  templateUrl: './admnistrar-equipos.page.html',
  styleUrls: ['./admnistrar-equipos.page.scss'],
})
export class AdmnistrarEquiposPage implements OnInit {

  autenticado = false;
  permisos = false;
  marcas: Observable<any[]>;
  equipos: Observable<any[]>;
  tieneEquipos = false;
  estado = 'ACTIVO';

  constructor(private fb: FirestoreService, private auth: AuthService,
    private router: Router, public alertController: AlertController, private modalController: ModalController) { }

  ngOnInit() {
    // Verifico previamente si esta logueado
    this.auth.afAuth.authState.subscribe(user => {
      if (user) {
        this.autenticado = true;
        this.getPerfilUsuario(this.auth.getUserID());
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

  getPerfilUsuario(usuarioID) {
    this.fb.colWithIds$('USUARIO', ref => ref.where('usuario_id', '==', usuarioID)).subscribe(
      data => {
        if (data.length > 0) {
          this.permisos = true;
          this.getMarcas();
        } else {
        }
      }
    );
  }

  getMarcas() {
    this.marcas = this.fb.colWithIds$('MARCA');
  }

  getEquipos(marca) {
    this.equipos = this.fb.colWithIds$('EQUIPO', ref => ref.where('marca_id', '==', marca.value));
    this.equipos.subscribe(d => {
      this.tieneEquipos = true;
    });
  }

  getEquiposInactivos(evento) {
    if (evento.detail.checked) {
      this.estado = 'INACTIVO';
    } else {
      this.estado = 'ACTIVO';
    }
  }

  async alertEliminaMarca(marcaID) {
    const alert = await this.alertController.create({
      header: 'Eliminar!',
      message: '<strong>Desea eliminar la marca?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.fb.delete('MARCA/' + marcaID);
          }
        }
      ]
    });
    await alert.present();
  }

  async alertNuevaMarca() {
    const alert = await this.alertController.create({
      header: 'Nueva marca',
      inputs: [
        {
          name: 'nuevaMarca',
          type: 'text',
          placeholder: 'Ingrese el nombre'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (marca) => {
            const data = new Marca();
            data.descripcion = marca.nuevaMarca;
            this.fb.add('MARCA', data);
          }
        }
      ]
    });
    await alert.present();
  }

  async alertEditarMarca(marcaID, marcaDesc) {
    const alert = await this.alertController.create({
      header: 'Editar marca',
      inputs: [
        {
          name: 'updateMarca',
          type: 'text',
          placeholder: 'Ingrese el nombre',
          value: marcaDesc
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (datos) => {
            const data = new Marca();
            data.descripcion = datos.updateMarca;
            this.fb.update('MARCA/' + marcaID, data);
          }
        }
      ]
    });

    await alert.present();
  }

  async alertEliminaEquipo(equipoID) {
    const alert = await this.alertController.create({
      header: 'Eliminar!',
      message: '<strong>Desea desactivar el Equipo?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Ok',
          handler: () => {
            const data = new Equipo();
            data.estado = 'INACTIVO';
            this.fb.update('EQUIPO/' + equipoID, data);
          }
        }
      ]
    });
    await alert.present();
  }

  async popUpEquipo(equipoID, marcaID) {
    console.log(marcaID);
    const modal = await this.modalController.create({
      component: PopUpComponent,
      componentProps: { idEquipo: equipoID, idMarca: marcaID}
    });
    return await modal.present();
  }

}
