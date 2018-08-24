
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CalendarPage } from './calendar.page';

import { CalendarModule } from 'ion4-calendar';
import { ModalHorariosComponent } from '../components/modal-horarios/modal-horarios.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CalendarPage, ModalHorariosComponent],
  entryComponents: [ModalHorariosComponent]
})
export class CalendarPageModule {}
