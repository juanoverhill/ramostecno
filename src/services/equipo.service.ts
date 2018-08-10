import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  constructor(private httpClient: HttpClient) { }

  getEquipos(): Observable<any> {
    return this.httpClient.get('https://us-central1-calidad-csc.cloudfunctions.net/getEquipos');
  }
}
