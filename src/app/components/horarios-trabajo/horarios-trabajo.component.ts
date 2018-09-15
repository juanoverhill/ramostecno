import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/f-base.service';
import { ModalController, AlertController } from '@ionic/angular';
import { HoraDisponible, ParametroAnulacion } from '../../../Model/models';
import { database } from 'firebase-functions';

@Component({
  selector: 'app-horarios-trabajo',
  templateUrl: './horarios-trabajo.component.html',
  styleUrls: ['./horarios-trabajo.component.scss']
})
export class HorariosTrabajoComponent implements OnInit {

  horariosDisponibles: any[] = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,1];
  diasDisponibles: any[] = [0,1,2,3,4,5,6];
  _horarios: any[] = [];
  _dias: any[] = [];
  cargoOK = false;
  idHorario;
  idParametro;
  nDias;

  constructor(private fb: FirestoreService,private modalCtrl: ModalController,
    public alertController: AlertController) { }

  ngOnInit() {
    this.fb.colWithIds$('HORA_DISPONIBLE', ref => ref.where('empresa', '==', 'ramosTecno')).subscribe(data => {
      const datos = data[0] as HoraDisponible;
      this.idHorario = datos.id;
      const array = datos.horas_trabajo.split(',').map(Number);
      this._horarios = array;

      this.fb.colWithIds$('PARAMETRO_ANULACION', ref => ref.where('empresa', '==', 'ramosTecno')).subscribe(dates => {
        const dat = dates[0] as ParametroAnulacion;
        this.idParametro = dat.id;
        this.nDias = dat.dias_anulados;
        const array2 = dat.dias_laborables.split(',').map(Number);
        
        this._dias = array2;
        console.log(this._dias);
      });

      this.cargoOK = true;
    });
}

  public async close() {
    const modal = await this.modalCtrl.getTop();
    modal.dismiss();
  }

  cambiaHora(chk,hora) {
    if(chk === true) {
      this._horarios.push(hora);
    } else {
      this._horarios = this._horarios.filter(x => x != hora);
    }
    this._horarios = this._horarios.sort((n1,n2) => n1 - n2);
    const horariosTrabajo = new HoraDisponible();
    horariosTrabajo.horas_trabajo = String(this._horarios).replace('[','').replace(']','');
    this.fb.update('HORA_DISPONIBLE/' + this.idHorario ,horariosTrabajo);
  }
  
  cambiaDia(chk, dia) {
    if(chk === true) {
      this._dias.push(dia);
    } else {
      this._dias = this._dias.filter(x => x != dia);
    }

    this._dias = this._dias.sort((n1,n2) => n1 - n2);
    const param = new ParametroAnulacion();
    param.dias_laborables = String(this._dias).replace('[','').replace(']','');
    this.fb.update('PARAMETRO_ANULACION/' + this.idParametro, param);

  }

  cambiaN(numero) {
    const param = new ParametroAnulacion();
    param.dias_anulados = numero;
    this.fb.update('PARAMETRO_ANULACION/' + this.idParametro, param);
  }

}
