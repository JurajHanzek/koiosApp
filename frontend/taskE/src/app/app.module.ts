import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OsobeComponent } from './osobe/osobe.component';
import { UnosOsobeComponent } from './unos-osobe/unos-osobe.component';

@NgModule({
  declarations: [
    AppComponent,
    OsobeComponent,
    UnosOsobeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
