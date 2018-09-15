import { DocPipe } from './doc.pipe';
import { NgModule } from '@angular/core';
import { DiaSemanaPipe } from './dia-semana.pipe';

@NgModule({
    imports: [
    ],
    declarations: [
        DocPipe, DiaSemanaPipe
    ],
    exports: [
        DocPipe, DiaSemanaPipe
    ]
})
export class SharedModule {}
