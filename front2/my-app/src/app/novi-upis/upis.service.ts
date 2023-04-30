import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Predmet } from './predmet.model';
import { Upis } from './upis.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UpisService {

  private api=environment.api;

  constructor(private http: HttpClient) { }

  public dohvatiPredmete(): Observable<Predmet[]>{
    return this.http.get<Predmet[]>(`${this.api}/upis/predmeti`)
  }

  public dohvatiUpis(id:number): Observable<Upis>{
    return this.http.get<Upis>(`${this.api}/upis/student/${id}`)
  }

  spremiUpis(oba: Predmet[]): Observable<any> {
    return this.http.post(`${this.api}/upis/spremi` ,oba , httpOptions);
  }
}