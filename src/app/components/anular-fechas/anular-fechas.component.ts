import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/f-base.service';
import { ModalController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import {FormControl} from '@angular/forms';
import { Fecha } from '../../../Model/models';

@Component({
  selector: 'app-anular-fechas',
  templateUrl: './anular-fechas.component.html',
  styleUrls: ['./anular-fechas.component.scss']
})
export class AnularFechasComponent implements OnInit {

  fechasAnuladas: Observable<any[]>;
  date = new FormControl(new Date());

  constructor(private fb: FirestoreService,private modalCtrl: ModalController,
    public alertController: AlertController) { }

  ngOnInit() {
    this.fechasAnuladas = this.fb.colWithIds$('FECHA_ANULADA');
  }

  public async close() {
    const modal = await this.modalCtrl.getTop();
    modal.dismiss();
  }

  anularFecha(fecha) {
    
    const fech = new Fecha();
    fech.fecha = fecha;
    this.fb.add('FECHA_ANULADA', fech);
  }

  async presentAlert(fecha) {
    const fechaSeleccionada = fecha.value.toISOString().slice(0, 10);
    const alert = await this.alertController.create({
      header: 'Anular Fecha',
      subHeader: 'Esta fecha no estara disponible',
      message: 'Desea realmente anular esta fecha? :' + fechaSeleccionada,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'SI!',
          handler: () => {
            this.anularFecha(fechaSeleccionada);
          }
        }
      ]
    });

    await alert.present();
  }

  cancelarAnulacion(fecha) {
    this.fb.delete('FECHA_ANULADA/'+fecha);
  }
}
