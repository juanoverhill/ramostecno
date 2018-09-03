import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'seleccionMarca', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'startUp', loadChildren: './start-up/start-up.module#StartUpPageModule' },
  { path: 'calendar/:idReparacion/:idColor', loadChildren: './calendar/calendar.module#CalendarPageModule'},
  { path: 'seleccionMarca', loadChildren: './seleccion-marca/seleccion-marca.module#SeleccionMarcaPageModule' },
  { path: 'seleccionEquipo/:id', loadChildren: './seleccion-equipo/seleccion-equipo.module#SeleccionEquipoPageModule' },
  // tslint:disable-next-line:max-line-length
  { path: 'confirmacion-turno/:idReparacion/:idColor/:fecha/:hora', loadChildren: './confirmacion-turno/confirmacion-turno.module#ConfirmacionTurnoPageModule' },  { path: 'turno-confirmado', loadChildren: './turno-confirmado/turno-confirmado.module#TurnoConfirmadoPageModule' }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
