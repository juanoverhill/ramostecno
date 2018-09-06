import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-turno-confirmado',
  templateUrl: './turno-confirmado.page.html',
  styleUrls: ['./turno-confirmado.page.scss'],
})
export class TurnoConfirmadoPage implements OnInit {

  constructor() {
  }

  ionViewCanLeave() {
   return false;
  }

  ngOnInit() {
  }

}
