import { CategoriaReparacion, Reparacion } from './../../../Model/models';
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
  _reparacionSeleccionada = false;
  _cargoOK = false;
  _categorias: Observable<any[]>;
  _reparaciones: Observable<PrecioReparacion[]>;
  equipoID: any;
  colorID: any;
  _reparacionCotizada: any;
  _reparacionID: any;
  tieneReparaciones = false;
  constructor(private fb: FirestoreService, public navParams: NavParams,
    private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.equipoID = this.navParams.get('idEquipo');
    this.colorID = this.navParams.get('idColor');
    this._categorias = this.fb.colWithIds$('CATEGORIA_REPARACION', ref => ref.orderBy('orden'));
    this._categorias.subscribe(data => {
      this._cargoOK = true;
    });
  }

  nextPage() {
    this.router.navigateByUrl('/calendar/' + this._reparacionID + '/' + this.colorID);
    this.close();
  }

  public async close() {
    const modal = await this.modalCtrl.getTop();
    modal.dismiss();
  }

  cargarOpciones(categoriaID) {
    // tslint:disable-next-line:max-line-length
    this._reparaciones = this.fb.colWithIds$('PRECIO_REPARACION', ref => ref.where('equipo_id', '==', this.equipoID).where('categoria_id', '==', categoriaID));
    this._reparaciones.subscribe(data => {
      if (data.length > 0) {
        this.tieneReparaciones = true;
      } else {
        this.tieneReparaciones = false;
      }
      this._reparacionSeleccionada = false;
      this._categoriaSeleccionada = true;
    });
  }

  cargarDatosReparacion(reparacionID) {
      this._reparacionCotizada = this.fb.doc$('PRECIO_REPARACION/' + reparacionID);
      this._reparacionID = reparacionID;
      this._reparacionCotizada.subscribe(data => {
      this._reparacionSeleccionada = true;
    });
  }

}
