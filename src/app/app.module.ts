import { ServicioAgenteService } from './providers/servicio-agente.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCheckboxModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule,
  MatDividerModule,
  MatStepperModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatMenuModule,
  MatCardModule,
  MatTooltipModule,
  MatDatepickerModule,
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
  MatAutocompleteModule,
  MatExpansionModule,
  MatRadioModule
} from '@angular/material';
// import { ServiciosAgenteComponent } from './components/servicios-agente/servicios-agente.component';
import { SideNavComponent } from './components/shared/side-nav/side-nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DFormatPipe } from './pipes/d-format.pipe';
import { FormControl, ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { AntiguedadComponent } from './components/shared/dialog/antiguedad/antiguedad.component';
import { TokenInterceptor } from './providers/security/token-interceptor.service';
import { AuthServiceService } from './providers/security/auth-service.service';
import { AuthGuardService } from './providers/security/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { TestComponent } from './components/test/test.component';
import { BuscarAgenteComponent } from './components/shared/dialog/buscar-agente/buscar-agente.component';
import { ConexionErrorComponent } from './components/shared/dialog/conexion-error/conexion-error.component';
import { BuscarReparticionComponent } from './components/shared/dialog/buscar-reparticion/buscar-reparticion.component';
import { BuscarRolesComponent } from './components/shared/dialog/buscar-roles/buscar-roles.component';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmationDialogComponent } from './components/shared/dialog/confirmation-dialog/confirmation-dialog.component';
import { MessageDialogComponent } from './components/shared/dialog/message-dialog/message-dialog.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { PlazaDetailComponent } from './components/shared/dialog/plaza-detail/plaza-detail.component';
import { AgentesPlazaComponent } from './components/shared/dialog/agentes-plaza/agentes-plaza.component';
import { SearchCuiseComponent } from './components/shared/dialog/search-cuise/search-cuise.component';
import { UrlImagePipe } from './pipes/url-image.pipe';
import { UrlMessagePipe } from './pipes/url-message.pipe';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { RecoveryComponent } from './components/usuario-container/recovery/recovery.component';
import { UserComponent } from './components/usuario-container/usuario/user/user.component';
import { ListUsersComponent } from './components/usuario-container/list-users/list-users.component';
import { ChangePasswordComponent } from './components/usuario-container/usuario/change-password/change-password.component';
import { ServiciosAgenteComponent } from './components/servicio-agente/servicios-agente/servicios-agente.component';
import { SubServiciosAgenteComponent } from './components/servicio-agente/sub-servicios-agente/sub-servicios-agente.component';
import { BuscarServiciosAgenteComponent } from './components/servicio-agente/buscar-servicios-agente/buscar-servicios-agente.component';
import { LicenciaComponent } from './components/movimiento/concesion-licencia/licencia/licencia.component';
// tslint:disable-next-line:max-line-length
import { ServiciosConLicenciaComponent } from './components/movimiento/concesion-licencia/servicios-con-licencia/servicios-con-licencia.component';
// tslint:disable-next-line:max-line-length
import { ServiciosSinLicenciaComponent } from './components/movimiento/concesion-licencia/servicios-sin-licencia/servicios-sin-licencia.component';
// tslint:disable-next-line:max-line-length
import { RectificarLicenciaComponent } from './components/movimiento/concesion-licencia-rectificar/rectificar-licencia/rectificar-licencia.component';
// tslint:disable-next-line:max-line-length
import { ServiciosConLicenciaAbiertaComponent } from './components/movimiento/concesion-licencia-rectificar/servicios-con-licencia-abierta/servicios-con-licencia-abierta.component';
import { AltaServicioComponent } from './components/movimiento/alta-servicio/alta-servicio.component';
import { PlazaSelectComponent } from './components/shared/dialog/plaza-select/plaza-select.component';
import { AutocompleteComponent } from './components/shared/controls/autocomplete/autocomplete.component';
import { ServiciosActivosComponent } from './components/movimiento/alta-servicio/servicios-activos/servicios-activos.component';
import { BajaServicioComponent } from './components/movimiento/baja-servicio/baja-servicio.component';
import { ServiciosActivosBajaComponent } from './components/movimiento/baja-servicio/servicios-activos/servicios-activos-baja.component';
import { BajaServicioRectificarComponent } from './components/movimiento/baja-servicio-rectificar/baja-servicio-rectificar.component';
// tslint:disable-next-line:max-line-length
import { ServiciosInactivosComponent } from './components/movimiento/baja-servicio-rectificar/servicios-inactivos/servicios-inactivos.component';
import { UserCuiseComponent } from './components/shared/controls/user-cuise/user-cuise.component';
import { ViewerPdfComponent } from './components/shared/dialog/viewer-pdf/viewer-pdf.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { RecoveryPasswordComponent } from './components/usuario-container/recovery-password/recovery-password.component';
import { LiquidacionesComponent } from './components/liquidacion/liquidaciones/liquidaciones.component';
import { ListaLiquidacionesComponent } from './components/liquidacion/liquidaciones/lista-liquidaciones/lista-liquidaciones.component';
import { PeriodosLiquidacionComponent } from './components/liquidacion/periodos-liquidacion/periodos-liquidacion.component';
import { ListaPeriodosComponent } from './components/liquidacion/periodos-liquidacion/lista-periodos/lista-periodos.component';
import { ModelosLiquidacionComponent } from './components/liquidacion/modelos-liquidacion/modelos-liquidacion.component';
import { ListaModelosComponent } from './components/liquidacion/modelos-liquidacion/lista-modelos/lista-modelos.component';
import { LiquidarComponent } from './components/liquidacion/liquidar/liquidar.component';
import { HistorialLiquidacionesComponent } from './components/liquidacion/liquidar/historial-liquidaciones/historial-liquidaciones.component';
import { PersonasComponent } from './components/legajo/personas/personas.component';
import { ListadoPersonasComponent } from './components/legajo/personas/listado-personas/listado-personas.component';
import { AgentesComponent } from './components/legajo/agentes/agentes.component';
import { ListadoAgentesComponent } from './components/legajo/agentes/listado-agentes/listado-agentes.component';
import { MenuAgenteComponent } from './components/legajo/agentes/opciones/menu-agente/menu-agente.component';
import { AgenteComponent } from './components/legajo/agentes/opciones/agente/agente.component';
import { AfiliacionesComponent } from './components/legajo/agentes/opciones/afiliaciones/afiliaciones.component';
import { AntiguedadesComponent } from './components/legajo/agentes/opciones/antiguedades/antiguedades.component';
import { TitulosComponent } from './components/legajo/agentes/opciones/titulos/titulos.component';
import { FamiliaresACargoComponent } from './components/legajo/agentes/opciones/familiares-acargo/familiares-acargo.component';
import { PrenatalComponent } from './components/legajo/agentes/opciones/prenatal/prenatal.component';


