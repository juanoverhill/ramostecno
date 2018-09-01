import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

class credenciales {
  email?: string;
  password?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login(e,p) {
    const email = e;
    const pass = p;
    const cred = new credenciales();
    cred.email = email;
    cred.password = pass;
    console.log(cred.email);
    this.auth.signInWithEmail(cred);
  }

}
