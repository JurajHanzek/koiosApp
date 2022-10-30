import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KontaktComponent } from './kontakt/kontakt.component';
import { LoginComponent } from './login/login.component';
import { OsobeComponent } from './osobe/osobe.component';
import { RegisterComponent } from './register/register.component';
import { UnosOsobeComponent } from './unos-osobe/unos-osobe.component';

const routes: Routes = [
  { path: 'osobe', component: OsobeComponent},
  { path: 'unos-osobe', component: UnosOsobeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'kontakt', component: KontaktComponent },
  { path: '', redirectTo: 'osobe', pathMatch: 'full' },
  { path: 'unos-osobe/:id', component: UnosOsobeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', // Add options right here
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
