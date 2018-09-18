import { PrecioReparacion, Turno, Color } from './../../Model/models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../services/f-base.service';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { SendMailService } from '../../services/send-mail.service';

// const admin = require('firebase-admin');

@Component({
  selector: 'app-confirmacion-turno',
  templateUrl: './confirmacion-turno.page.html',
  styleUrls: ['./confirmacion-turno.page.scss'],
})
export class ConfirmacionTurnoPage implements OnInit {

  constructor(private route: ActivatedRoute, private fb: FirestoreService,
    private modalController: ModalController, private auth: AuthService, private sMail: SendMailService,
    public toastController: ToastController, private router: Router, public alertController: AlertController) { }

  // db = admin.firestore();
  reparacionID: string;
  colorID: string;
  color: any;
  fecha: any;
  hora: any;
  reparacion: Observable<PrecioReparacion>;
  equipo_id: any;
  usuario_id: any;
  nombreUsuario: any;
  nombreCompleto: any;
  valorEfectivo: any;
  valor: any;
  reparacionReference: any;
  equipoReference: any;
  email: any;
  cargoOK = false;
  autenticado = false;
  fechaShow: Date;
  year: number;
  month: number;
  day: number;
  terminosAceptados = false;
  telefono: any;

  ngOnInit() {
     // Verifico previamente si esta logueado
     this.auth.afAuth.authState.subscribe(user => {
       if (user) {
         this.autenticado = true;
         this.email = this.auth.getEmail();
         this.usuario_id = this.auth.getUserID();
         this.nombreUsuario = this.auth.getUserNombre();
         this.nombreCompleto = this.auth.getUserNombre();
         this.nombreUsuario = this.nombreUsuario.substr(0, this.nombreUsuario.indexOf(' '));
         this.telefono = this.auth.getTelefono();
       }
     });

    this.reparacionID = this.route.snapshot.paramMap.get('idReparacion');
    this.reparacion = this.fb.doc$('PRECIO_REPARACION/' + this.reparacionID);
    this.colorID = this.route.snapshot.paramMap.get('idColor');
    this.fecha = this.route.snapshot.paramMap.get('fecha');
    this.year = this.fecha.slice(0, 4);
    this.month =  this.fecha.slice(5, 7);
    this.day = this.fecha.slice(8, 10);
    this.fechaShow = new Date(this.year, this.month - 1, this.day);
    this.fecha = this.fechaShow.toISOString().slice(0, 10);
    this.hora = this.route.snapshot.paramMap.get('hora');

    // Obtengo los datos de reparacion
    this.fb.doc$('PRECIO_REPARACION/' + this.reparacionID).subscribe(data => {
      const datos = data as PrecioReparacion;
      this.equipo_id = datos.equipo_id;
      this.valor = datos.valor;
      this.equipoReference = datos.equipoRef;
      this.valorEfectivo = datos.valor_efectivo;
      this.reparacionReference = datos.reparacionRef;
      // Obtengo el color especifico
      this.fb.doc$('COLOR/' + this.colorID).subscribe(d => {
      const dat = d as Color;
      this.color = dat.color;
      this.cargoOK = true;
      });
    });
}

  signInGoogle() {
        this.auth.signInWithGoogle().then(() => {
        this.email = this.auth.getEmail();
        this.usuario_id = this.auth.getUserID();
        this.nombreUsuario = this.auth.getUserNombre();
        this.nombreUsuario = this.nombreUsuario.substr(0, this.nombreUsuario.indexOf(' '));
        this.autenticado = true;
        this.nombreCompleto = this.auth.getUserNombre();
        this.telefono = this.auth.getTelefono();
        });
    }

  signInFacebook() {
      this.auth.signInWithFacebook().then(() => {
      this.autenticado = true;
      this.email = this.auth.getEmail();
      this.usuario_id = this.auth.getUserID();
      this.nombreUsuario = this.auth.getUserNombre();
      this.nombreCompleto = this.auth.getUserNombre();
      this.nombreUsuario = this.nombreUsuario.substr(0, this.nombreUsuario.indexOf(' '));
      this.telefono = this.auth.getTelefono();
      });
   }

  grabaTurno() {
      // console.log(this.fecha);
      const turnoNuevo = new Turno();
      turnoNuevo.usuario_id = this.usuario_id;
      turnoNuevo.nombre_usuario = this.nombreCompleto;
      turnoNuevo.equipo_id = this.equipo_id;
      turnoNuevo.equipoRef = this.equipoReference;
      turnoNuevo.fecha_reparacion = this.fecha;
      turnoNuevo.hora_reparacion = Number(this.hora);
      turnoNuevo.color = this.color;
      turnoNuevo.estado_reparacion_id = 'Confirmado';
      turnoNuevo.reparacion_id = this.reparacionID;
      turnoNuevo.valor = this.valor;
      turnoNuevo.valor_efectivo = this.valorEfectivo;
      turnoNuevo.observacion = '';
      turnoNuevo.email = this.email;
      if (this.telefono === null) {this.telefono = 'Sin numero'; }
      turnoNuevo.telefono = this.telefono;
      turnoNuevo.reparacionRef = this.reparacionReference;
      this.fb.add('TURNO', turnoNuevo);
      const fechaMail = this.day.toString() + '/' + this.month.toString() + '/' + this.year.toString();
      this.sMail.sendEmail(this.email, this.nombreUsuario, this.hora, fechaMail, 'd-47b68a6dc0a1409eba235610e806d017');
      this.router.navigateByUrl('turno-confirmado');
  }

    grabar() {
    let turnosPendientes: any[];
    this.fb.colWithIds$('TURNO', ref => ref.where('usuario_id', '==', this.usuario_id).
    where('equipo_id', '==', this.equipo_id).where('estado_reparacion_id', '==', 'Pendiente')).subscribe(data => {
      turnosPendientes = data;
      if (turnosPendientes.length > 0) {
        this.presentToast('Ya tenes al menos un turno pendiente!');
      } else {
        // verifico que este disponible todavia ese horario
        this.fb.col$('TURNO', ref => ref.where('fecha_reparacion', '==', this.fecha)
        .where('hora_reparacion', '==', Number(this.hora))).subscribe(d => {
          if (d.length === 0) {
            this.grabaTurno();
          } else {
            this.presentToastTurnoNoDisp();
          }
        });
      }
    });
  }

  async presentToast(mensaje) {
    const alert = await this.alertController.create({
      header: 'Upps!',
      subHeader: '',
      message: mensaje,
      buttons: ['Ok']
    });
    alert.present();
  }

  async presentToastTurnoNoDisp() {
    const alert = await this.alertController.create({
      header: 'Turno no disponible',
      subHeader: 'Este turno ya no esta disponible',
      message: 'Por favor solicita uno nuevo',
      buttons: ['Ok']
    });
     alert.present();
  }

  logOut() {
    this.auth.signOut().then(() => {
      this.autenticado = false;
    });
  }

  aceptar(check) {
    this.terminosAceptados = check.detail.checked;
  }

  setTel(telefono) {
    this.telefono = telefono;
  }

}
