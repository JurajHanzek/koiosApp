import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KontaktComponent } from './kontakt/kontakt.component';
import { LoginComponent } from './login/login.component';
import { OsobeComponent } from './osobe/osobe.component';
import { UnosOsobeComponent } from './unos-osobe/unos-osobe.component';

const routes: Routes = [
  { path: 'osobe', component: OsobeComponent},
  { path: 'unos-osobe', component: UnosOsobeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'kontakt', component: KontaktComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', // Add options right here
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
