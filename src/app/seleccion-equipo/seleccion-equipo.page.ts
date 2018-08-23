import { ModalSeleccionReparacionComponent } from './../modal-seleccion-reparacion/modal-seleccion-reparacion.component';
import { Marca } from './../../Model/models';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router,  } from '@angular/router';
import { FirestoreService } from '../../services/f-base.service';
import { Observable } from 'rxjs';
import { Equipo } from '../../Model/models';
import { FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-seleccion-equipo',
  templateUrl: './seleccion-equipo.page.html',
  styleUrls: ['./seleccion-equipo.page.scss']
})

export class SeleccionEquipoPage implements OnInit {

  slideOpts = {
    effect: 'slide',
    slidesPerView: this.checkScreen(),
    simulateTouch: true,
    preloadImages: true,
    mousewheel: {
      invert: false,
      sensitivity: 0.5
    },
    keyboard: true

  };

  colorControl = new FormControl('', [Validators.required]);

  _equipos: any[] = [];
  _colores: any[] = [];
  marcaID: string;
  isLoad = false;
  colorSeleccionado: any;
  constructor(private fb: FirestoreService,
      private route: ActivatedRoute,
      private router: Router,
      private modalController: ModalController) { }

  ngOnInit() {
    this.marcaID = this.route.snapshot.paramMap.get('id');
    this.fb.colWithIds$('EQUIPO', ref => ref.where('marca_id', '==', this.marcaID)).subscribe(data => {
      this._equipos = data;
      this.isLoad = true;
    });

    this.fb.colWithIds$('COLOR').subscribe(data => {
      this._colores = data;
    });

  }

  checkScreen() {
    if (window.innerWidth >= 860) {
      return 2.125;
    } else {
      return 1.125;
    }
  }

  cambioColor(color) {
    this.colorSeleccionado = color.value;
  }

  seleccionarReparacion(equipoID) {
    this.presentModal(equipoID);
  }

  async presentModal(value) {
    const modal = await this.modalController.create({
      component: ModalSeleccionReparacionComponent,
      componentProps: { idEquipo: value, idColor: this.colorSeleccionado }
    });
    return await modal.present();
  }

}
