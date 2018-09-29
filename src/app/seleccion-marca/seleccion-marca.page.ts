import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/f-base.service';
import { Marca } from '../../Model/models';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-seleccion-marca',
  templateUrl: './seleccion-marca.page.html',
  styleUrls: ['./seleccion-marca.page.scss'],
})
export class SeleccionMarcaPage implements OnInit {

  _marcas: Observable<Marca[]>;
  nombreUsuario;
  foto;
  textoBoton = '';
  constructor(private fb: FirestoreService, private route: ActivatedRoute, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this._marcas = this.fb.colWithIds$('MARCA');
    // Verifico previamente si esta logueado
    this.auth.afAuth.authState.subscribe(user => {
      if (user) {
        this.nombreUsuario = this.auth.getUserNombre();
        this.foto = this.auth.getUserPhoto();
        this.nombreUsuario = this.nombreUsuario.substr(0, this.nombreUsuario.indexOf(' '));
        this.textoBoton = 'Panel de ' + this.nombreUsuario;
      } else {
        this.textoBoton = 'Ingresar';
      }
    }, () => {
    }
    );
}
}
