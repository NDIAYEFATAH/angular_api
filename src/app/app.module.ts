import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ServiceComponent } from './service/service.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TableClientComponent } from './table-client/table-client.component';
import { ClientEditComponent } from './client-edit/client-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ServiceComponent,
    TableClientComponent,
    ClientEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
