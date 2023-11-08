import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Predmet, SkolskaGodina} from "../model";

@Injectable({
  providedIn: 'root'
})
export class SkolskaGodinaService {

  private readonly apiUrl = environment.skolskaGodinaApi;

  constructor(private httpClient: HttpClient) {}

  readAll(): Observable<SkolskaGodina[]> {
    let url = `${this.apiUrl}/getAll`;

    return this.httpClient.get<SkolskaGodina[]>(url);
  }

  update(skolskaGodina: SkolskaGodina) {
    let url = `${this.apiUrl}/update`

    let body = {
      id: skolskaGodina.id,
      pocetnaGodina: skolskaGodina.pocetnaGodina,
      krajnjaGodina: skolskaGodina.krajnjaGodina,
      brNedeljaUSemestru: skolskaGodina.brNedeljaUSemestru,
      predavanja: skolskaGodina.predavanja,
      termini: skolskaGodina.termini
    }

    return this.httpClient.put<Predmet>(url,body)
  }

  create(pocetnaGodina: number, krajnjaGodina: number, brNedeljaUSemestru: number): Observable<SkolskaGodina> {
    let url = `${this.apiUrl}/create`

    let body = {
      pocetnaGodina: pocetnaGodina,
      krajnjaGodina: krajnjaGodina,
      brNedeljaUSemestru: brNedeljaUSemestru
    }

    return this.httpClient.post<SkolskaGodina>(url,body)
  }

  delete(skolskaGodina: SkolskaGodina) {
    let url = `${this.apiUrl}/delete`

    let queryParams = new HttpParams()
    queryParams = queryParams.append('id', skolskaGodina.id)

    return this.httpClient.delete(url, {
      params : queryParams
    })
  }
}
