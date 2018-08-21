import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/f-base.service';
import { Marca } from '../../Model/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-seleccion-marca',
  templateUrl: './seleccion-marca.page.html',
  styleUrls: ['./seleccion-marca.page.scss'],
})
export class SeleccionMarcaPage implements OnInit {

  _marcas: Observable<Marca[]>;
  constructor(private fb: FirestoreService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this._marcas = this.fb.colWithIds$('MARCA');
  }

}
