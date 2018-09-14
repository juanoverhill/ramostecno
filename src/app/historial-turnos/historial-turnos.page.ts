import { Reparacion } from './../../Model/models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../services/f-base.service';
import { SendMailService } from '../../services/send-mail.service';
import { AuthService } from '../../services/auth.service';
import { ModalController, PopoverController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Turno } from '../../Model/models';
import {FormControl} from '@angular/forms';
import { TicketComponent } from '../components/ticket/ticket.component';


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
  estado_reparacion: string;
  fechaSeleccionada: string;
  reparacion: Reparacion;
  filtroFecha = false;

  opciones = ['Pendiente', 'Confirmado', 'Recepcionado' , 'Reparado', 'Retirado', 'Cancelado'];

  date = new FormControl(new Date());

  constructor(private route: ActivatedRoute, private fb: FirestoreService,
    private auth: AuthService, private sMail: SendMailService, private router: Router,
    private modalController: ModalController, public alertController: AlertController) { }

  ngOnInit() {
    this.fechaSeleccionada = new Date().toISOString().slice(0, 10);
    this.estado_reparacion = 'Confirmado';
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
        if (data.length > 0) {
          this.permisos = true;
          this.traeTodosLosTurnos();
        } else {
          this.traeTurnosPrevios();
        }
      }
    );
  }

  actualizaFechaTurnos(fecha) {
    this.fechaSeleccionada = fecha.value.toISOString().slice(0, 10);
    this.turnosPrevios = this.fb.colWithIds$('TURNO', ref => ref.where('estado_reparacion_id', '==', this.estado_reparacion)
      .where('fecha_reparacion', '==', this.fechaSeleccionada));
  }

  actualizaEstadoTurnos(estado) {
    this.estado_reparacion = estado.value;
    this.traeTodosLosTurnos();
  }

  traeTodosLosTurnos() {
    this.turnosPrevios = this.fb.colWithIds$('TURNO', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query.where('estado_reparacion_id', '==', this.estado_reparacion);
      query = query.orderBy('fecha_reparacion', 'desc');
      query = query.orderBy('hora_reparacion', 'desc');
      return query;
    });
  }

  logOut() {
    this.auth.signOut().then(() => {
      this.autenticado = false;
      this.router.navigateByUrl('/');
    });
  }

  async cancelaTurno(turno) {
    const alert = await this.alertController.create({
      header: 'Cancelar Turno',
      subHeader: 'Seguro desea cancelarlo?',
      message: 'Una vez cancelado no hay vuelta atras!',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => { }
        }, {
          text: 'SI',
          handler: () => {
            this.cancelacionTurno(turno);
          }
        }
      ]
    });
    await alert.present();
  }

  cambiaEstado(estadoNuevo, item, fecha, hora) {
    this.fb.update('TURNO/' + item, {'estado_reparacion_id': estadoNuevo});
    this.nombreUsuario = this.nombreUsuario.substr(0, this.nombreUsuario.indexOf(' '));
    const year = fecha.slice(0, 4);
    const month = fecha.slice(5, 7);
    const day = fecha.slice(8, 10);
    const fechaMail = day.toString() + '/' + month.toString() + '/' + year.toString();
    if (estadoNuevo === 'Confirmado') {
      this.sMail.sendEmail(this.email, this.nombreUsuario, hora, fechaMail, 'd-6b08188256ff4655b1f1950b70d32f7f');
    } else if (estadoNuevo === 'Recepcionado') {
      this.sMail.sendEmail(this.email, this.nombreUsuario, hora, fechaMail, 'd-0443bc9b990b41c3bcda8bb8ec888fe3');
    } else if (estadoNuevo === 'Reparado') {
      this.sMail.sendEmail(this.email, this.nombreUsuario, hora, fechaMail, 'd-fdcd262f65df459eb2c976b335a1e033');
    }
  }

  reprogramaTurno(nuevaFecha, item) {
    const fechaNew = nuevaFecha.value.toISOString().slice(0, 10);
    this.fb.update('TURNO/' + item, {'fecha_reparacion': fechaNew});
  }

  cancelacionTurno(turno) {
    this.fb.update('TURNO/' + turno, {'estado_reparacion_id': 'Cancelado'});
  }
  setFiltro(filtro) {
    this.filtroFecha = !filtro;
    if (!filtro === false) {this.traeTodosLosTurnos(); } else {
      this.turnosPrevios = this.fb.colWithIds$('TURNO', ref => ref.where('estado_reparacion_id', '==', this.estado_reparacion)
        .where('fecha_reparacion', '==', this.fechaSeleccionada));
     }
  }

  async verTicket(idTurno) {
    const modal = await this.modalController.create({
      component: TicketComponent,
      componentProps: { idTurno: idTurno}
    });
    return await modal.present();
  }

}
