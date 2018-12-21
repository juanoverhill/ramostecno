import { NuevoTurnoComponent } from './../nuevo-turno/nuevo-turno.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-selector-marca',
  templateUrl: './selector-marca.component.html',
  styleUrls: ['./selector-marca.component.scss']
})
export class SelectorMarcaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NuevoTurnoComponent>) { }

  ngOnInit() {
  }

}
