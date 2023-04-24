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

@NgModule({
  declarations: [
    AppComponent,
    OsobeComponent,
    UnosOsobeComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    KontaktComponent,
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
