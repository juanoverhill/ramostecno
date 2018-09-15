import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdministrarReparacionesPage } from './administrar-reparaciones.page';

const routes: Routes = [
  {
    path: '',
    component: AdministrarReparacionesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdministrarReparacionesPage]
})
export class AdministrarReparacionesPageModule {}