// create our cost var with the information about the format that we want
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    ServiciosAgenteComponent,
    SideNavComponent,
    DFormatPipe,
    AntiguedadComponent,
    LoginComponent,
    SubServiciosAgenteComponent,
    LoadingComponent,
    TestComponent,
    BuscarServiciosAgenteComponent,
    RecoveryComponent,
    UserComponent,
    BuscarAgenteComponent,
    ConexionErrorComponent,
    BuscarReparticionComponent,
    BuscarRolesComponent,
    ListUsersComponent,
    ConfirmationDialogComponent,
    MessageDialogComponent,
    ChangePasswordComponent,
    LicenciaComponent,
    FooterComponent,
    PlazaDetailComponent,
    AgentesPlazaComponent,
    SearchCuiseComponent,
    UrlImagePipe,
    UrlMessagePipe,
    ServiciosConLicenciaComponent,
    ServiciosSinLicenciaComponent,
    RectificarLicenciaComponent,
    ServiciosConLicenciaAbiertaComponent,
    AltaServicioComponent,
    PlazaSelectComponent,
    AutocompleteComponent,
    ServiciosActivosComponent,
    BajaServicioComponent,
    ServiciosActivosBajaComponent,
    BajaServicioRectificarComponent,
    ServiciosInactivosComponent,
    UserCuiseComponent,
    ViewerPdfComponent,
    RecoveryPasswordComponent,
    LiquidacionesComponent,
    ListaLiquidacionesComponent,
    PeriodosLiquidacionComponent,
    ListaPeriodosComponent,
    ModelosLiquidacionComponent,
    ListaModelosComponent,
    LiquidarComponent,
    HistorialLiquidacionesComponent,
    PersonasComponent,
    ListadoPersonasComponent,
    AgentesComponent,
    ListadoAgentesComponent,
    MenuAgenteComponent,
    AgenteComponent,
    AfiliacionesComponent,
    AntiguedadesComponent,
    TitulosComponent,
    FamiliaresACargoComponent,
    PrenatalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCheckboxModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatDividerModule,
    MatStepperModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSelectModule,
    MatMenuModule,
    MatCardModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatExpansionModule,
    NgxExtendedPdfViewerModule,
    MatRadioModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS
    },
    {
      provide:  ErrorStateMatcher,
      useClass: ShowOnDirtyErrorStateMatcher
    },
    ServicioAgenteService,
    AuthServiceService,
    AuthGuardService
  ],
  entryComponents: [
    AntiguedadComponent,
    ServiciosAgenteComponent,
    BuscarAgenteComponent,
    ConexionErrorComponent,
    BuscarReparticionComponent,
    BuscarRolesComponent,
    ConfirmationDialogComponent,
    MessageDialogComponent,
    PlazaDetailComponent,
    AgentesPlazaComponent,
    SearchCuiseComponent,
    AutocompleteComponent,
    PlazaSelectComponent,
    ViewerPdfComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('en-GB'); // DD/MM/YYYY
  }
}
