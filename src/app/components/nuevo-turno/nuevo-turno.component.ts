import { Component, OnInit, Inject } from '@angular/core';
import { FirestoreService } from '../../../services/f-base.service';
import {Turno, Equipo, Marca, CategoriaReparacion, Reparacion} from '../../../Model/models';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelectorMarcaComponent } from '../selector-marca/selector-marca.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-nuevo-turno',
  templateUrl: './nuevo-turno.component.html',
  styleUrls: ['./nuevo-turno.component.scss']
})
export class NuevoTurnoComponent implements OnInit {

  marcaSinEspecificar: string;
  _equipoReference: firebase.firestore.DocumentReference;
  categoriasReparacion: Observable<CategoriaReparacion[]>;
  reparacionesDisponibles: Observable<Reparacion[]>;
  reparacionSeleccionada: Reparacion;
  textoBoton = 'Seleccione una reparacion';


  constructor(private fb: FirestoreService, public dialog: MatDialog, private modalCtrl: ModalController) { }

  public async close() {
    const modal = await this.modalCtrl.getTop();
    modal.dismiss();
  }

  ngOnInit() {
    this.fb.colWithIds$('MARCA', ref => ref.where('descripcion', '==', 'Equipos sin definir')).subscribe((data: Marca[]) => {
      data.forEach(itemMarca => {
          this.marcaSinEspecificar = itemMarca.id;
      });
    });

    this.categoriasReparacion = this.fb.colWithIds$('CATEGORIA_REPARACION');
  }

  generaTurno() {

    let _ultimoIDEquipo = '';

    const _nombreEquipo = document.getElementById('equipo') as HTMLInputElement;
    const _color = document.getElementById('color') as HTMLInputElement;
    const _email = document.getElementById('email') as HTMLInputElement;
    const _nombreCliente = document.getElementById('nombreCliente') as HTMLInputElement;
    const _telefonoCliente = document.getElementById('telefonoCliente') as HTMLInputElement;
    const _precioEF = document.getElementById('precioEF') as HTMLInputElement;
    const _precioMP = document.getElementById('precioMP') as HTMLInputElement;

    const _newEquipo = new Equipo();
    _newEquipo.descripcion = _nombreEquipo.value;
    _newEquipo.orden = 0;
    _newEquipo.imagen = '';
    _newEquipo.estado = 'ACTIVO';
    _newEquipo.marca_id = this.marcaSinEspecificar;
    _newEquipo.marcaRef = this.fb.doc('MARCA/' + this.marcaSinEspecificar).ref;

    this.fb.add('EQUIPO', _newEquipo).then(docRef => {
      this._equipoReference = docRef;
       _ultimoIDEquipo = docRef.id;

       const _newTurno = new Turno();
    _newTurno.color = _color.value;
    _newTurno.color_id = '';
    _newTurno.email = _email.value;
    _newTurno.nombre_usuario = _nombreCliente.value;
    _newTurno.telefono = _telefonoCliente.value;
    _newTurno.valor = _precioMP.value;
    _newTurno.valor_efectivo = _precioEF.value;
    _newTurno.equipoRef = this._equipoReference;
    _newTurno.equipo_id = _ultimoIDEquipo;
    _newTurno.hora_reparacion = 0;
    _newTurno.usuario_id = '';
    _newTurno.reparacion_id = this.reparacionSeleccionada.id;
    _newTurno.reparacionRef = this.fb.doc('REPARACION/' + this.reparacionSeleccionada.id).ref;
    _newTurno.estado_reparacion_id = 'Recepcionado';
    _newTurno.fecha_reparacion = new Date().toISOString().slice(0, 10);

    this.fb.add('TURNO', _newTurno);
    this.close();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SelectorMarcaComponent, {
      width: '500px',
      data: { reparacionID: this.reparacionSeleccionada}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reparacionSeleccionada = result;
      this.textoBoton = this.reparacionSeleccionada.descripcion + ' (' + this.reparacionSeleccionada.accion + ')';
    });
  }
}
