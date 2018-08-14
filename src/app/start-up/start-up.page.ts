import { FirestoreService } from './../../services/f-base.service';
import { Equipo, Marca, PrecioReparacion } from './../../Model/models';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Compiler } from '@angular/core';

@Component({
  selector: 'app-start-up',
  templateUrl: './start-up.page.html',
  styleUrls: ['./start-up.page.scss'],
})
export class StartUpPage implements OnInit {

  constructor(private afs: AngularFirestore, private _compiler: Compiler, private fb: FirestoreService) { }

  _equipos: Observable<Equipo[]>;
  _marcas: Observable<Marca[]>;
  _reparaciones: Observable<PrecioReparacion[]>;
  marcaSeleccionada: Marca;
  equipoSeleccionado: Equipo;
  reparacionSeleccionada: any;
  rep: Observable<PrecioReparacion>;

  ngOnInit() {
    this._marcas = this.fb.colWithIds$('MARCA');
  }

  onMarcaChange(marcaID) {
     this.equipoSeleccionado = null;
     this._equipos = this.fb.colWithIds$('EQUIPO', ref => ref.where('marca_id', '==', marcaID));
  }

  onEquipoChange(equipoID) {
    if (equipoID != null) {
      this.reparacionSeleccionada = null;
      this._reparaciones = this.fb.colWithIds$('PRECIO_REPARACION', ref => ref.where('equipo_id', '==', equipoID));
    }
  }

  onReparacionChange(reparacionID) {
     this.rep = this.fb.doc$('PRECIO_REPARACION/' + reparacionID);
  }
}
