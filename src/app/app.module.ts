
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { FormsModule } from '@angular/forms';
import { EquipoService } from '../services/equipo.service';
import { AuthService } from '../services/auth.service';
import { HomePage } from './home/home.page';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import {  FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AnularFechasComponent } from './components/anular-fechas/anular-fechas.component';
import { HorariosTrabajoComponent } from './components/horarios-trabajo/horarios-trabajo.component';
import { SharedModule } from './shared.module';
import { PopEditaEstadoComponent } from './components/pop-edita-estado/pop-edita-estado.component';
import { PopListaChatsComponent } from './components/pop-lista-chats/pop-lista-chats.component';
import { ImagenEquipoComponent } from './components/imagen-equipo/imagen-equipo.component';
import {WebcamModule} from 'ngx-webcam';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { VisorImagenComponent } from './components/visor-imagen/visor-imagen.component';
import { NuevoTurnoComponent } from './components/nuevo-turno/nuevo-turno.component';
import { SelectorMarcaComponent } from './components/selector-marca/selector-marca.component';
import {MatListModule} from '@angular/material/list';
import { MAT_DATE_LOCALE } from '@angular/material';


@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [AppComponent, AnularFechasComponent, HorariosTrabajoComponent, PopEditaEstadoComponent, ChatRoomComponent, PopListaChatsComponent, ImagenEquipoComponent, VisorImagenComponent, NuevoTurnoComponent, SelectorMarcaComponent],
  // tslint:disable-next-line:max-line-length
  entryComponents: [AnularFechasComponent, HorariosTrabajoComponent, PopEditaEstadoComponent, ChatRoomComponent, PopListaChatsComponent, ImagenEquipoComponent, VisorImagenComponent, NuevoTurnoComponent, SelectorMarcaComponent],
  exports: [],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatDialogModule,
    MatListModule,
     IonicModule.forRoot(),
     AppRoutingModule,
    SharedModule,
    WebcamModule,
    AngularFirestoreModule.enablePersistence(),
  AngularFireModule.initializeApp(environment.fire),
  AngularFireStorageModule],
  providers: [
    StatusBar,
    SplashScreen,
    HomePage,
    AuthService,
    AngularFireModule,
    AngularFireAuth,
    FormBuilder,
    EquipoService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
  ]
})
export class AppModule {}
