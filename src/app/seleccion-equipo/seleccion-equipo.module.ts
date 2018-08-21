import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatSelectModule} from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

import { IonicModule } from '@ionic/angular';

import { SeleccionEquipoPage } from './seleccion-equipo.page';

const routes: Routes = [
  {
    path: '',
    component: SeleccionEquipoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatSelectModule,
    MatRadioModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SeleccionEquipoPage]
})
export class SeleccionEquipoPageModule {}
