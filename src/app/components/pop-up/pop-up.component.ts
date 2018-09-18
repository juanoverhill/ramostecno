import { Color, Reparacion, PrecioReparacion, Marca, Colores } from './../../../Model/models';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/f-base.service';
import { Observable } from 'rxjs';
import { NavParams, ModalController, AlertController } from '@ionic/angular';
import { DocPipe } from '../../doc.pipe';
import { Router } from '@angular/router';
import { Equipo } from '../../../Model/models';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {

  equipo: Observable<Equipo>;
  colores: Observable<Color[]>;
  reparaciones: Observable<PrecioReparacion[]>;
  idEquipo: any;
  idMarca: any;
  nuevoEquipo = true;
  muestraImagen = false;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  nombreMarca: string;
  cargoOK = false;
  cargoImagenOK = false;
  colores_disponibles: Observable<Colores[]>;
  reparaciones_disponibles: Observable<Reparacion[]>;


  constructor(private fb: FirestoreService, public navParams: NavParams,
    private router: Router, private modalCtrl: ModalController, private storage: AngularFireStorage,
    public alertController: AlertController) { }

  ngOnInit() {
    this.idEquipo = this.navParams.get('idEquipo');
    this.idMarca = this.navParams.get('idMarca');
    if (this.idEquipo !== 'Nuevo') {
        this.cargaDatos(this.idEquipo);
        this.cargoImagenOK = true;
        this.nuevoEquipo = false;
    }

    this.fb.doc$('MARCA/' + this.idMarca).subscribe(data => {
      const mrc = data as Marca;
      this.nombreMarca = mrc.descripcion.toLowerCase();
      this.cargoOK = true;
    });
  }

  cargaDatos(equipoID) {
    this.equipo = this.fb.doc$('EQUIPO/' + equipoID);
    this.colores = this.fb.colWithIds$('COLOR', ref => ref.where('equipo_id', '==', equipoID));
    this.reparaciones = this.fb.colWithIds$('PRECIO_REPARACION', ref => ref.where('equipo_id', '==', equipoID));
    this.colores_disponibles = this.fb.colWithIds$('COLORES');
    this.reparaciones_disponibles = this.fb.colWithIds$('REPARACION');
  }

  public async close() {
    const modal = await this.modalCtrl.getTop();
    modal.dismiss();
  }

  addEquipo(descripcion) {
    if (this.nuevoEquipo) {
      const nwEquipo = new Equipo();
      nwEquipo.descripcion = descripcion;
      nwEquipo.estado = 'ACTIVO';
      nwEquipo.marca_id = this.idMarca;
      nwEquipo.marcaRef = this.fb.doc('MARCA/' + this.idMarca).ref;
      this.downloadURL.subscribe(img => {
        nwEquipo.imagen = img;
        this.fb.add('EQUIPO', nwEquipo).then(docRef => {
          this.idEquipo = docRef.id;
          this.cargaDatos(docRef.id);
          this.cargoImagenOK = true;
          this.nuevoEquipo = false;
        });
      });
    } else {
      const upEquipo = new Equipo();
      upEquipo.descripcion = descripcion;
      const imagenEquipo = document.getElementById('imgn') as HTMLImageElement;
      upEquipo.imagen = imagenEquipo.src;
      this.fb.update('EQUIPO/' + this.idEquipo, upEquipo);
    }
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = '/' + this.nombreMarca + '/' + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() =>  this.downloadURL = fileRef.getDownloadURL())
    )
    .subscribe(() => this.cargoImagenOK = true );
  }

  deleteColor(colorID) {
    this.fb.delete('COLOR/' + colorID);
  }

  agregaColor(color) {
     const nuevoColor = new Color();
     nuevoColor.color = color;
     nuevoColor.equipo_id = this.idEquipo;
     nuevoColor.equipoRef = this.fb.doc('EQUIPO/' + this.idEquipo).ref;
     this.fb.add('COLOR', nuevoColor);
  }

  async alertEditarReparacion(reparacionID, valorEF, valorMP) {
    const alert = await this.alertController.create({
      header: 'Editar Reparacion',
      inputs: [
        {
          name: 'valorEF',
          type: 'text',
          placeholder: 'Valor en EF',
          value: valorEF
        },
        {
          name: 'valorMP',
          type: 'text',
          placeholder: 'Ingrese valor en MP',
          value: valorMP
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (datos) => {
            const rep = new PrecioReparacion();
            rep.valor_efectivo = datos.valorEF;
            rep.valor = datos.valorMP;
            this.fb.update('PRECIO_REPARACION/' + reparacionID, rep);
          }
        }
      ],
      cssClass: ['alert'],
    });
    await alert.present();
  }

  async alertAddReparacion(reparacionID) {
    const alert = await this.alertController.create({
      header: 'Agregar Reparacion',
      inputs: [
        {
          name: 'valorEF',
          type: 'text',
          placeholder: 'Valor en EF'
        },
        {
          name: 'valorMP',
          type: 'text',
          placeholder: 'Ingrese valor en MP'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (datos) => {
            const rep = new PrecioReparacion();
            rep.reparacion_id = reparacionID;
            rep.reparacionRef = this.fb.doc('REPARACION/' + reparacionID).ref;
            rep.equipo_id = this.idEquipo;
            rep.equipoRef = this.fb.doc('EQUIPO/' + this.idEquipo).ref;
            rep.valor_efectivo = datos.valorEF;
            rep.valor = datos.valorMP;
            this.fb.add('PRECIO_REPARACION', rep);
          }
        }
      ],
      cssClass: ['alert'],
    });
    await alert.present();
  }

  deleteReparacion(PrecioreparacionID) {
    this.fb.delete('PRECIO_REPARACION/' + PrecioreparacionID);
  }

}
