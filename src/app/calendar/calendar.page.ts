import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  date: string;
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'

  constructor() { }

  ngOnInit() {
  }

}
