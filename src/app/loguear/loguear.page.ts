import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loguear',
  templateUrl: './loguear.page.html',
  styleUrls: ['./loguear.page.scss'],
})
export class LoguearPage implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  signInGoogle() {
    this.auth.signInWithGoogle().then(() => {
      this.router.navigateByUrl('historial-turnos');
    });
  }

  signInFacebook() {
    this.auth.signInWithFacebook().then(() => {
      this.router.navigateByUrl('historial-turnos');
    });
  }

}
