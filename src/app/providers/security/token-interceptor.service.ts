import { ConexionErrorComponent } from './../../components/shared/dialog/conexion-error/conexion-error.component';
import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/do';
import { AuthServiceService } from './auth-service.service';
import { Observable } from 'rxjs-compat/Observable';
import { MatDialog } from '@angular/material';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private authServiceService: AuthServiceService;

  constructor(private injector: Injector, public dialog: MatDialog) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authServiceService = this.injector.get(AuthServiceService);
    request = request.clone({
      setHeaders: {
        Authorization: `${this.authServiceService.getToken() == null ? '' : this.authServiceService.getToken()}`
      }
    });

    console.log('token desde el interceptor ' + this.authServiceService.getToken());
    // this.openDialog();
    return next.handle(request).do((event: HttpEvent<any>) => {

      if (event instanceof HttpResponse) {
        // process successful responses here
        console.log('interceptor OK');
        console.log(event);
      }

    }, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        if ((error.status === 401)) {
          this.authServiceService.logout();
          console.log('interceptor logout' + error.status);
        }
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConexionErrorComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
