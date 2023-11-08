import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {SkolskaGodina} from "../model";

@Injectable({
  providedIn: 'root'
})
export class ObracunService {

  private readonly apiUrl = environment.izvestajApi;

  constructor(private httpClient: HttpClient) { }

  getObracunProfesori(
    vanredniCasovi: boolean,
    skolskaGodina: SkolskaGodina
  ): Observable<ArrayBuffer> {
    let url = `${this.apiUrl}/profesori`

    let queryParams = new HttpParams()

    queryParams = queryParams.append('vanredniCasovi', vanredniCasovi)
    queryParams = queryParams.append('pocetnaGodina', skolskaGodina.pocetnaGodina)
    queryParams = queryParams.append('krajnjaGodina', skolskaGodina.krajnjaGodina)

    console.log("get pdf")
    console.log(url)
    return this.httpClient.get<ArrayBuffer>(url, {
      responseType : 'blob' as 'json',
      params: queryParams,
    })
  }

  getObracunPredmeti(
    skolskaGodina: SkolskaGodina
  ): Observable<ArrayBuffer> {
    let url = `${this.apiUrl}/predmeti`

    let queryParams = new HttpParams()
    queryParams = queryParams.append('pocetnaGodina', skolskaGodina.pocetnaGodina)
    queryParams = queryParams.append('krajnjaGodina', skolskaGodina.krajnjaGodina)


    console.log("get pdf")
    return this.httpClient.get<ArrayBuffer>(url, {
      responseType : 'blob' as 'json',
      params: queryParams
    })
  }
}
