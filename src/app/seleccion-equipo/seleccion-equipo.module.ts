import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE } from '@angular/material';


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
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    RouterModule.forChild(routes)
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  declarations: [SeleccionEquipoPage],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ar' },
  ],
})
export class SeleccionEquipoPageModule {}
