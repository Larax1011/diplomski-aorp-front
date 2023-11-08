import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {NerasporedjenPredmet, Predavac, Predmet} from "../model";

@Injectable({
  providedIn: 'root'
})
export class PredmetService {

  private readonly apiUrl = environment.predmetApi;

  constructor(private httpClient: HttpClient) {}

  readAll(): Observable<Predmet[]> {
    let url = `${this.apiUrl}/getAll`

    return this.httpClient.get<Predmet[]>(url)
  }

  getNerasporedjeniPredmeti(godina: string) :Observable<NerasporedjenPredmet[]> {
    let url = `${this.apiUrl}/getAllNerasporedjeniPredmeti`

    let queryParams = new HttpParams()

    queryParams = queryParams.append('pocetnaGodina', godina.split('/')[0])
    queryParams = queryParams.append('krajnjaGodina', godina.split('/')[1])

    return this.httpClient.get<NerasporedjenPredmet[]>(url, {
      params : queryParams
    })
  }

  delete(predmet: Predmet) {
    let url = `${this.apiUrl}/delete`

    let queryParams = new HttpParams()
    queryParams = queryParams.append('id', predmet.id)

    return this.httpClient.delete(url, {
      params : queryParams
    })

  }

  update(predmet: Predmet) :Observable<Predmet> {
    let url = `${this.apiUrl}/update`

    let body = {
      id: predmet.id,
      naziv: predmet.naziv,
      tip_studija: predmet.tip_studija,
      espb: predmet.espb,
      semestar: predmet.semestar,
      fond_predavanja: predmet.fond_predavanja,
      fond_vezbe: predmet.fond_vezbe,
      fond_praktikum: predmet.fond_praktikum,
      predavanja: predmet.predavanja,
      termini: predmet.termini
    }

    return this.httpClient.put<Predmet>(url,body)

  }

  create(naziv: string, tip_studija: string, espb: number, semestar: number, fond_predavanja: number, fond_vezbe: number, fond_praktikum: number) {
    let url = `${this.apiUrl}/create`

    let body = {
      naziv: naziv,
      tip_studija: tip_studija,
      espb: espb,
      semestar: semestar,
      fond_predavanja: fond_predavanja,
      fond_vezbe: fond_vezbe,
      fond_praktikum: fond_praktikum,
    }

    return this.httpClient.post<Predmet>(url,body)

  }
}
