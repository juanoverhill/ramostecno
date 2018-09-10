import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  endpoint = 'https://us-central1-calidad-csc.cloudfunctions.net/httpEmail';
  constructor(private http: HttpClient) { }

  sendEmail(mail: string, name: string, dia: string, fecha: string) {
    const data = {
      toEmail: mail,
      toName: name,
      dia: dia,
      fecha: fecha,
      templateID: 'd-47b68a6dc0a1409eba235610e806d017',
    };
    this.http.post(this.endpoint, data).subscribe();
  }
}
