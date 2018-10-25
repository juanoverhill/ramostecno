import { DocPipe } from './doc.pipe';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { DiaSemanaPipe } from './dia-semana.pipe';
import { MenuComponent } from './components/menu/menu.component';
import { FirestoreDatePipe } from './firestore-date.pipe';



@NgModule({
    imports: [],
    declarations: [
        DocPipe, DiaSemanaPipe, FirestoreDatePipe
    ],
    exports: [
        DocPipe, DiaSemanaPipe, FirestoreDatePipe
    ],
    entryComponents: []
})
export class SharedModule {}
