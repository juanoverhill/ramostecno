import { FirestoreService } from './../../services/f-base.service';
import { Component, OnInit } from '@angular/core';
import { CalendarComponentOptions, DayConfig } from 'ion4-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  daysConfig: DayConfig[] = [];
  nDias: any;

  date: string;
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  options: CalendarComponentOptions = {
    weekdays: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    pickMode: 'single',
    daysConfig: this.daysConfig
  };

  constructor(private fBase: FirestoreService) {
   }

  ngOnInit() {
    this.getDiasAnulados();
    this.anular_n_dias(this.nDias);
  }

  getDiasAnulados() {
    
  }

  anular_n_dias(n) {
    for (let i = 0; i <= n; i++) {
      this.daysConfig.push({
        date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getUTCDate() + i),
        subTitle: '--',
        disable: true
      });
    }
  }

}
