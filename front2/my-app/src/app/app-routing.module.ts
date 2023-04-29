import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KontaktComponent } from './kontakt/kontakt.component';
import { LoginComponent } from './login/login.component';
import { OsobeComponent } from './osobe/osobe.component';
import { RegisterComponent } from './register/register.component';
import { UnosOsobeComponent } from './unos-osobe/unos-osobe.component';
import { PostavkeComponent } from './postavke/postavke.component';
import { NovaMolbaComponent } from './nova-molba/nova-molba.component';
import { PregledMolbiComponent } from './pregled-molbi/pregled-molbi.component';
import { NoviUpisComponent } from './novi-upis/novi-upis.component';
import { PregledUpisaComponent } from './pregled-upisa/pregled-upisa.component';
import { DokumentiComponent } from './dokumenti/dokumenti.component';
import { NaslovnaComponent } from './naslovna/naslovna.component';
import { ObavijestiComponent } from './obavijesti/obavijesti.component';
import { DetaljiMolbeComponent } from './detalji-molbe/detalji-molbe.component';

const routes: Routes = [
  { path: 'osobe', component: OsobeComponent},
  { path: 'unos-osobe', component: UnosOsobeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'kontakt', component: KontaktComponent },
  { path: '', redirectTo: 'osobe', pathMatch: 'full' },
  { path: 'unos-osobe/:id', component: UnosOsobeComponent },
  { path: 'novaMolba', component: NovaMolbaComponent },
  { path: 'pregledMolbi', component: PregledMolbiComponent },
  { path: 'noviUpis', component: NoviUpisComponent },
  { path: 'pregledUpisa', component: PregledUpisaComponent },
  { path: 'dokumenti', component: DokumentiComponent },
  { path: 'naslovna', component: NaslovnaComponent },
  { path: 'obavijesti', component: ObavijestiComponent },
  { path: 'postavke', component: PostavkeComponent },
  { path: 'detalji-molbe/:id', component: DetaljiMolbeComponent },

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', // Add options right here
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
