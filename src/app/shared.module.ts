import { DocPipe } from './doc.pipe';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { DiaSemanaPipe } from './dia-semana.pipe';
import { MenuComponent } from './components/menu/menu.component';



@NgModule({
    imports: [],
    declarations: [
        DocPipe, DiaSemanaPipe
    ],
    exports: [
        DocPipe, DiaSemanaPipe
    ],
    entryComponents: []
})
export class SharedModule {}
