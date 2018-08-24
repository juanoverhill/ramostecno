import { SharedModule } from './../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatSelectModule} from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { SeleccionEquipoPage } from './seleccion-equipo.page';
import { ModalSeleccionReparacionComponent } from '../components/modal-seleccion-reparacion/modal-seleccion-reparacion.component';



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
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SeleccionEquipoPage, ModalSeleccionReparacionComponent],
  entryComponents: [ModalSeleccionReparacionComponent]
})
export class SeleccionEquipoPageModule {}
