import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Predmet, SkolskaGodina, Termini} from "../model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TerminiService {
  private readonly apiUrl = environment.terminiApi;

  constructor(private httpClient: HttpClient) {}

  readAll(): Observable<Termini[]> {
    let url = `${this.apiUrl}/getAll`

    return this.httpClient.get<Termini[]>(url)
  }

  createTermini(brPredavanja: number, brVezbe: number, brPraktikum:number, predmet: Predmet, godina: SkolskaGodina): Observable<Termini> {
    let url = `${this.apiUrl}/create`

    let body = {
      brTerminaPredavanja: brPredavanja,
      brTerminaVezbe: brVezbe,
      brTerminaPraktikum: brPraktikum,
      predmet: predmet,
      skolskaGodina: godina

    }
    return this.httpClient.post<Termini>(url,body)
  }

  delete(termini: Termini): Observable<Object> {
    let url = `${this.apiUrl}/delete`;
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', termini.id)
    return this.httpClient.delete(url, {
      params: queryParams
    })
  }

  update(termini: Termini) {
    let url = `${this.apiUrl}/update`

    let body = {
      id: termini.id,
      br_termina_predavanja: termini.br_termina_predavanja,
      br_termina_vezbe: termini.br_termina_vezbe,
      br_termina_praktikum: termini.br_termina_praktikum,
      predmet: termini.predmet,
      skolskaGodina: termini.skolskaGodina
    }

    return this.httpClient.put<Termini>(url,body)
  }
}
