import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { FirestoreService } from '../../../services/f-base.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  idTurno: any;
  constructor(public navParams: NavParams, private fb: FirestoreService) { }

  ngOnInit() {
    this.idTurno = this.navParams.get('idTurno');

  }

  generatePDF() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const docDefinition = { content: [
      {
        style: 'tableExample',
        table: {
          widths: ['*', '*'],
          heights: [20, 40, 20, 30, 50, 30],
          body: [
            [
             { text: 'Fundacion Ramos Tecnoreparaciones', style: 'header', alignment: 'center' },
             { text: 'Fundacion Ramos Tecnoreparaciones', style: 'header', alignment: 'center' }
            ],
            [
              { text: 'Ticket de servicio', alignment: 'center', italics: true},
              { text: 'Ticket de servicio', alignment: 'center', italics: true}
            ],
            [
              { text: 'Numero de control: 272', alignment: 'left', fontSize: 10},
              { text: 'Numero de control: 272', alignment: 'left', fontSize: 10}
            ],
            [
              {
                columns: [
                    { text: 'Contacto: 1164960989', alignment: 'left', fontSize: 10 },
                    { text: 'IMEI: --', alignment: 'left', fontSize: 10 }
                  ]
                },
              {
                columns: [
                  { text: 'Contacto: 1164960989', alignment: 'left', fontSize: 10 },
                  { text: 'IMEI: --', alignment: 'left', fontSize: 10 }
                ]
              }
            ],
            [
              {
                columns: [
                  { text: 'Clave: Patron', alignment: 'left', fontSize: 10 },
                  {
                    image: 'patron',
                    fit: [100, 100],
                  }
                ]
              },
              {
                columns: [
                  { text: 'Clave: XXX', alignment: 'left', fontSize: 10 },
                  {
                    image: 'patron',
                    fit: [100, 100]
                   }
                ]
               }
            ],
            [
              { text: 'Checks', alignment: 'left', fontSize: 11 },
              { text: 'Checks', alignment: 'left', fontSize: 11 }
            ],
            [
              {
                table: {
                  body: [
                          ['Tarjeta SIM: SI', 'Bandeja Porta SIM: SI', 'Tarjeta SD: NO'],
                          ['Bateria: SI', 'Carga: SI', 'Tapa: NO'],
                          ['Bluetooth: SI', 'Wifi: SI', 'CAP: NO'],
                          ['Auricular: SI', 'Microfono: SI', 'Altavoz: NO'],
                          ['Cam. Trasera: SI', 'Cam. Frontal: SI', ''],
                          ['Teclado: SI', 'Boton ON: SI', '']
                        ]
                },
              },
              {
                table: {
                  body: [
                          ['Tarjeta SIM: SI', 'Bandeja Porta SIM: SI', 'Tarjeta SD: NO'],
                          ['Bateria: SI', 'Carga: SI', 'Tapa: NO'],
                          ['Bluetooth: SI', 'Wifi: SI', 'CAP: NO'],
                          ['Auricular: SI', 'Microfono: SI', 'Altavoz: NO'],
                          ['Cam. Trasera: SI', 'Cam. Frontal: SI', ''],
                          ['Teclado: SI', 'Boton ON: SI', '']
                        ]
                },
              }
            ]
          ]
        },
        layout: 'noBorders'
      },
    ],
      styles: {
        header: {
          fontSize: 12,
          bold: true,
          alignment: 'justify'
        }},

    pageOrientation: 'landscape',
      images: {
        // tslint:disable-next-line:max-line-length
        patron: 'data:image/png;base64,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'
      }
   };
    pdfMake.createPdf(docDefinition).download('PruebaPDF.pdf');
  }
}
