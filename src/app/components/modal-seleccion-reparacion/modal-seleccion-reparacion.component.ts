import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/f-base.service';
import { Observable } from 'rxjs';
import { NavParams, ModalController } from '@ionic/angular';
import { DocPipe } from '../../doc.pipe';
import { Router } from '@angular/router';
import { PrecioReparacion } from '../../../Model/models';

@Component({
  selector: 'app-modal-seleccion-reparacion',
  templateUrl: './modal-seleccion-reparacion.component.html',
  styleUrls: ['./modal-seleccion-reparacion.component.scss']
})
export class ModalSeleccionReparacionComponent implements OnInit {

  _categoriaSeleccionada = false;
  _cargoOK = false;
  _categorias: Observable<any[]>;
  _reparaciones: Observable<PrecioReparacion[]>;
  equipoID: any;
  colorID: any;
  constructor(private fb: FirestoreService, public navParams: NavParams,
    private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.equipoID = this.navParams.get('idEquipo');
    this.colorID = this.navParams.get('idColor');
    this._categorias = this.fb.colWithIds$('CATEGORIA_REPARACION');
    this._categorias.subscribe(() => {
      this._cargoOK = true;
    });
  }

  nextPage(reparacionID) {
    this.router.navigateByUrl('/calendar/' + reparacionID + '/' + this.colorID);
    this.modalCtrl.dismiss();
  }

  cargarOpciones(categoriaID) {
    // tslint:disable-next-line:max-line-length
    this._reparaciones = this.fb.colWithIds$('PRECIO_REPARACION', ref => ref.where('equipo_id', '==', this.equipoID).where('categoria_id', '==', categoriaID));
    this._reparaciones.subscribe(() => {
      this._categoriaSeleccionada = true;
    });

  }

}
