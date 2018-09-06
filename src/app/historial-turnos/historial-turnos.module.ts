import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';

import { IonicModule } from '@ionic/angular';

import { HistorialTurnosPage } from './historial-turnos.page';


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
    RouterModule.forChild(routes)
  ],
  declarations: [HistorialTurnosPage]

})
export class HistorialTurnosPageModule {}
