import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConfirmacionTurnoPage } from './confirmacion-turno.page';

import { SharedModule } from './../shared.module';

const routes: Routes = [
  {
    path: '',
    component: ConfirmacionTurnoPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConfirmacionTurnoPage]
})
export class ConfirmacionTurnoPageModule {}
