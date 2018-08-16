import { FirestoreService } from './../../services/f-base.service';
import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Injectable()
export class CalendarResolver implements Resolve<any> {
    constructor(private fb: FirestoreService) { }

    resolve() {
       this.fb.doc$('PARAMETRO_ANULACION/I0kSGOSbYP4QWOlXPT51');
    }
}
