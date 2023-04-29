import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OsobeComponent } from './osobe/osobe.component';
import { UnosOsobeComponent } from './unos-osobe/unos-osobe.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PostavkeComponent } from './postavke/postavke.component';
import { NovaMolbaComponent } from './nova-molba/nova-molba.component';
import { PregledMolbiComponent } from './pregled-molbi/pregled-molbi.component';
import { NoviUpisComponent } from './novi-upis/novi-upis.component';
import { PregledUpisaComponent } from './pregled-upisa/pregled-upisa.component';
import { DokumentiComponent } from './dokumenti/dokumenti.component';
import { NaslovnaComponent } from './naslovna/naslovna.component';
import { ObavijestiComponent } from './obavijesti/obavijesti.component';

@NgModule({
  declarations: [
    AppComponent,
    OsobeComponent,
    UnosOsobeComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    KontaktComponent,
    PostavkeComponent,
    NovaMolbaComponent,
    PregledMolbiComponent,
    NoviUpisComponent,
    PregledUpisaComponent,
    DokumentiComponent,
    NaslovnaComponent,
    ObavijestiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
