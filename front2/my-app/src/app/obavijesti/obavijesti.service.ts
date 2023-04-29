import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Obavijesti } from './obavijesti.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ObavijestiService {

  private api=environment.api;

  constructor(private http: HttpClient) { }

  public dohvatiObavijesti(): Observable<Obavijesti[]>{
    return this.http.get<Obavijesti[]>(`${this.api}/obavijesti/get`)
  }

  spremiObavijest(oba: Obavijesti): Observable<any> {
    return this.http.post(`${this.api}/obavijesti/spremi` ,oba , httpOptions);
  }
}