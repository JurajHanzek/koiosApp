import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Naslovna } from './naslovna.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NaslovnaService {

  private api=environment.api;

  constructor(private http: HttpClient) { }

  public dohvatiNaslovnu(): Observable<Naslovna[]>{
    return this.http.get<Naslovna[]>(`${this.api}/naslovna/get`)
  }
}