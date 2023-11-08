import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RaspodelaComponent} from "./components/raspodela/raspodela.component";
import {DodajTerminiComponent} from "./components/dodaj-termini/dodaj-termini.component";
import {DodajPredavacComponent} from "./components/dodaj-predavac/dodaj-predavac.component";
import {DodajPredmetComponent} from "./components/dodaj-predmet/dodaj-predmet.component";
import {DodajVanredniCasComponent} from "./components/dodaj-vanredni-cas/dodaj-vanredni-cas.component";
import {DodajSkolskuGodinuComponent} from "./components/dodaj-skolsku-godinu/dodaj-skolsku-godinu.component";
import {IzvestajComponent} from "./components/izvestaj/izvestaj.component";

const routes: Routes = [
  {
    path: "raspodela",
    component: RaspodelaComponent,
  },
  {
    path: "izvestaj",
    component: IzvestajComponent,
  },
  {
    path: "termini",
    component: DodajTerminiComponent,
  },
  {
    path: "predavac",
    component: DodajPredavacComponent,
  },
  {
    path: "predmet",
    component: DodajPredmetComponent,
  },
  {
    path: "vanredniCas",
    component: DodajVanredniCasComponent,
  },
  {
    path: "skolskaGodina",
    component: DodajSkolskuGodinuComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
