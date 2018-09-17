import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/f-base.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { CategoriaReparacion, Reparacion } from '../../Model/models';
import { DocumentReference } from 'angularfire2/firestore';

@Component({
  selector: 'app-administrar-reparaciones',
  templateUrl: './administrar-reparaciones.page.html',
  styleUrls: ['./administrar-reparaciones.page.scss'],
})
export class AdministrarReparacionesPage implements OnInit {

  autenticado = false;
  permisos = false;
  categorias: Observable<any[]>;
  reparaciones: Observable<any[]>;
  tieneReparaciones = false;
  ref: DocumentReference;

  constructor(private fb: FirestoreService, private auth: AuthService,
    private router: Router, public alertController: AlertController) { }

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
          this.getCategorias();
        } else {

        }
      }
    );
  }

  getCategorias() {
    this.categorias = this.fb.colWithIds$('CATEGORIA_REPARACION');
  }

  getSubCategorias(categoria) {
    this.reparaciones = this.fb.colWithIds$('REPARACION', ref => ref.where('categoria_id', '==', categoria.value));
    this.reparaciones.subscribe(d => {
      this.tieneReparaciones = true;
    });
  }

  async alertEliminaCategoria(categoriaID) {
    const alert = await this.alertController.create({
      header: 'Eliminar!',
      message: '<strong>Desea eliminar la categoria?</strong>',
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
            this.eliminaReparacionCat(categoriaID);
          }
        }
      ]
    });

    await alert.present();
  }

  eliminaReparacionCat(reparacionID) {
    this.fb.delete('CATEGORIA_REPARACION/' + reparacionID);
  }

  async alertNuevaCategoria() {
    const alert = await this.alertController.create({
      header: 'Nueva categoria',
      inputs: [
        {
          name: 'nuevaCateg',
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
          handler: (categoria) => {
            const data = new CategoriaReparacion();
            data.descripcion = categoria.nuevaCateg;
            this.fb.add('CATEGORIA_REPARACION', data);
          }
        }
      ]
    });

    await alert.present();
  }

  async alertEditarCategoria(categoriaID, categoriaDesc) {
    const alert = await this.alertController.create({
      header: 'Editar categoria',
      inputs: [
        {
          name: 'updateCategoria',
          type: 'text',
          placeholder: 'Ingrese el nombre',
          value: categoriaDesc
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
            const data = new CategoriaReparacion();
            data.descripcion = datos.updateCategoria;
            this.fb.update('CATEGORIA_REPARACION/' + categoriaID, data);
          }
        }
      ]
    });

    await alert.present();
  }

  async alertEliminaReparacion(reparacionID) {
    const alert = await this.alertController.create({
      header: 'Eliminar!',
      message: '<strong>Desea eliminar la Reparacion?</strong>',
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
            this.fb.delete('REPARACION/' + reparacionID);
          }
        }
      ]
    });

    await alert.present();
  }

  async alertEditarReparacion(reparacionID, descripcionReparacion, accion, terminos) {
    const alert = await this.alertController.create({
      header: 'Editar Reparacion',
      inputs: [
        {
          name: 'updateDescripion',
          type: 'text',
          placeholder: 'Ingrese la descripcion',
          value: descripcionReparacion
        },
        {
          name: 'updateAccion',
          type: 'text',
          placeholder: 'Ingrese la descripcion',
          value: accion
        },
        {
          name: 'updateTerminos',
          type: 'text',
          placeholder: 'Ingrese la descripcion',
          value: terminos
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (datos) => {
            const data = new Reparacion();
            data.descripcion = datos.updateDescripion;
            data.terminos = datos.updateTerminos;
            data.accion = datos.updateAccion;
            this.fb.update('REPARACION/' + reparacionID, data);
          }
        }
      ],
      cssClass: ['alert'],
    });

    await alert.present();
  }

  async alertAddReparacion(categoriaID) {
    const alert = await this.alertController.create({
      header: 'Editar Reparacion',
      inputs: [
        {
          name: 'updateDescripion',
          type: 'text',
          placeholder: 'Ingrese la descripcion'
        },
        {
          name: 'updateAccion',
          type: 'text',
          placeholder: 'Ingrese la descripcion'
        },
        {
          name: 'updateTerminos',
          type: 'text',
          placeholder: 'Ingrese la descripcion'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (datos) => {
            const data = new Reparacion();
            data.descripcion = datos.updateDescripion;
            data.terminos = datos.updateTerminos;
            data.accion = datos.updateAccion;
            data.categoria_id = categoriaID;
            this.ref.set(this.fb.doc$('CATEGORIA_REPARACION/' + categoriaID));
            data.categoriaRef = this.ref;
            this.fb.add('REPARACION/', data);
          }
        }
      ],
      cssClass: ['alert'],
    });

    await alert.present();
  }


}
