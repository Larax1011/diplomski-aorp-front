import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Predavac} from "../model";

@Injectable({
  providedIn: 'root'
})
export class PredavacService {

  private readonly apiUrl = environment.predavacApi;

  constructor(private httpClient: HttpClient) {}

  readAll(): Observable<Predavac[]> {
    let url = `${this.apiUrl}/getAll`;

    return this.httpClient.get<Predavac[]>(url);
  }

  delete(predavac: Predavac) {
    let url = `${this.apiUrl}/delete`;
    let queryParams = new HttpParams()
    queryParams = queryParams.append('id', predavac.id)

    return this.httpClient.delete(url, {
      params: queryParams
    })

  }

  update(predavac: Predavac): Observable<Predavac> {
    let url = `${this.apiUrl}/update`;

    let body = {
      id: predavac.id,
      name: predavac.name,
      lastname: predavac.lastname,
      email: predavac.email,
      type: predavac.type,
      predavanja: predavac.predavanja,
      vanredniCasovi: predavac.vanredniCasovi
    }

    return this.httpClient.put<Predavac>(url,body)
  }

  create(name: string, lastname: string, email: string, type: string) {
    let url = `${this.apiUrl}/create`;
    let body = {
      name: name,
      lastname: lastname,
      email: email,
      type: type
    }

    return this.httpClient.post<Predavac>(url, body)
  }
}
