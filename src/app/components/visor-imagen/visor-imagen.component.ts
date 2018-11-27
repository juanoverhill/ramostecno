import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/f-base.service';
import { NavParams, ModalController } from '@ionic/angular';
import { ImagenReparacion } from '../../../Model/models';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-visor-imagen',
  templateUrl: './visor-imagen.component.html',
  styleUrls: ['./visor-imagen.component.scss']
})
export class VisorImagenComponent implements OnInit {

  imagen;
  cargoImagen = false;
  imagenID;

  constructor(private fb: FirestoreService, public navParams: NavParams, private modalCtrl: ModalController,
    private storage: AngularFireStorage) { }

  ngOnInit() {
    this.imagen = this.navParams.get('imagen');
    console.log(this.imagen);
    this.cargoImagen = true;
  }

  deleteImagen() {

    const filePath = '/RID_' + this.imagen.reparacion_id + '/' + this.imagen.nombreImagen;
    const fileRef = this.storage.ref(filePath);
    const task = fileRef.delete();

    task.subscribe(() => {
      this.fb.delete('IMAGEN_REPARACION/' + this.imagen.id);
      this.modalCtrl.dismiss();
    });
  }

}
