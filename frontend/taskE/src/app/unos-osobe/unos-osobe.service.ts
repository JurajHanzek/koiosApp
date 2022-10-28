import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Osoba } from '../osobe/osoba.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnosOsobeService {

  private api=environment.api;

  constructor(private http: HttpClient) { }

  public spremiOsoba(osoba: Osoba): Observable<Osoba>{
    return this.http.post<Osoba>(`${this.api}/spremi-osoba?authorId=123`,osoba)
  }

}