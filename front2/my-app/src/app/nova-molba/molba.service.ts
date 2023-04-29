import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Molba } from './molba.model';
import { Komentar } from './komentar.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MolbaService {

  private api=environment.api;

  constructor(private http: HttpClient) { }

  spremiMolbu(oba: Molba): Observable<any> {
    return this.http.post(`${this.api}/molba/spremi` ,oba , httpOptions);
  }

  spremiKomentar(oba: Komentar): Observable<any> {
    return this.http.post(`${this.api}/molba/spremi-komentar` ,oba , httpOptions);
  }
}