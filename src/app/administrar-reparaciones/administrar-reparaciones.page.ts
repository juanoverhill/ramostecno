import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/f-base.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-administrar-reparaciones',
  templateUrl: './administrar-reparaciones.page.html',
  styleUrls: ['./administrar-reparaciones.page.scss'],
})
export class AdministrarReparacionesPage implements OnInit {

  autenticado = false;
  permisos = false;
  categorias: Observable<any[]>;
  reparaciones: Observable<any[]>;
  tieneReparaciones = false;

  constructor(private fb: FirestoreService, private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    // Verifico previamente si esta logueado
    this.auth.afAuth.authState.subscribe(user => {
      if (user) {
        this.autenticado = true;
        this.getPerfilUsuario(this.auth.getUserID());
      } else {
        this.login();
      }
    }, () => {
      this.login();
    }
    );
  }

  login() {
    this.router.navigateByUrl('loguear');
  }

  getPerfilUsuario(usuarioID) {
    this.fb.colWithIds$('USUARIO', ref => ref.where('usuario_id', '==', usuarioID)).subscribe(
      data => {
        if (data.length > 0) {
          this.permisos = true;
          this.getCategorias();
        } else {
          
        }
      }
    );
  }

  getCategorias() {
    this.categorias = this.fb.colWithIds$('CATEGORIA_REPARACION');
  }

  getSubCategorias(categoria) {
    this.reparaciones = this.fb.colWithIds$('REPARACION', ref => ref.where('categoria_id', '==', categoria.value));
    this.reparaciones.subscribe(d => {
      this.tieneReparaciones = true;
    });
  }

}
