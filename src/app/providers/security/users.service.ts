import { Usuario } from './../../class/usuario';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constantes } from 'src/app/util/Constantes';;
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  nuevo(usuario: Usuario): Observable<any> {
    const contentHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(Constantes.URL_MAIN + '/usuario/nuevo',
      usuario,
      { headers: contentHeaders });
  }

  actualizar(usuario: Usuario): Observable<any> {
    const contentHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<any>(Constantes.URL_MAIN + '/usuario/actualizar',
      usuario,
      { headers: contentHeaders });
  }

  getAll(idCurrentUser: number): Observable<any> {
    return this.http.get(`${Constantes.URL_MAIN}/usuario/allUser/CurrentUser/${idCurrentUser}`);
  }

  getUser(idUsuario: number, idCurrentUser: number): Observable<any> {
    return this.http.get(`${Constantes.URL_MAIN}/usuario/getUser/${idUsuario}/CurrentUser/${idCurrentUser}`);
  }

  getUserSuborganizacion(Nombre: string, Cuise: number, idCurrentUser: number): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${Constantes.URL_MAIN}/usuario/suborganizaciones/usuario/${idCurrentUser}/cuise/${Cuise}/nombre/${Nombre}`);
  }

  bloquear(idUsuario: number, idUsuarioActual: number): Observable<any> {
    const params = JSON.stringify({idUser: idUsuario, idCurrentUser: idUsuarioActual});
    const contentHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<any>(Constantes.URL_MAIN + '/usuario/bloquear',
      params,
      { headers: contentHeaders });
  }

  desbloquear(idUsuario: number, idUsuarioActual: number): Observable<any> {
    const params = JSON.stringify({idUser: idUsuario, idCurrentUser: idUsuarioActual});
    const contentHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<any>(Constantes.URL_MAIN + '/usuario/desbloquear',
      params,
      { headers: contentHeaders });
  }

  cambiarPasswordByUsuario(newPassword: string, IdUser: number): Observable<any> {
    const params = JSON.stringify({password: newPassword, idUsuario: IdUser});
    const contentHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<any>(Constantes.URL_MAIN + '/usuario/password/change',
      params,
      { headers: contentHeaders });
  }

  cambiarPasswordByCode(newPassword: string, codigo: string): Observable<any> {
    const params = JSON.stringify({password: newPassword, activationCode: codigo});
    const contentHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<any>(Constantes.URL_MAIN + '/usuario/password/change/code',
      params,
      { headers: contentHeaders });
  }

  validCodeRecovery(codigo: any): Observable<any> {
    return this.http.get(`${Constantes.URL_MAIN}/usuario/recovery/check?activationCode=${codigo}`);
  }

  cambiarPasswordByCodeRecovery(newPassword: string, code: string): Observable<any> {
    const params = JSON.stringify({password: newPassword, activationCode: code});
    const contentHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<any>(Constantes.URL_MAIN + '/usuario/password/change/code',
      params,
      { headers: contentHeaders });
  }
}
