import { FormsModule } from '@angular/forms';
import { EquipoService } from '../services/equipo.service';
import { AuthService } from '../services/auth.service';
import { HomePage } from './home/home.page';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {  FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AnularFechasComponent } from './components/anular-fechas/anular-fechas.component';
import { HorariosTrabajoComponent } from './components/horarios-trabajo/horarios-trabajo.component';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [AppComponent, AnularFechasComponent, HorariosTrabajoComponent],
  entryComponents: [AnularFechasComponent, HorariosTrabajoComponent],
  exports: [],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
     IonicModule.forRoot(),
     AppRoutingModule,
    SharedModule,
     AngularFirestoreModule.enablePersistence(),
  AngularFireModule.initializeApp(environment.fire)],
  providers: [
    StatusBar,
    SplashScreen,
    HomePage,
    AuthService,
    AngularFireModule,
    AngularFireAuth,
    FormBuilder,
    EquipoService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
  ]
})
export class AppModule {}
