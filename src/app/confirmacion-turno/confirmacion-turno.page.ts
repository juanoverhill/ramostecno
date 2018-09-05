import { PrecioReparacion, Turno, Color } from './../../Model/models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../services/f-base.service';
import { ModalController, ToastController } from '@ionic/angular';
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
    private modalController: ModalController, private auth: AuthService, private sMail: SendMailService,
    public toastController: ToastController, private router: Router) { }

  reparacionID: string;
  colorID: string;
  color: any;
  fecha: any;
  hora: any;
  reparacion: Observable<PrecioReparacion>;
  equipo_id: any;
  usuario_id: any;
  nombreUsuario: any;
  valorEfectivo: any;
  valor: any;
  equipoReference: any;
  email: any;
  cargoOK = false;

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
      this.valor = datos.valor;
      this.equipoReference = datos.equipoRef;
      this.valorEfectivo = datos.valor_efectivo;
      this.cargoOK = true;
    });

    // Obtengo el color especifico
    this.fb.doc$('COLOR/' + this.colorID).subscribe(data => {
          const datos = data as Color;
          this.color = datos.color;
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
    this.auth.signOut();
    this.auth.signInWithGoogle();
    this.email = this.auth.getEmail();
    this.fecha = this.fecha.toISOString().slice(0, 10);
    this.usuario_id = this.auth.getUserID();
    this.nombreUsuario = this.auth.getUserNombre();
    this.grabaTurno();
  }

  signInFacebook() {
    this.auth.signOut();
    this.auth.signInWithFacebook();
    this.email = this.auth.getEmail();
    this.fecha = this.fecha.toISOString().slice(0, 10);
    this.usuario_id = this.auth.getUserID();
    this.nombreUsuario = this.auth.getUserNombre();
    this.grabaTurno();
  }

  grabaTurno() {
    if (this.tieneTurnosPreviosPendientes(this.usuario_id, this.equipo_id)) {
      this.presentToast('Ya existe un turno pendiente para este equipo!');
    } else {
      const turnoNuevo = new Turno();
      turnoNuevo.usuario_id = this.usuario_id;
      turnoNuevo.nombre_usuario = this.nombreUsuario;
      turnoNuevo.equipo_id = this.equipo_id;
      turnoNuevo.equipoRef = this.equipoReference;
      turnoNuevo.fecha_reparacion = this.fecha.toISOString().slice(0, 10);
      turnoNuevo.hora_reparacion = this.hora;
      turnoNuevo.color = this.color;
      turnoNuevo.estado_reparacion_id = 'Pendiente';
      turnoNuevo.reparacion_id = this.reparacionID;
      turnoNuevo.valor = this.valor;
      turnoNuevo.valor_efectivo = this.valorEfectivo;
      turnoNuevo.observacion = '';
      this.fb.add('TURNO', turnoNuevo);
      this.sMail.sendEmail(this.email, this.nombreUsuario, this.hora, this.fecha);
      this.router.navigateByUrl('turno-confirmado');
    }
  }

    tieneTurnosPreviosPendientes(usuario, equipo): boolean {
    let turnosPendientes: any[];
    this.fb.colWithIds$('TURNO', ref => ref.where('usuario_id', '==', usuario).
    where('equipo_id', '==', equipo).where('estado_reparacion_id', '==', 'Pendiente')).subscribe(data => {
      turnosPendientes = data;
      console.log(turnosPendientes);
    });
    if (turnosPendientes.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
