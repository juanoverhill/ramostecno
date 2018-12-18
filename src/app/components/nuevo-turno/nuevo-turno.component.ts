import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/f-base.service';
import { Turno, Equipo } from '../../../Model/models';

@Component({
  selector: 'app-nuevo-turno',
  templateUrl: './nuevo-turno.component.html',
  styleUrls: ['./nuevo-turno.component.scss']
})
export class NuevoTurnoComponent implements OnInit {

  constructor(private fb: FirestoreService) { }

  ngOnInit() {
  }

  generaTurno() {



    // const _newEquipo = new Equipo();
    // _newEquipo.descripcion = document.getElementById('equipo')

    // const _newTurno = new Turno();

  }

}
