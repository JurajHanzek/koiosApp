import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Osoba } from '../osobe/osoba.model';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UnosOsobeService {

  private api=environment.api;

  constructor(private http: HttpClient) { }

  // spremiOsoba(osoba: Osoba): Observable<Osoba>{
  //   return this.http.post<Osoba>(`${this.api}/unos/spremi-osoba`,osoba)
  // }

  spremiOsoba(osoba: Osoba): Observable<any> {
    return this.http.post(`${this.api}/unos/spremi-osoba` ,osoba , httpOptions);
  }

  azurirajOsoba(osoba: Osoba): Observable<any> {
    return this.http.put(`${this.api}/unos/azuriraj-osoba` ,osoba , httpOptions);
  }
}