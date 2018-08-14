import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE } from '@angular/material';


import { IonicModule } from '@ionic/angular';

import { StartUpPage } from './start-up.page';
import { DocPipe } from '../doc.pipe';

const routes: Routes = [
  {
    path: '',
    component: StartUpPage
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
  declarations: [StartUpPage, DocPipe]
})
export class StartUpPageModule {}
