import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Predmet } from './predmet.model';
import { Upis } from './upis.model';
import { Kljucevi } from '../postavke/kljucevi.model';
import { Potpis } from '../pregled-upisa/potpis.model';


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
  public dohvatiUpise(): Observable<Upis[]>{
    return this.http.get<Upis[]>(`${this.api}/upis/get`)
  }

  spremiUpis(oba: Predmet[]): Observable<any> {
    return this.http.post(`${this.api}/upis/spremi` ,oba , httpOptions);
  }

  validiraj(oba: Upis): Observable<any> {
    return this.http.post(`${this.api}/upis/validiraj` ,oba , httpOptions);
  }

  setStatus(oba: Upis): Observable<any> {
    return this.http.post(`${this.api}/upis/update` ,oba , httpOptions);
  }
  public generirajKljuc(id:string): Observable<Kljucevi>{
    return this.http.get<Kljucevi>(`${this.api}/upis/kljuc/${id}`);
  }

  potpisi(oba: Potpis): Observable<any> {
    return this.http.post(`${this.api}/upis/potpisi` ,oba , httpOptions);
  }
}