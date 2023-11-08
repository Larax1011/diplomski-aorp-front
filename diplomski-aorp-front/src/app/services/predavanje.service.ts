import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Predavac, Predavanje, Predmet, SkolskaGodina} from "../model";

@Injectable({
  providedIn: 'root'
})
export class PredavanjeService {

  private readonly apiUrl = environment.predavanjeApi;

  constructor(private httpClient: HttpClient) {
  }

  readAll(): Observable<Predavanje[]> {
    let url = `${this.apiUrl}/getAll`;

    return this.httpClient.get<Predavanje[]>(url);
  }

  createPredavanje(tip: string, br_termina: number, predavac: Predavac | null | undefined, predmet: Predmet | null | undefined, skolaskaGodina: SkolskaGodina | null | undefined): Observable<Predavanje> {
    let url = `${this.apiUrl}/create`;
    let body = {
      tip: tip,
      br_termina: br_termina,
      predavac: predavac,
      predmet: predmet,
      skolskaGodina: skolaskaGodina
    }
    return this.httpClient.post<Predavanje>(url,body)
  }

  delete(predavanje: Predavanje) {
    let url = `${this.apiUrl}/delete`;
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', predavanje.id)
    return this.httpClient.delete(url, {
      params: queryParams
    })
  }
}
