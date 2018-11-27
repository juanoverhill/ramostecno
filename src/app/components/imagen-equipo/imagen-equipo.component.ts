
import { ImagenReparacion } from './../../../Model/models';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/f-base.service';
import { NavParams, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { VisorImagenComponent } from '../visor-imagen/visor-imagen.component';

@Component({
  selector: 'app-imagen-equipo',
  templateUrl: './imagen-equipo.component.html',
  styleUrls: ['./imagen-equipo.component.scss']
})
export class ImagenEquipoComponent implements OnInit {

  // latest snapshot
  public webcamImage: WebcamImage = null;
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();

  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  verImagenes = false;
  reparacionID;

  imagenes: Observable<ImagenReparacion[]>;
  cantidadImagenes;

  constructor(private fb: FirestoreService, public navParams: NavParams,
    private router: Router, private modalCtrl: ModalController, private auth: AuthService,
    private storage: AngularFireStorage) { }

  ngOnInit() {
    this.reparacionID = this.navParams.get('idReparacion');
    this.imagenes = this.fb.colWithIds$('IMAGEN_REPARACION', ref => ref.where('reparacion_id', '==', this.reparacionID));
    this.imagenes.subscribe(data => {
      this.cantidadImagenes = data.length;
    });
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    let nombreImagen = 'image.jpg';
    if (this.cantidadImagenes !== 0) {
      nombreImagen = 'image_' + (this.cantidadImagenes + 1) + '.jpg';
    }

    const filePath = '/RID_' + this.reparacionID + '/' + nombreImagen;
    const fileRef = this.storage.ref(filePath);
    const image = 'data:image/jpg;base64,' + webcamImage.imageAsBase64;
    const task = fileRef.putString(image, 'data_url');

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        const _imagenReparacion = new ImagenReparacion();
          _imagenReparacion.reparacion_id = this.reparacionID;
          _imagenReparacion.nombreImagen = nombreImagen;
          this.downloadURL.subscribe(img => {
              _imagenReparacion.imagen_URL = img;
              this.fb.add('IMAGEN_REPARACION', _imagenReparacion);
              this.muestraImagenes();
          });
        })
    ).subscribe(() => {});
  }

  public triggerSnapshot(): void {
    this.verImagenes = true;
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  muestraImagenes() {
    this.verImagenes = false;
  }

  async imagenReparacion(imagenURL) {
    const modal = await this.modalCtrl.create({
      component: VisorImagenComponent,
      componentProps: { imagen: imagenURL }
    });
    return await modal.present();
  }

}
