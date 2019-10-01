import { ServicioAgente } from 'src/app/interfaces/servicio-agente';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constantes } from '../util/Constantes';
import { Observable } from 'rxjs/Observable';
import { MovimientoLicencia } from '../class/movimiento/licencia/movimiento-licencia';
import { MovimientoAlta } from '../class/movimiento/alta/movimiento-alta';

@Injectable({
  providedIn: 'root'
})
export class ServicioAgenteService {

  constructor(private http: HttpClient) { }

  //
  //  Obtento todos los servicios activos/inactivos del agente
  //
  getAll(documento: number, cuise: number, activos, usuario: number): Observable<any> {
    console.log('getAll');
    console.log(cuise);
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${Constantes.URL_MAIN}/servicio/documento/${documento}/organizacion/${cuise}/activos/${activos}/usuario/${usuario}`);
  }

  //
  //  Obtento el total de puntos del agente
  //
  getAgentePuntos(documento: number): Observable<any> {
    return this.http.get(`${Constantes.URL_MAIN}/agente/puntos/documento/${documento}`);
  }

  //
  //  Obtento la antiguedad del agente
  //
  getAgenteAntiguedad(documento: number): Observable<any> {
    return this.http.get(`${Constantes.URL_MAIN}/agente/antiguedad/documento/${documento}`);
  }

  //
  //  Obtento los subservicios de un servicio
  //
  getSubservicios(servicio: number): Observable<any> {
    return this.http.get(`${Constantes.URL_MAIN}/servicio/SubServicio/Servicio/${servicio}`);
  }

  //
  //  Obtengo subservicios de un servicio para otorgar una licencias
  //
  getSubserviciosLicenciar(documento: number, organizacion: number, fecha: string, currentUser: number): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${Constantes.URL_MAIN}/servicio/licenciar/documento/${documento}/organizacion/${organizacion}/fecha/${fecha}/usuario/${currentUser}`);
  }

  //
  //  Obtengo las licencias a rectificar
  //
  getSubserviciosLicenciaRectificar(documento: number, organizacion: number, fecha: string, currentUser: number): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${Constantes.URL_MAIN}/servicio/licenciar/rectificar/documento/${documento}/organizacion/${organizacion}/fecha/${fecha}/usuario/${currentUser}`);
  }

  //
  //  Chequea la concesion de la licencia
  //
  postChequearLicencia(movimientoLicencia: MovimientoLicencia): Observable<any> {
    const contentHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(Constantes.URL_MAIN + '/servicio/licenciar/chequeo',
      movimientoLicencia,
      { headers: contentHeaders });
  }

  //
  //  Ejecuta la concesion de la licencia
  //
  postEjecutarLicencia(licencias: any): Observable<any> {
    const contentHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(Constantes.URL_MAIN + '/servicio/licenciar/ejecutar',
      licencias,
      { headers: contentHeaders });
  }

  //
  //  Chequea la rectificacion de la licencia
  //
  postChequearRectificarLicencia(movimientoLicencia: MovimientoLicencia): Observable<any> {
    const contentHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(Constantes.URL_MAIN + '/servicio/licenciar/rectificar/chequeo',
      movimientoLicencia,
      { headers: contentHeaders });
  }


  //
  //  Ejecuta la rectificacion de la licencia
  //
  postEjecutarRectificarLicencia(licencias: any): Observable<any> {
    const contentHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(Constantes.URL_MAIN + '/servicio/licenciar/rectificar/ejecutar',
      licencias,
      { headers: contentHeaders });
  }


  //
  //  Chequea alta de servicio
  //
  postChequearAlta(movimientoAlta: MovimientoAlta): Observable<any> {
    const contentHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(Constantes.URL_MAIN + '/servicio/alta/chequeo',
    movimientoAlta,
      { headers: contentHeaders });
  }

   //
  //  Ejecuta la rectificacion de la licencia
  //
  postEjecutarAlta(altas: any): Observable<any> {
    const contentHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(Constantes.URL_MAIN + '/servicio/alta/ejecutar',
    altas,
      { headers: contentHeaders });
  }
}
