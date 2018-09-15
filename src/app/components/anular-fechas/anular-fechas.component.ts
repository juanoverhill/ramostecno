import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/f-base.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-anular-fechas',
  templateUrl: './anular-fechas.component.html',
  styleUrls: ['./anular-fechas.component.scss']
})
export class AnularFechasComponent implements OnInit {

  constructor(private fb: FirestoreService,private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  public async close() {
    const modal = await this.modalCtrl.getTop();
    modal.dismiss();
  }

}
