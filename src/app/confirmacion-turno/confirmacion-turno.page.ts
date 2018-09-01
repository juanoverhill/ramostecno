import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../services/f-base.service';
import { Reparacion } from '../../Model/models';
import { ModalController } from '@ionic/angular';
import { LoginComponent } from '../components/login/login.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-confirmacion-turno',
  templateUrl: './confirmacion-turno.page.html',
  styleUrls: ['./confirmacion-turno.page.scss'],
})
export class ConfirmacionTurnoPage implements OnInit {

  constructor(private route: ActivatedRoute, private fb: FirestoreService,
    private modalController: ModalController,private auth: AuthService) { }

  reparacionID: string;
  colorID: string;
  fecha: any;
  hora: any;
  reparacion: Observable<Reparacion>;

  ngOnInit() {
    this.reparacionID = this.route.snapshot.paramMap.get('idReparacion');
    this.reparacion = this.fb.doc$('PRECIO_REPARACION/'+this.reparacionID);
    this.colorID = this.route.snapshot.paramMap.get('idColor');
    this.fecha = this.route.snapshot.paramMap.get('fecha');
    this.fecha = new Date(this.fecha);
    this.hora = this.route.snapshot.paramMap.get('hora');
  }

  async login(tipo) {
    const modal = await this.modalController.create({
      component: LoginComponent,
      componentProps: { tipo: tipo }
    });
    return await modal.present();
  }

  signInGoogle(){
    this.auth.signInWithGoogle();
    console.log(this.auth.getEmail());
    console.log(this.auth.getTelefono());
    console.log(this.auth.getUserID());
    console.log(this.auth.getUserNombre());
  }

}
