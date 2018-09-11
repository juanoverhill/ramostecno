import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';

import { IonicModule } from '@ionic/angular';

import { HistorialTurnosPage } from './historial-turnos.page';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';



const routes: Routes = [
  {
    path: '',
    component: HistorialTurnosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HistorialTurnosPage]

})
export class HistorialTurnosPageModule {}