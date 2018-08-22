import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/f-base.service';
import { Observable } from 'rxjs';
import {PrecioReparacion } from './../../Model/models';
import { NavParams } from '@ionic/angular';
import { DocPipe } from '../doc.pipe';

@Component({
  selector: 'app-modal-seleccion-reparacion',
  templateUrl: './modal-seleccion-reparacion.component.html',
  styleUrls: ['./modal-seleccion-reparacion.component.scss']
})
export class ModalSeleccionReparacionComponent implements OnInit {

  _cargoOK = false;
  _reparaciones: Observable<PrecioReparacion[]>;
  equipoID: any;
  constructor(private fb: FirestoreService, public navParams: NavParams) { }

  ngOnInit() {
    this.equipoID = this.navParams.get('idEquipo');
    this._reparaciones = this.fb.colWithIds$('PRECIO_REPARACION', ref => ref.where('equipo_id', '==', this.equipoID));
    this._reparaciones.subscribe(() => {
      this._cargoOK = true;
    });
  }

}
