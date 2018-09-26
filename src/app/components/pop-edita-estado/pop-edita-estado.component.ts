import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/f-base.service';
import { NavParams, ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EstadoReparacion } from '../../../Model/models';

@Component({
  selector: 'app-pop-edita-estado',
  templateUrl: './pop-edita-estado.component.html',
  styleUrls: ['./pop-edita-estado.component.scss']
})
export class PopEditaEstadoComponent implements OnInit {

  estadosReparacion: Observable<EstadoReparacion[]>;

  constructor(private fb: FirestoreService, public navParams: NavParams,
    private router: Router, private modalCtrl: ModalController,
    public alertController: AlertController) { }

  ngOnInit() {
    this.estadosReparacion = this.fb.colWithIds$('ESTADO', ref => ref.orderBy('orden', 'asc'));
  }

  cambiaDescripcion(id, valor) {
    const estado = new EstadoReparacion();
    estado.descripcion_estado = valor;
    this.fb.update('ESTADO/' + id, estado);
  }

  eliminaEstado(id) {
    this.fb.delete('ESTADO/' + id);
  }

  async alertAddEstado() {
    const alert = await this.alertController.create({
      header: 'Agregar Estado',
      inputs: [
        {
          name: 'descripcion',
          type: 'text',
          placeholder: 'Descripcion'
        },
        {
          name: 'template',
          type: 'text',
          placeholder: 'Ingrese el template'
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
            const est = new EstadoReparacion();
            est.descripcion_estado = datos.descripcion;
            est.templateID = datos.template;
            this.fb.add('ESTADO', est);
          }
        }
      ],
      cssClass: ['alert'],
    });
    await alert.present();
  }

  async alertEdita(id, template) {
    const alert = await this.alertController.create({
      header: 'Agregar Estado',
      inputs: [
       {
          name: 'template',
          type: 'text',
          placeholder: 'Ingrese el template',
          value: template
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
            const est = new EstadoReparacion();
            est.templateID = datos.template;
            this.fb.update('ESTADO/' + id, est);
          }
        }
      ],
      cssClass: ['alert'],
    });
    await alert.present();
  }

  ordena(evento) {
    console.log(evento);
  }

}
