import { EquipoService } from '../../services/equipo.service';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NavController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
  equipos = [];

  constructor(private navCtrl: NavController,
    private auth: AuthService,
    private afs: AngularFirestore,
    private serviceEquipo: EquipoService
    ) {
  }

  ionViewWillEnter() {
    this.getEquiposFirebase();
   }
  // signInGoogle(){
  //   this.auth.signInWithGoogle()
  //     .then(
  //       () => console.log("Se registro correctamente el usuario"),
  //       error => console.log(error)
  //     );
  // }

  getEquiposHTTP() {
        this.serviceEquipo.getEquipos().subscribe(result => {
      result.forEach(item => {
        this.equipos.push(item);
      });
    }, error => {
    });
  }

  getEquiposFirebase() {
    this.itemsCollection = this.afs.collection('EQUIPO');
    this.items = this.itemsCollection.snapshotChanges()
      .map(actions => {
        return actions.map(action => ({ key: action.payload.doc.id, ...action.payload.doc.data() }));
      });
    this.items.forEach(element => {
      this.equipos = element;
    });
  }

  verItem(item) {
        console.log(item.id);
    }

}
