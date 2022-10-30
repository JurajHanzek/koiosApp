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
export class OsobeService {

  private api=environment.api;

  constructor(private http: HttpClient) { }

  public dohvatiSveOsobe(): Observable<Osoba[]>{
    return this.http.get<Osoba[]>(`${this.api}/osobe/dohvati`)
  }
  public dohvatiPoId(id: number): Observable<Osoba>{
    return this.http.get<Osoba>(`${this.api}/osobe/dohvati/osobu/${id}`)
  }
  public delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.api}/osobe/izbrisi-osoba/${id}`)
  }
}