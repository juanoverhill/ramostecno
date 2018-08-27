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
      this.cargoOK = true;
    });
  }


  close() {
    console.log('close');
  }

}
