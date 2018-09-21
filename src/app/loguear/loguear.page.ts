import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FirestoreService } from '../../services/f-base.service';

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
      console.log(res);
      this.getPerfilUsuario(res.user.uid);
    });
  }

  signInFacebook() {
    this.logueando = true;
    this.auth.signInWithFacebook().then(res => {
      this.getPerfilUsuario(res.user.uid);
    });
  }

  getPerfilUsuario(usuarioID) {
    console.log(usuarioID);
    this.fb.colWithIds$('USUARIO', ref => ref.where('usuario_id', '==', usuarioID)).subscribe(
      data => {
        console.log(data);
        if (data.length > 0) {
          localStorage.setItem('autenticado', 'true');
          localStorage.setItem('permiso', 'true');
          console.log(localStorage.getItem('permiso'));
          this.ingresoOK();
        } else {
          localStorage.setItem('permiso', 'false');
          // console.log(localStorage.getItem('permiso'));
          localStorage.setItem('autenticado', 'true');
          this.ingresoOK();
        }
      }
    );
  }

  ingresoOK() {
    this.router.navigateByUrl('historial-turnos');
  }

}
