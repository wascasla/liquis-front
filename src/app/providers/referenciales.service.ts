import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Constantes } from '../util/Constantes';

@Injectable({
  providedIn: 'root'
})
export class ReferencialesService {

  constructor(private http: HttpClient) { }

  getReparticionAll(Busqueda: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${Constantes.URL_MAIN}/referenciales/reparticiones/${Busqueda}`);
  }

  getRolAll(Busqueda: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${Constantes.URL_MAIN}/referenciales/rol/${Busqueda}`);
  }

  getSubOrganizacionAll(Busqueda: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${Constantes.URL_MAIN}/referenciales/rol/${Busqueda}`);
  }

  getLicenciaAll(): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${Constantes.URL_MAIN}/referenciales/licencia`);
  }

  getEnfermedadAll(): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${Constantes.URL_MAIN}/referenciales/enfermedades`);
  }

  getAutocompletarSelectPlaza(CUISE: number): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${Constantes.URL_MAIN}/referenciales/autocompletar/buscador/plaza/${CUISE}`);
  }

  getSituacionRevistaCargo(cargo: number): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${Constantes.URL_MAIN}/referenciales/situacionrevista/cargo/${cargo}`);
  }

  getCausasBaja(): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${Constantes.URL_MAIN}/referenciales/causas/bajas`);
  }

  getCausasAlta(): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${Constantes.URL_MAIN}/referenciales/causas/altas`);
  }

  getEdificiosSubOrganizacion(suborganizacion: number): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${Constantes.URL_MAIN}/referenciales/suborganizacion/${suborganizacion}/edificio`);
  }

  GetZonaEdificio(edificio: number): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${Constantes.URL_MAIN}/referenciales/edificio/zona/${edificio}`);
  }

  GetEdificioTitularInterino(IdPlaza: number): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${Constantes.URL_MAIN}/referenciales/plaza/agente/${IdPlaza}/edificio`);
  }

  GetAgrupamiento(IdCargoSalarial: number): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${Constantes.URL_MAIN}/referenciales/plaza/agrupamiento/${IdCargoSalarial}`);
  }
}
