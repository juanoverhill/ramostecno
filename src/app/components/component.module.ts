import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';



@NgModule({

    declarations: [
       MenuComponent
    ],

    exports: [
        MenuComponent
    ],

    imports: [
        IonicModule
    ]
})

export class ComponentsModule { }
