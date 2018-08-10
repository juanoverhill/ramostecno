import { ApiService } from './../../services/api.service';
import { Marca } from '../../Model/marca';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Equipo } from '../../Model/equipo';


@Component({
  selector: 'app-seleccion-equipo',
  templateUrl: './seleccion-equipo.page.html',
  styleUrls: ['./seleccion-equipo.page.scss'],
})
export class SeleccionEquipoPage implements OnInit {


  equipoItem: Observable<any[]>;
  equipo: any;
  marcaItem: Observable<any[]>;
  marcaSeleccionada: any;
  marca: Marca;
  equipoSeleccionada: Observable<any>;
  idEquipoSeleccionado: any;

  constructor(private afs: AngularFirestore, private api: ApiService) {
    // Seteo un equipo vacio
    this.equipo = new Equipo('', '', '');
    this.marca = new Marca('', '');
   }

  ngOnInit() {
    // Obtengo las marcas disponibles
    this.marcaItem = this.api.getCollection('MARCA');
  }

  equipoSeleccionado(equipo) {
    this.idEquipoSeleccionado = equipo;
    this.equipoSeleccionada = this.api.getCollectionItem(equipo, 'EQUIPO');
  }

  marcaSeleccionado(marca) {
    this.marcaSeleccionada = marca;
    // Obtengo los equipos de la marca seleccionada
    this.equipoItem = this.api.getCollectionWhere('EQUIPO', 'marca_id', '==', marca);
  }

  addEquipo(equipoAdd) {
    const equipoAgregar = {descripcion: equipoAdd.descripcion, marca_id: this.marca};
    this.api.addItem(equipoAgregar, 'EQUIPO');
  }

  updateEquipo(descripcion: string) {
    const valoresModificar = {descripcion: descripcion};
    this.api.updateItemValues(this.idEquipoSeleccionado, valoresModificar, 'EQUIPO');
  }

  deleteEquipo() {
    this.api.deleteItem(this.idEquipoSeleccionado, 'EQUIPO');
  }

}
