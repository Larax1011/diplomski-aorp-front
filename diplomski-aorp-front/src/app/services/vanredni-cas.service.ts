import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Predavac, SkolskaGodina, VanredniCas} from "../model";

@Injectable({
  providedIn: 'root'
})
export class VanredniCasService {

  private readonly apiUrl = environment.vanredniCasApi;

  constructor(private httpClient: HttpClient) {}

  readAll(): Observable<VanredniCas[]> {
    let url = `${this.apiUrl}/getAll`;

    return this.httpClient.get<VanredniCas[]>(url);
  }

  delete(vanredniCas: VanredniCas) {
    let url = `${this.apiUrl}/delete`;
    let queryParams = new HttpParams()
    queryParams = queryParams.append('id', vanredniCas.id)

    return this.httpClient.delete(url, {
      params: queryParams
    })
  }

  update(vanredniCas: VanredniCas): Observable<Predavac> {
    let url = `${this.apiUrl}/update`;

    let body = {
      id: vanredniCas.id,
      opis: vanredniCas.opis,
      br_casova: vanredniCas.br_casova,
      predavac: vanredniCas.predavac,
      skolskaGodina: vanredniCas.skolskaGodina
    }

    return this.httpClient.put<Predavac>(url,body)
  }

  create(opis: string, br_casova: number, predavac: Predavac, skolskaGodina: SkolskaGodina) {
    let url = `${this.apiUrl}/create`;
    let body = {
      opis: opis,
      br_casova: br_casova,
      predavac: predavac,
      skolskaGodina: skolskaGodina
    }

    return this.httpClient.post<VanredniCas>(url, body)
  }
}
