import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Constantes } from '../util/Constantes';

@Injectable({
  providedIn: 'root'
})
export class AgenteService {

  constructor(private http: HttpClient) { }

  getAll(Busqueda: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${Constantes.URL_MAIN}/agente/nombres/${Busqueda}`);
  }
}
