import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RaspodelaComponent } from './components/raspodela/raspodela.component';
import { DodajTerminiComponent } from './components/dodaj-termini/dodaj-termini.component';
import { DodajPredavacComponent } from './components/dodaj-predavac/dodaj-predavac.component';
import { DodajPredmetComponent } from './components/dodaj-predmet/dodaj-predmet.component';
import { DodajVanredniCasComponent } from './components/dodaj-vanredni-cas/dodaj-vanredni-cas.component';
import { DodajSkolskuGodinuComponent } from './components/dodaj-skolsku-godinu/dodaj-skolsku-godinu.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {CdkFixedSizeVirtualScroll, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import { SearchPipe } from './pipes/search.pipe';
import { IzvestajComponent } from './components/izvestaj/izvestaj.component';
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    AppComponent,
    RaspodelaComponent,
    DodajTerminiComponent,
    DodajPredavacComponent,
    DodajPredmetComponent,
    DodajVanredniCasComponent,
    DodajSkolskuGodinuComponent,
    SearchPipe,
    IzvestajComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
