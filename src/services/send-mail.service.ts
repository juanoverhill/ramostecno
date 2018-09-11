import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  endpoint = 'https://us-central1-calidad-csc.cloudfunctions.net/httpEmail';
  constructor(private http: HttpClient) { }

  sendEmail(mail: string, name: string, dia: string, fecha: string, template) {
    const data = {
      toEmail: mail,
      toName: name,
      dia: dia,
      fecha: fecha,
      templateID: template,
    };
    this.http.post(this.endpoint, data).subscribe();
  }
}
