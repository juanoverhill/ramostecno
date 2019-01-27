import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FirestoreService } from '../../services/f-base.service';
import * as Cookies from 'es-cookie';


@Component({
  selector: 'app-loguear',
  templateUrl: './loguear.page.html',
  styleUrls: ['./loguear.page.scss'],
})
export class LoguearPage implements OnInit {

  logueando = false;

  constructor(private auth: AuthService, private router: Router, private fb: FirestoreService) { }

  ngOnInit() {
  }

  signInGoogle() {
    this.logueando = true;
    this.auth.signInWithGoogle().then(res => {
      this.getPerfilUsuario(res.user);
    });
  }

  signInFacebook() {
    this.logueando = true;
    this.auth.signInWithFacebook().then(res => {
      this.getPerfilUsuario(res.user);
    });
  }

  getPerfilUsuario(usuario) {
    localStorage.setItem('usuario_id', window.btoa(usuario.uid));
    localStorage.setItem('nombreUsuario', window.btoa(usuario.displayName));
    localStorage.setItem('usuarioMail', window.btoa(usuario.email));

  // Cookies.set('usuario_id', window.btoa(usuario.uid), { sameSite: 'strict' });
  // Cookies.set('nombreUsuario', window.btoa(usuario.displayName), { sameSite: 'strict' });
  //  Cookies.set('usuarioMail', window.btoa(usuario.email), { sameSite: 'strict' });

    this.fb.colWithIds$('USUARIO', ref => ref.where('usuario_id', '==', usuario.uid)).subscribe(
      data => {
        if (data.length > 0) {
          localStorage.setItem('autenticado', window.btoa('true'));
          localStorage.setItem('permiso', window.btoa('true'));
          this.ingresoOK();
        } else {
          localStorage.setItem('autenticado', window.btoa('true'));
          localStorage.setItem('permiso', window.btoa('false'));
          this.ingresoOK();
        }
      }
    );
  }

  ingresoOK() {
    this.router.navigateByUrl('historial-turnos');
  }

}
