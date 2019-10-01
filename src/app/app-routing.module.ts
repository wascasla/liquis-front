import { AltaServicioComponent } from './components/movimiento/alta-servicio/alta-servicio.component';
import { LoginComponent } from './components/login/login.component';
import { TestComponent } from './components/test/test.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './providers/security/auth-guard.service';
import { RecoveryComponent } from './components/usuario-container/recovery/recovery.component';
import { ListUsersComponent } from './components/usuario-container/list-users/list-users.component';
import { UserComponent } from './components/usuario-container/usuario/user/user.component';
import { ChangePasswordComponent } from './components/usuario-container/usuario/change-password/change-password.component';
import { BuscarServiciosAgenteComponent } from './components/servicio-agente/buscar-servicios-agente/buscar-servicios-agente.component';
import { LicenciaComponent } from './components/movimiento/concesion-licencia/licencia/licencia.component';
// tslint:disable-next-line:max-line-length
import { RectificarLicenciaComponent } from './components/movimiento/concesion-licencia-rectificar/rectificar-licencia/rectificar-licencia.component';

const routes: Routes = [{
  path: '',
  component: BuscarServiciosAgenteComponent
},
{
  path: 'test',
  component: TestComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'servicios',
  component: BuscarServiciosAgenteComponent,
  canActivate: [AuthGuardService]
},
{
  path: 'recovery',
  component: RecoveryComponent
},
{
  path: 'listado/usuario',
  component: ListUsersComponent,
  canActivate: [AuthGuardService]
},
{
  path: 'usuario/add',
  component: UserComponent,
  canActivate: [AuthGuardService]
},
{
  path: 'usuario/edit/:IdUser',
  component: UserComponent,
  canActivate: [AuthGuardService]
},
{
  path: 'changepasword',
  component: ChangePasswordComponent,
  canActivate: [AuthGuardService]
},
{
  path: 'movimientos/alta',
  component: AltaServicioComponent,
  canActivate: [AuthGuardService]
},
{
  path: 'movimientos/licencia',
  component: LicenciaComponent,
  canActivate: [AuthGuardService]
},
{
  path: 'movimientos/rectificar/licencia',
  component: RectificarLicenciaComponent,
  canActivate: [AuthGuardService]
},
{
  path: '**',
  component: BuscarServiciosAgenteComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
