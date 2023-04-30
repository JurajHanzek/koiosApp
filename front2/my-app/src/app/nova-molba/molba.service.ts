import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Molba } from './molba.model';
import { Komentar } from './komentar.model';
import { User } from '../user.model';
import { Predmet } from '../novi-upis/predmet.model';


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
  public dohvatiMolbeUsera(id:number): Observable<Molba[]>{
    return this.http.get<Molba[]>(`${this.api}/molba/get/${id}`)
  }
  public dohvatiMolbe(): Observable<Molba[]>{
    return this.http.get<Molba[]>(`${this.api}/molba/get`)
  }
  public dohvatiMolbaId(id:number): Observable<Molba>{
    return this.http.get<Molba>(`${this.api}/molba/get-id/${id}`)
  }
  public dohvatiKomentare(id:number): Observable<Komentar[]>{
    return this.http.get<Komentar[]>(`${this.api}/molba/get-komentari/${id}`)
  }
  public dohvatiUsera(id:number): Observable<User>{
    return this.http.get<User>(`${this.api}/molba/get-user/${id}`)
  }
  setStatus(oba: Molba): Observable<any> {
    return this.http.post(`${this.api}/molba/update` ,oba , httpOptions);
  }
  public dohvatiPredmeteUsera(id:number): Observable<Predmet[]>{
    return this.http.get<Predmet[]>(`${this.api}/upis/predmeti/user/${id}`)
  }
}


