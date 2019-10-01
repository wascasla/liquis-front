import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constantes } from '../util/Constantes';
import { Observable } from 'rxjs/Observable';
import { Parser } from '../util/parser';

@Injectable({
  providedIn: 'root'
})
export class PlazaService {

  constructor(private http: HttpClient) { }

  getHistorialPlaza(plaza: number): Observable<any> {
    return this.http.get(`${Constantes.URL_MAIN}/plaza/${plaza}/historial`);
  }

  getDetallePlaza(plaza: number): Observable<any> {
    return this.http.get(`${Constantes.URL_MAIN}/plaza/${plaza}/detalle`);
  }

  // tslint:disable-next-line:max-line-length
  getSearchPlaza(cuise: number, suborganizacion: string, cargo: string, planestudio: string, espaciocurricular: string, fecha: string, nivel: string, anio: string): Observable<any> {
    const path = `${Constantes.URL_MAIN}/plaza/search/${cuise}`;
    let parametros = path;
    parametros += Parser.getParameterFormat(parametros, 'cargo', cargo);
    parametros += Parser.getParameterFormat(parametros, 'planestudio', planestudio);
    parametros += Parser.getParameterFormat(parametros, 'suborganizacion', suborganizacion);
    parametros += Parser.getParameterFormat(parametros, 'planestudio', planestudio);
    parametros += Parser.getParameterFormat(parametros, 'espaciocurricular', espaciocurricular);
    parametros += Parser.getParameterFormat(parametros, 'fecha', fecha);
    parametros += Parser.getParameterFormat(parametros, 'nivel', nivel);
    parametros += Parser.getParameterFormat(parametros, 'anio', anio);

    console.log(parametros);
    // tslint:disable-next-line:max-line-length
    return this.http.get(parametros);
  }
}
