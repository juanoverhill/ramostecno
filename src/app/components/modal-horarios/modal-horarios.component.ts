import { Turno } from './../../../Model/models';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/f-base.service';
import { Observable } from 'rxjs';
import { NavParams, ModalController, ToastController } from '@ionic/angular';
import { DocPipe } from '../../doc.pipe';
import { Router } from '@angular/router';
import { PrecioReparacion } from '../../../Model/models';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

// tslint:disable-next-line:class-name
interface hora_disponible {
  empresa: any;
  horas_trabajo: any;
  horarios_retiro: any;
}

@Component({
  selector: 'app-modal-horarios',
  templateUrl: './modal-horarios.component.html',
  styleUrls: ['./modal-horarios.component.scss']
})

export class ModalHorariosComponent implements OnInit {

  reparacionID: any;
  colorID: any;
  fecha: any;
  _horarios: any[] = [];
  _horariosRetiro: any[] = [];
  cargoOK = false;
  _horariosTomados: any [] = [];
  turnoID: string;

  constructor(private fb: FirestoreService, public navParams: NavParams,
    private router: Router, private modalCtrl: ModalController, public toastController: ToastController) { }

  ngOnInit() {
      this.reparacionID = this.navParams.get('idReparacion');
      this.colorID = this.navParams.get('idColor');
      this.fecha = this.navParams.get('fecha');
      this.turnoID = this.navParams.get('turnoID');

      this.fb.col$('HORA_DISPONIBLE', ref => ref.where('empresa', '==', 'ramosTecno')).subscribe(data => {
      const datos = data[0] as hora_disponible;
      const array = datos.horas_trabajo.split(',').map(Number);
      this._horarios = array;
      const arrayRetiro = datos.horarios_retiro.split(',').map(Number);
      this._horariosRetiro = arrayRetiro;
      this.getHorariosTomados();
    });
  }

  public async close() {
    const modal = await this.modalCtrl.getTop();
    modal.dismiss();
  }

  getHorariosTomados() {
    this.fecha = this.fecha.toISOString().slice(0, 10);
    // Verifico que no tenga turno previo
    if (this.turnoID === '') {
      this.fb.colWithIds$('TURNO', ref => ref.where('fecha_reparacion', '==', this.fecha)).subscribe(data => {
        data.forEach(element => {
          const datos = element as Turno;
          this._horariosTomados.push(datos.hora_reparacion);
        });
        this.cargoOK = true;
      });
    } else {
      this.fb.colWithIds$('TURNO', ref => ref.where('fecha_retiro', '==', this.fecha)).subscribe(data => {
        data.forEach(element => {
          const datos = element as Turno;
          this._horariosTomados.push(datos.hora_retiro);
        });
        this._horarios = this._horariosRetiro;
        this.cargoOK = true;
      });
    }
  }

  sacaTurno(hora) {
    if (this.turnoID !== '') {
      this.confirmaReserva(hora);
    } else {
      this.confirmaTurno(hora);
    }
  }

  confirmaReserva(hora) {
        this.fb.update('TURNO/' + this.turnoID, {'fecha_retiro' : this.fecha, 'hora_retiro' : hora});
        this.retiroConfirmado();
        this.router.navigateByUrl('/historial-turnos/');
        this.close();
  }

  confirmaTurno(hora) {
    const url = '/confirmacion-turno/' +
    this.reparacionID + '/' +
    this.colorID + '/' +
    this.fecha + '/' + hora;
    this.router.navigateByUrl(url);
    this.close();
  }

  async retiroConfirmado() {
    const toast = await this.toastController.create({
      message: 'Se genero correctamente el retiro',
      duration: 2000
    });
    toast.present();
    this.router.navigateByUrl('/historial-turnos/');
  }

}
