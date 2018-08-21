import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SeleccionMarcaPage } from './seleccion-marca.page';

const routes: Routes = [
  {
    path: '',
    component: SeleccionMarcaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SeleccionMarcaPage]
})
export class SeleccionMarcaPageModule {}
