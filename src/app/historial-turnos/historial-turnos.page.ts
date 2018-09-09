import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../services/f-base.service';
import { SendMailService } from '../../services/send-mail.service';
import { AuthService } from '../../services/auth.service';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Turno } from '../../Model/models';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-historial-turnos',
  templateUrl: './historial-turnos.page.html',
  styleUrls: ['./historial-turnos.page.scss'],
})
export class HistorialTurnosPage implements OnInit {

  autenticado = false;
  nombreUsuario;
  usuario_id;
  email;
  turnosPrevios: Observable<Turno[]>;
  perfil: any;
  permisos = false;

  opciones = ['Pendiente','Confirmado','Reparado','Retirado'];

  constructor(private route: ActivatedRoute, private fb: FirestoreService,
    private auth: AuthService, private sMail: SendMailService, private router: Router,
    private modalController: ModalController) { }

  ngOnInit() {
    // Verifico previamente si esta logueado
    this.auth.afAuth.authState.subscribe(user => {
      if (user) {
        this.autenticado = true;
        this.email = this.auth.getEmail();
        this.usuario_id = this.auth.getUserID();
        this.nombreUsuario = this.auth.getUserNombre();
        this.nombreUsuario = this.nombreUsuario.substr(0, this.nombreUsuario.indexOf(' '));
        this.getPerfilUsuario(this.usuario_id);
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

  traeTurnosPrevios() {
     this.turnosPrevios = this.fb.colWithIds$('TURNO', ref => ref.where('usuario_id', '==', this.usuario_id));
  }

  getPerfilUsuario(usuarioID) {
    this.fb.colWithIds$('USUARIO', ref => ref.where('usuario_id', '==', usuarioID)).subscribe(
      data => {
        if(data.length > 0) {
          this.permisos = true;
          console.log(this.permisos);
          this.traeTodosLosTurnos();
        } else {
          this.traeTurnosPrevios();
        }
      }
    );
  }

  traeTodosLosTurnos() {
    this.turnosPrevios = this.fb.colWithIds$('TURNO');
  }

  logOut() {
    this.auth.signOut().then(() => {
      this.autenticado = false;
      this.router.navigateByUrl('/');
    });
  }

}
