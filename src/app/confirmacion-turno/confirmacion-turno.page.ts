import { PrecioReparacion, Turno } from './../../Model/models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../services/f-base.service';
import { ModalController } from '@ionic/angular';
import { LoginComponent } from '../components/login/login.component';
import { AuthService } from '../../services/auth.service';
import { SendMailService } from '../../services/send-mail.service';

@Component({
  selector: 'app-confirmacion-turno',
  templateUrl: './confirmacion-turno.page.html',
  styleUrls: ['./confirmacion-turno.page.scss'],
})
export class ConfirmacionTurnoPage implements OnInit {

  constructor(private route: ActivatedRoute, private fb: FirestoreService,
    private modalController: ModalController, private auth: AuthService, private sMail: SendMailService) { }

  reparacionID: string;
  colorID: string;
  fecha: any;
  hora: any;
  reparacion: any;
  equipo_id: any;
  equipoRef: any;
  usuario_id: any;
  nombreUsuario: any;
  valorEfectivo: any;
  valor: any;

  ngOnInit() {
    this.reparacionID = this.route.snapshot.paramMap.get('idReparacion');
    this.reparacion = this.fb.doc$('PRECIO_REPARACION/' + this.reparacionID);
    this.colorID = this.route.snapshot.paramMap.get('idColor');
    this.fecha = this.route.snapshot.paramMap.get('fecha');
    this.fecha = new Date(this.fecha);
    this.hora = this.route.snapshot.paramMap.get('hora');

    // Obtengo los datos de reparacion
    this.fb.doc$('PRECIO_REPARACION/' + this.reparacionID).subscribe(data => {
      const datos = data as PrecioReparacion;
      this.equipo_id = datos.equipo_id;
      this.equipoRef = datos.equipoRef;
      this.valor = datos.valor;
      this.valorEfectivo = datos.valor_efectivo;
    });
  }

  async login(tipo) {
    const modal = await this.modalController.create({
      component: LoginComponent,
      componentProps: { tipo: tipo }
    });
    return await modal.present();
  }

  signInGoogle() {
    this.auth.signInWithGoogle();
    const email = this.auth.getEmail();
    const nombre = this.auth.getUserNombre();
    const fecha = this.fecha.toISOString().slice(0, 10);
    this.sMail.sendEmail(email, nombre, this.hora, fecha);
    this.usuario_id = this.auth.getUserID();
    this.nombreUsuario = this.auth.getUserNombre();
    this.grabaTurno();
  }

  signInFacebook() {
    this.auth.signInWithFacebook();
    const email = this.auth.getEmail();
    const nombre = this.auth.getUserNombre();
    const fecha = this.fecha.toISOString().slice(0, 10);
    this.sMail.sendEmail(email, nombre, this.hora, fecha);
    this.usuario_id = this.auth.getUserID();
    this.nombreUsuario = this.auth.getUserNombre();
    this.grabaTurno();
  }

  grabaTurno() {
    const turnoNuevo = new Turno();
    turnoNuevo.usuario_id = this.usuario_id;
    turnoNuevo.nombre_usuario = this.nombreUsuario;
    turnoNuevo.equipo_id = this.equipo_id;
    turnoNuevo.equipoRef = this.equipoRef;
    turnoNuevo.fecha_reparacion = this.fecha.toISOString().slice(0, 10);
    turnoNuevo.hora_reparacion = this.hora;
    turnoNuevo.color = this.colorID;
    turnoNuevo.estado_reparacion_id = 'Pendiente';
    turnoNuevo.reparacion_id = this.reparacionID;
    turnoNuevo.valor = this.valor;
    turnoNuevo.valor_efectivo = this.valorEfectivo;
    turnoNuevo.observacion = '';
    this.fb.add('TURNO', turnoNuevo);
  }

}
