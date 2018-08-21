import { Marca } from './../../Model/models';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router,  } from '@angular/router';
import { FirestoreService } from '../../services/f-base.service';
import { Observable } from 'rxjs';
import { Equipo } from '../../Model/models';


@Component({
  selector: 'app-seleccion-equipo',
  templateUrl: './seleccion-equipo.page.html',
  styleUrls: ['./seleccion-equipo.page.scss'],
})

export class SeleccionEquipoPage implements OnInit {

  slideOpts = {
    effect: 'slide',
    slidesPerView: this.checkScreen()
  };

  _equipos: any[] = [];
  _colores: any[] = [];
  marcaID: string;
  isLoad = false;
  constructor(private fb: FirestoreService, private route: ActivatedRoute, private router: Router) { }

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
    if (window.innerWidth >= 960) {
      return 2.125;
    } else {
      return 1.125;
    }
  }

}
