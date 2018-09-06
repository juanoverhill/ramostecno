import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../services/f-base.service';
import { SendMailService } from '../../services/send-mail.service';
import { AuthService } from '../../services/auth.service';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Turno } from '../../Model/models';

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
        this.traeTurnosPrevios();
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

  logOut() {
    this.auth.signOut().then(() => {
      this.autenticado = false;
      this.router.navigateByUrl('/');
    });
  }

}
