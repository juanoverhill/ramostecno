
import { FeriadosService } from './../../services/feriados.service';
import { FirestoreService } from './../../services/f-base.service';
import { Component, OnInit } from '@angular/core';
import { CalendarComponentOptions, DayConfig } from 'ion4-calendar';
import { map} from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalHorariosComponent } from '../components/modal-horarios/modal-horarios.component';

interface DiasAnuladosInterface {
    dias_anulados: string;
    dias_laborables: string;
    trabaja_feriados: boolean;
    suma_n_viernes: boolean;
    empresa: string;
}

interface FechaAnulada {
  fecha: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  reparacionID: string;
  colorID: string;

  daysConfig: DayConfig[] = [];
  diasAnulados: any;
  cargoOK = false;
  _feriados: any[] = [];
  _fechasAnuladas: any[] = [];

  date: string;
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  options: CalendarComponentOptions = {
    weekdays: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthPickerFormat: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
    pickMode: 'single',
    daysConfig: this.daysConfig
  };

  constructor(private fBase: FirestoreService,
    private route: ActivatedRoute,
    private feriados: FeriadosService,
     private modalController: ModalController) {
   }

  ngOnInit() {
    this.reparacionID = this.route.snapshot.paramMap.get('idReparacion');
    this.colorID = this.route.snapshot.paramMap.get('idColor');
    this.getNDiasAnulados();
  }

   getNDiasAnulados() {
    const parametros = this.fBase.colWithIds$('PARAMETRO_ANULACION', ref => ref.where('empresa', '==', 'ramosTecno'));
    parametros.subscribe(par => {
      this.fBase.doc$('PARAMETRO_ANULACION/' + par[0].id).subscribe(d => {
        const data = d as DiasAnuladosInterface;
        this.anular_n_dias(data.dias_anulados);
        this.getFeriadosHTTP(data.dias_anulados, data.dias_laborables, data.trabaja_feriados);
      });
    });
  }

   anular_n_dias(n) {
    for (let i = 0; i <= n; i++) {
      this.daysConfig.push({
        date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getUTCDate() + i),
        subTitle: '',
        disable: true
      });
    }
  }

  anularFechas(n, dias_laborables: any) {
    const arrayLaborables = dias_laborables.split(',').map(Number);
    const fechaDesde = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getUTCDate() + n, 0, 0, 0, 0);
    const actualYear = new Date().getFullYear();
    const dateInicial = new Date('2018-01-01');
    // tslint:disable-next-line:max-line-length
    for (let fechaActual = dateInicial; fechaActual.getFullYear() <= (actualYear + 2); fechaActual = new Date(fechaActual.getTime() + (1000 * 60 * 60 * 24))) {
      const dia_actual = fechaActual.getDay();
      // calculo los dias laborables y feriados
      if (this._feriados.includes(fechaActual.toISOString().slice(0, 10))) {
          this.daysConfig.push({
            date: new Date(fechaActual.getTime() + (1000 * 60 * 60 * 24)),
            subTitle: '..',
            disable: true
          });
      } else if (arrayLaborables.includes(dia_actual) === false) {
          this.daysConfig.push({
            date: fechaActual,
            subTitle: '',
            disable: true
          });
        } else if (fechaActual > fechaDesde) {
          this.daysConfig.push({
            date: fechaActual,
            subTitle: 'disp.',
            disable: false
          });
        }
      this.getFechasAnuladas();
    }
  }

  getFeriadosHTTP(n, dias_laborables: any, feriados: boolean) {
    if (feriados === false) {
      const actualYear = new Date().getFullYear();
      this.feriados.getFeriados(actualYear).subscribe(result => {
        result.forEach(item => {
          const fechaActual = new Date(actualYear, item.mes - 1, item.dia).toISOString().slice(0, 10);
          this._feriados.push(fechaActual);
        });
        this.anularFechas(n, dias_laborables);
      }, error => {
      });
    } else {
      this.anularFechas(n, dias_laborables);
    }
  }

  getFechasAnuladas() {
    this.fBase.colWithIds$('FECHA_ANULADA').subscribe(data => {
      data.forEach((item: FechaAnulada) => {
        const fecha = new Date(item.fecha);
        this.daysConfig.push({
          date: fecha,
          subTitle: '',
          disable: true
        });
      });
      this.cargoOK = true;
    });
  }

  async presentModal(fecha) {
    const modal = await this.modalController.create({
      component: ModalHorariosComponent,
      componentProps: {idColor: this.colorID, idReparacion: this.reparacionID, fecha: fecha._d}
    });
    return await modal.present();
  }

}
