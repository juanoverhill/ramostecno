import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConfirmacionTurnoPage } from './confirmacion-turno.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmacionTurnoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConfirmacionTurnoPage]
})
export class ConfirmacionTurnoPageModule {}
