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
  MatAutocompleteModule
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
    ServiciosActivosComponent
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
    MatAutocompleteModule
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
    PlazaSelectComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('en-GB'); // DD/MM/YYYY
  }
}
