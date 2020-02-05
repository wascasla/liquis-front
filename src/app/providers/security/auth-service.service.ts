import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Constantes } from 'src/app/util/Constantes';
import { Observable } from 'rxjs/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from 'src/app/class/usuario';
import { keyframes } from '@angular/animations';
import { Router } from '@angular/router';


@Injectable()
export class AuthServiceService {
  public token: string;
  public currentUser: any;
  private loginPath = '/login/authenticate';
  private recoveryPath = '/usuario/recovery';
  private helper = new JwtHelperService();

  constructor(private router: Router, private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const params = JSON.stringify({
      Username: username,
      Password: password
    });

    const contentHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(Constantes.URL_MAIN + this.loginPath, params, { headers: contentHeaders });
  }

  recovery(mail: string): Observable<any> {
    const params = JSON.stringify({
      email: mail
    });
    const contentHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(Constantes.URL_MAIN + this.recoveryPath,
      params,
      { headers: contentHeaders });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem(Constantes.LOGIN_TOKEN);
    localStorage.removeItem(Constantes.LOGIN_USER);
    this.router.navigate(['/login']);
  }

  public getToken(): string {
    return localStorage.getItem(Constantes.LOGIN_TOKEN);
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting
    // whether or not the token is expired
    // console.log('-------------------');
    // console.log(this.helper.decodeToken(token));
    // console.log(this.helper.getTokenExpirationDate(token));
    // console.log(this.helper.isTokenExpired(token));
    return token !== null && !this.helper.isTokenExpired(token);
  }

  getConcurrentUser(): any {
    const usuario = JSON.parse(localStorage.getItem(Constantes.LOGIN_USER));
    return usuario;
  }

  getIdConcurrentUser(): any {
    const usuario = JSON.parse(localStorage.getItem(Constantes.LOGIN_USER));
    if (usuario) {
      return usuario.user.idUsuario;
    }
    this.router.navigate(['/login']);
    return null;
  }

  getEcho(): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get('http://rrhh.catamarca.edu.ar/SageNetApiDefault/api/login/echoping');
  }
}


interface UserResponse {
  token: string;
}
