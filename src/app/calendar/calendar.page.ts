import { FirestoreService } from './../../services/f-base.service';
import { Component, OnInit } from '@angular/core';
import { CalendarComponentOptions, DayConfig } from 'ion4-calendar';
import { map} from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  daysConfig: DayConfig[] = [];
  nDias: any;
  diasAnulados: any;
  promiseResult: any;

  date: string;
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  options: CalendarComponentOptions = {
    weekdays: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    pickMode: 'single',
    daysConfig: this.daysConfig
  };

  constructor(private fBase: FirestoreService, private route: ActivatedRoute) {

   }

  ngOnInit() {
    console.log(this.route.data);
  }

   async getDiasAnulados() {
    const data = await this.fBase.doc$('PARAMETRO_ANULACION/I0kSGOSbYP4QWOlXPT51').toPromise().then(d => {
      this.promiseResult = d;
    });
     console.log(this.promiseResult);
  }

  testPromise() {
    try {
      let dias = 0;
      this.fBase.doc$('PARAMETRO_ANULACION/I0kSGOSbYP4QWOlXPT51').subscribe(d => {
        dias = d.dias_anulados;
      });
    } catch (error) {console.log(error); }
  }

   anular_n_dias(n) {
    // const n = await this.getDiasAnulados();
    for (let i = 0; i <= n; i++) {
      this.daysConfig.push({
        date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getUTCDate() + i),
        subTitle: '--',
        disable: true
      });
    }
  }

}
