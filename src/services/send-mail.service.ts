import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  endpoint = 'https://us-central1-calidad-csc.cloudfunctions.net/httpEmail';
  constructor(private http: HttpClient) { }

  sendEmail(name: string) {
    const data = {
      toEmail: 'juan.arias@csantacatalina.com.ar',
      toName: name
    };
    this.http.post(this.endpoint, data).subscribe();
  }
}
