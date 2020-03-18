import { RecoveryPasswordComponent } from "./components/usuario-container/recovery-password/recovery-password.component";
import { BajaServicioRectificarComponent } from "./components/movimiento/baja-servicio-rectificar/baja-servicio-rectificar.component";
import { BajaServicioComponent } from "./components/movimiento/baja-servicio/baja-servicio.component";
import { AltaServicioComponent } from "./components/movimiento/alta-servicio/alta-servicio.component";
import { LoginComponent } from "./components/login/login.component";
import { TestComponent } from "./components/test/test.component";
import { AppComponent } from "./app.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from "./providers/security/auth-guard.service";
import { RecoveryComponent } from "./components/usuario-container/recovery/recovery.component";
import { ListUsersComponent } from "./components/usuario-container/list-users/list-users.component";
import { UserComponent } from "./components/usuario-container/usuario/user/user.component";
import { ChangePasswordComponent } from "./components/usuario-container/usuario/change-password/change-password.component";
import { BuscarServiciosAgenteComponent } from "./components/servicio-agente/buscar-servicios-agente/buscar-servicios-agente.component";
import { LicenciaComponent } from "./components/movimiento/concesion-licencia/licencia/licencia.component";
// tslint:disable-next-line:max-line-length
import { RectificarLicenciaComponent } from "./components/movimiento/concesion-licencia-rectificar/rectificar-licencia/rectificar-licencia.component";
import { LiquidacionesComponent } from "./components/liquidacion/liquidaciones/liquidaciones.component";
import { PeriodosLiquidacionComponent } from "./components/liquidacion/periodos-liquidacion/periodos-liquidacion.component";
import { ModelosLiquidacionComponent } from "./components/liquidacion/modelos-liquidacion/modelos-liquidacion.component";
import { LiquidarComponent } from "./components/liquidacion/liquidar/liquidar.component";
import { PersonasComponent } from "./components/legajo/personas/personas.component";
import { AgentesComponent } from "./components/legajo/agentes/agentes.component";
import { AgenteComponent } from "./components/legajo/agentes/opciones/agente/agente.component";
import { AntiguedadesComponent } from "./components/legajo/agentes/opciones/antiguedades/antiguedades.component";
import { AfiliacionesComponent } from "./components/legajo/agentes/opciones/afiliaciones/afiliaciones.component";
import { TitulosComponent } from "./components/legajo/agentes/opciones/titulos/titulos.component";
import { FamiliaresACargoComponent } from "./components/legajo/agentes/opciones/familiares-acargo/familiares-acargo.component";
import { PrenatalComponent } from "./components/legajo/agentes/opciones/prenatal/prenatal.component";

const routes: Routes = [
  {
    path: "",
    component: BuscarServiciosAgenteComponent
  },
  {
    path: "test",
    component: TestComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "servicios",
    component: BuscarServiciosAgenteComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "recovery",
    component: RecoveryComponent
  },
  {
    path: "recoverypassword/:codigo",
    component: RecoveryPasswordComponent
  },
  {
    path: "listado/usuario",
    component: ListUsersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "usuario/add",
    component: UserComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "usuario/edit/:IdUser",
    component: UserComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "changepasword",
    component: ChangePasswordComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "movimientos/alta",
    component: AltaServicioComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "movimientos/licencia",
    component: LicenciaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "movimientos/rectificar/licencia",
    component: RectificarLicenciaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "movimientos/baja",
    component: BajaServicioComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "movimientos/rectificar/baja",
    component: BajaServicioRectificarComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "liquidacion/liquidaciones",
    component: LiquidacionesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "liquidacion/periodos",
    component: PeriodosLiquidacionComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "liquidacion/modelos",
    component: ModelosLiquidacionComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "liquidacion/liquidar",
    component: LiquidarComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "legajo/personas",
    component: PersonasComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "legajo/agentes",
    component: AgentesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "legajo/agentes/agente",
    component: AgenteComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "legajo/agentes/afiliaciones",
    component: AfiliacionesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "legajo/agentes/antiguedades",
    component: AntiguedadesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "legajo/agentes/titulos",
    component: TitulosComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "legajo/agentes/familiaresAcargo",
    component: FamiliaresACargoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "legajo/agentes/prenatal",
    component: PrenatalComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "**",
    component: BuscarServiciosAgenteComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: "enabled"
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
