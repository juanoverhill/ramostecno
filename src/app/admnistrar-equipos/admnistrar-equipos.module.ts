import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdmnistrarEquiposPage } from './admnistrar-equipos.page';

const routes: Routes = [
  {
    path: '',
    component: AdmnistrarEquiposPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdmnistrarEquiposPage]
})
export class AdmnistrarEquiposPageModule {}
