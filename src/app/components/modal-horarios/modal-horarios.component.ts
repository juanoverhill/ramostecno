import { Turno } from './../../../Model/models';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/f-base.service';
import { Observable } from 'rxjs';
import { NavParams, ModalController } from '@ionic/angular';
import { DocPipe } from '../../doc.pipe';
import { Router } from '@angular/router';
import { PrecioReparacion } from '../../../Model/models';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

// tslint:disable-next-line:class-name
interface hora_disponible {
  empresa: any;
  horas_trabajo: any;
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
  cargoOK = false;
  _horariosTomados: any [] = [];

  constructor(private fb: FirestoreService, public navParams: NavParams,
    private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {
      this.reparacionID = this.navParams.get('idReparacion');
      this.colorID = this.navParams.get('idColor');
      this.fecha = this.navParams.get('fecha');
      this.fb.col$('HORA_DISPONIBLE', ref => ref.where('empresa', '==', 'ramosTecno')).subscribe(data => {
      const datos = data[0] as hora_disponible;
      const array = datos.horas_trabajo.split(',').map(Number);
      this._horarios = array;
      this.getHorariosTomados();
    });
  }

  public async close() {
    const modal = await this.modalCtrl.getTop();
    modal.dismiss();
  }

  getHorariosTomados() {
    this.fecha = this.fecha.toISOString().slice(0, 10);
    this.fb.colWithIds$('TURNO', ref => ref.where('fecha_reparacion', '==', this.fecha)).subscribe(data => {
        data.forEach(element => {
        const datos = element as Turno;
        this._horariosTomados.push(datos.hora_reparacion);
      });
      this.cargoOK = true;
    });
  }

  confirmaTurno(hora) {
    const url = '/confirmacion-turno/' +
    this.reparacionID + '/' +
    this.colorID + '/' +
    this.fecha + '/' + hora;
    this.router.navigateByUrl(url);
    this.close();
  }

}
