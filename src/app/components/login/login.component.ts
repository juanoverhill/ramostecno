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
    this.auth.signInWithEmail(cred).then(res => {
      console.log(res.user);
    })
    .catch(err => {
      if(err.code === 'auth/invalid-email'){
        this.auth.signUp(cred).then(res => {
            console.log(res.user);
        })
        .catch(err => {
          if(err.code === 'auth/invalid-email') {
            console.log('mail invalido');
          }
        });
      }
      if(err.code === 'auth/wrong-password') {
        console.log('clave incorrecta');
      }
    });
  }

}
