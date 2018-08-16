import { CalendarResolver } from './calendar/calendar.resolver';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'startUp', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'startUp', loadChildren: './start-up/start-up.module#StartUpPageModule' },
  { path: 'calendar', loadChildren: './calendar/calendar.module#CalendarPageModule', resolve: {cargaInicial: CalendarResolver} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CalendarResolver]
})
export class AppRoutingModule { }
