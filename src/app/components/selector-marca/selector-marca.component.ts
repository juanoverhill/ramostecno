import { NuevoTurnoComponent } from './../nuevo-turno/nuevo-turno.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FirestoreService } from '../../../services/f-base.service';
import { CategoriaReparacion, Reparacion } from '../../../Model/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-selector-marca',
  templateUrl: './selector-marca.component.html',
  styleUrls: ['./selector-marca.component.scss']
})
export class SelectorMarcaComponent implements OnInit {

  categorias: Observable<CategoriaReparacion[]>;
  subCategorias: Observable<Reparacion[]>;
  showSubCategorias = false;

  constructor(public dialogRef: MatDialogRef<NuevoTurnoComponent>, private fb: FirestoreService,
    @Inject(MAT_DIALOG_DATA) public data: Reparacion) { }

  ngOnInit() {
    this.categorias = this.fb.colWithIds$('CATEGORIA_REPARACION');
  }

  mostrarReparaciones(categoriaID) {
    this.showSubCategorias = true;
    this.subCategorias = this.fb.colWithIds$('REPARACION', ref => ref.where('categoria_id', '==', categoriaID));
  }

}
