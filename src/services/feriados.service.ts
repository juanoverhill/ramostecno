import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class FeriadosService {

  constructor(private httpClient: HttpClient) { }

  getFeriados(anio): Observable<any> {
    return this.httpClient.get('https://nolaborables.com.ar/api/v2/feriados/' + anio);
  }
}
