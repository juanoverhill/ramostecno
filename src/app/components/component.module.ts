import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import {MatListModule} from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({

    declarations: [
       MenuComponent
    ],

    exports: [
        MenuComponent
    ],

    imports: [
        IonicModule, MatListModule, MatDialogModule
    ]
})

export class ComponentsModule { }
