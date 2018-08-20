import { FirestoreService } from './../../services/f-base.service';
import { Component, OnInit } from '@angular/core';
import { CalendarComponentOptions, DayConfig } from 'ion4-calendar';
import { map} from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

interface diasAnuladosIternface {
    dias_anulados: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

 

  daysConfig: DayConfig[] = [];
  diasAnulados: any;
  cargoOK = false;

  date: string;
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  options: CalendarComponentOptions = {
    weekdays: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthPickerFormat: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
    pickMode: 'single',
    daysConfig: this.daysConfig
  };

  constructor(private fBase: FirestoreService, private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.getNDiasAnulados();
  }

   getNDiasAnulados() {
    this.fBase.doc$('PARAMETRO_ANULACION/I0kSGOSbYP4QWOlXPT51').subscribe(d => {
      const data = d as diasAnuladosIternface;
      this.cargoOK = true;
      this.anularFechas(data.dias_anulados);
    });
  }

   anular_n_dias(n) {
    for (let i = 0; i <= n; i++) {
      this.daysConfig.push({
        date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getUTCDate() + i),
        subTitle: '',
        disable: true
      });
    }
  }

  anularFechas(n) {
    const fechaDesde = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getUTCDate() + n);
    const actualYear = new Date().getFullYear();
    const dateInicial = new Date('2018-01-01');
    // tslint:disable-next-line:max-line-length
    for (let fechaActual = dateInicial; fechaActual.getFullYear() <= (actualYear + 2); fechaActual = new Date(fechaActual.getTime() + (1000 * 60 * 60 * 24))) {
      if (fechaActual.getDay() === 6 || fechaActual.getDay() === 0) {
        this.daysConfig.push({
          date: fechaActual,
          subTitle: '',
          disable: true
        });
      } else if (fechaActual > fechaDesde) {
        this.daysConfig.push({
          date: fechaActual,
          subTitle: 'disp.',
          disable: false
        });
      }
    }
  }
}
