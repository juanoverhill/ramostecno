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

  constructor(private auth: AuthService, private router: Router, private fb: FirestoreService) { }

  ngOnInit() {
  }

  signInGoogle() {
    this.auth.signInWithGoogle().then(() => {
      this.router.navigateByUrl('historial-turnos');
      localStorage.setItem('autenticado', 'true');
      this.getPerfilUsuario(this.auth.getUserID());
    });
  }

  signInFacebook() {
    this.auth.signInWithFacebook().then(() => {
      this.router.navigateByUrl('historial-turnos');
      this.getPerfilUsuario(this.auth.getUserID());
    });
  }

  getPerfilUsuario(usuarioID) {
    this.fb.colWithIds$('USUARIO', ref => ref.where('usuario_id', '==', usuarioID)).subscribe(
      data => {
        if (data.length > 0) {
          localStorage.setItem('permiso', 'true');
        } else {
          localStorage.setItem('permiso', 'false');
        }
        this.ingresoOK();
      }
    );
  }

  ingresoOK() {
    this.router.navigateByUrl('historial-turnos');
  }

}
