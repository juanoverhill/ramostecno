import { PopUpComponent } from './../components/pop-up/pop-up.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from './../shared.module';
import { AngularFireStorageModule } from '@angular/fire/storage';

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
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatTooltipModule,
    SharedModule,
    AngularFireStorageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdmnistrarEquiposPage, PopUpComponent],
  entryComponents: [PopUpComponent]
})
export class AdmnistrarEquiposPageModule {}
