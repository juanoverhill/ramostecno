import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatSelectModule} from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalSeleccionReparacionComponent } from './../modal-seleccion-reparacion/modal-seleccion-reparacion.component';

import { IonicModule } from '@ionic/angular';

import { SeleccionEquipoPage } from './seleccion-equipo.page';

import { DocPipe } from '../doc.pipe';

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
    RouterModule.forChild(routes)
  ],
  declarations: [SeleccionEquipoPage, ModalSeleccionReparacionComponent, DocPipe],
  entryComponents: [ModalSeleccionReparacionComponent]
})
export class SeleccionEquipoPageModule {}
