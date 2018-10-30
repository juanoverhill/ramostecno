import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { FirestoreService } from '../../../services/f-base.service';
import { PrintService } from '../../../services/print.service';
import { Turno, Ticket } from '../../../Model/models';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  idTurno: any;
  turno: Observable<Turno>;
  ticket: Observable<Ticket>;
  n_control: number;
  cargoOK = false;

  constructor(public navParams: NavParams, private fb: FirestoreService,
    private printService: PrintService) { }

  ngOnInit() {
    this.idTurno = this.navParams.get('idTurno');
    this.turno = this.fb.doc$('TURNO/' + this.idTurno);
    const existeTicket = this.fb.colWithIds$('TICKET', ref => ref.where('turno_id', '==', this.idTurno));
    existeTicket.subscribe(data => {
      // existe un ticket asociado a este turno
      const tk = data[0] as Ticket;
      if (data.length > 0) {
        // console.log('existe turno');
        this.ticket = this.fb.doc$('TICKET/' + tk.id);
        this.n_control = tk.n_control;
        this.cargoOK = true;
      } else {
        // console.log('genero ticket');
          this.getNextNumControl();
      }
    });
  }

  print(componentName, form) {
    this.generaTicket(form);
    this.printService.print(componentName);
  }

  getNextNumControl() {
     this.fb.col$('TICKET', ref => ref.orderBy('n_control', 'desc').limit(1)).subscribe(data => {
       if (data.length === 0) {
         this.n_control = 1;
       } else {
         // console.log('entre');
        const tk = data[0] as Ticket;
        this.n_control = tk.n_control + 1;
       }
       this.cargoOK = true;
    });
  }

  generaTicket(form) {
    const tk = new Ticket();
    tk.n_control = this.n_control;
    tk.turno_id = this.idTurno;
    tk.contacto = form.value.contacto;
    tk.imei = form.value.imei;
    tk.clave = form.value.clave;
    tk.patron = Boolean(form.value.patron);
    tk.simCard = Boolean(form.value.simCard);
    tk.bandejaSIM = Boolean(form.value.bandejaSIM);
    tk.tarjetaSD = Boolean(form.value.tarjetaSD);
    tk.bateria = Boolean(form.value.bateria);
    tk.carga = Boolean(form.value.carga);
    tk.tapa = Boolean(form.value.tapa);
    tk.bluetooth = Boolean(form.value.bluetooth);
    tk.wifi = Boolean(form.value.wifi);
    tk.cap = Boolean(form.value.cap);
    tk.auricular = Boolean(form.value.auricular);
    tk.microfono = Boolean(form.value.microfono);
    tk.altavoz = Boolean(form.value.altavoz);
    tk.camTrasera = Boolean(form.value.camTrasera);
    tk.camFrontal = Boolean(form.value.camFrontal);
    tk.teclado = Boolean(form.value.teclado);
    tk.botonON = Boolean(form.value.botonON);
    this.fb.upsert('TICKET/' + this.n_control, tk);
  }

}
