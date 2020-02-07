import { Constantes } from 'src/app/util/Constantes';
import { ReferencialesService } from 'src/app/providers/referenciales.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormGroupDirective } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/util/error-matcher ';
import { Parser } from 'src/app/util/parser';
import { MatDialog, MatDatepickerInputEvent } from '@angular/material';
import { ServicioAgenteService } from 'src/app/providers/servicio-agente.service';
import { MovimientoLicencia } from 'src/app/class/movimiento/licencia/movimiento-licencia';
import { CamposLicencia } from 'src/app/class/movimiento/licencia/campos-licencia';
import { AuthServiceService } from 'src/app/providers/security/auth-service.service';
import { BuscarAgenteComponent } from 'src/app/components/shared/dialog/buscar-agente/buscar-agente.component';
import { SearchCuiseComponent } from 'src/app/components/shared/dialog/search-cuise/search-cuise.component';
import { ConfirmationDialogComponent } from 'src/app/components/shared/dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-rectificar-licencia',
  templateUrl: './rectificar-licencia.component.html',
  styleUrls: ['./rectificar-licencia.component.css']
})
export class RectificarLicenciaComponent implements OnInit {

  AgenteForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  LicenciaForm: FormGroup;

  // Gestion de Errores y mensajes
  statusError = false;
  mensaggeError: string;
  mensaggeChequeo: string;
  mensaggeEjecucion: string;
  statusErrorSS = false;
  statusErrorSubServicios = false;

  // Mostrar Nombre del agente
  showTitle = false;

  // Mostrar Loading
  loading = false;

  // listado
  dsServiciosConLicencia = [];
  dsLicencias = [];
  dsEnfermedades = [];

  // Objeto movimiento
  movimientoLicencia: MovimientoLicencia;

  // contenedor de campos del formulario
  camposLicencia: CamposLicencia;

  showInfo = false;
  diasLicencia: number;

  disableEjecutar = true;

  ejecutarLicencia: any;

  constructor(public dialog: MatDialog, private sServicios: ServicioAgenteService, private authService: AuthServiceService,
              private sReferenciales: ReferencialesService, private formBuilder: FormBuilder, private renderer: Renderer2) { }

  ngOnInit() {
    this.movimientoLicencia = new MovimientoLicencia();
    this.camposLicencia = new CamposLicencia();
    this.createSearchFormGroup();
    this.createLicenciaFormGroup();
    this.enabledSearchFormGroup();
    this.disabledLicenciaFormGroup();
  }

  createLicenciaFormGroup() {
    this.LicenciaForm = this.formBuilder.group({
      fechaInicio: new FormControl({ value: '', disabled: true }, []),
      fechaPresentacion: new FormControl({ value: '', disabled: true }, []),
      licencia: new FormControl({ value: '', disabled: true }, []),
      horas: new FormControl({ value: '', disabled: true }, []),
      enfermedad: new FormControl({ value: '', disabled: true }, []),
      NroCertificado: new FormControl({ value: '', disabled: true }, []),
      fechaFin: new FormControl(false),
      checkFechaFin: new FormControl({ value: '', disabled: true }, null),
      Observaciones: new FormControl({ value: '', disabled: true }, []),
      checkBorrar: new FormControl({ value: '', disabled: true }, null)
    });
  }

  enabledLicenciaFormGroup() {
    // setear los validadores
    this.LicenciaForm.get('fechaInicio').setValidators([Validators.required]);
    this.LicenciaForm.get('licencia').setValidators([Validators.required]);
    this.LicenciaForm.get('enfermedad').setValidators([Validators.required]);
    this.LicenciaForm.get('NroCertificado').setValidators([Validators.pattern('[0-9]*')]);

    // habilitar campos de edicion
    this.LicenciaForm.get('fechaInicio').enable();
    this.LicenciaForm.get('licencia').enable();
    this.LicenciaForm.get('enfermedad').enable();
    this.LicenciaForm.get('NroCertificado').enable();
    this.LicenciaForm.get('checkFechaFin').enable();
    this.LicenciaForm.get('checkFechaFin').enable();
    this.LicenciaForm.get('checkBorrar').enable();

    // actualizar los validadores
    this.LicenciaForm.updateValueAndValidity();
  }

  enabledHorasLicenciaFormGroup() {
    this.LicenciaForm.get('horas').setValidators([Validators.required, Validators.pattern('[0-9]*')]);
    this.LicenciaForm.get('horas').updateValueAndValidity();
    this.LicenciaForm.get('horas').enable();
    this.showInfo = true;
  }

  disabledHorasLicenciaFormGroup() {
    this.LicenciaForm.get('horas').setValue('');
    this.LicenciaForm.get('horas').disable();
    this.LicenciaForm.get('horas').setValidators(null);
    this.showInfo = false;
  }

  enabledFechaFinLicenciaFormGroup() {
    this.LicenciaForm.get('fechaFin').setValidators([Validators.required]);
    this.LicenciaForm.get('fechaFin').updateValueAndValidity();
    this.LicenciaForm.get('fechaFin').enable();
  }

  disabledFechaFinLicenciaFormGroup() {
    this.LicenciaForm.get('fechaFin').setValue(false);
    this.LicenciaForm.get('fechaFin').disable();
    this.LicenciaForm.get('fechaFin').setValidators(null);
  }

  onLicenciaSelect(event) {
    if ((event.value === Constantes.PARO) || (event.value === Constantes.INJUSTIFICADA)) {
      this.enabledHorasLicenciaFormGroup();
    } else {
      this.disabledHorasLicenciaFormGroup();
    }
  }

  onFinLicenciaCheck(event) {
    console.log(event);
    if (event.checked) {
      this.enabledFechaFinLicenciaFormGroup();
    } else {
      this.disabledFechaFinLicenciaFormGroup();
    }
  }

  cleanFechaFinCheck() {
    this.camposLicencia.isFechaFin = false;
  }

  disabledLicenciaFormGroup() {
    // setear los validadores
    this.LicenciaForm.get('fechaInicio').disable();
    this.LicenciaForm.get('licencia').disable();
    this.LicenciaForm.get('enfermedad').disable();
    this.LicenciaForm.get('NroCertificado').disable();
    this.LicenciaForm.get('fechaFin').disable();
    this.LicenciaForm.get('Observaciones').disable();
    this.LicenciaForm.get('checkFechaFin').disable();
    this.LicenciaForm.get('checkBorrar').disable();
    if (this.disableEjecutar) {
      this.cleanFechaFinCheck();
    }
  }

  disabledSearchFormGroup() {
    // setear los validadores
    this.AgenteForm.get('documento').disable();
    this.AgenteForm.get('cuise').disable();
    this.AgenteForm.get('fecha').disable();
  }

  enabledSearchFormGroup() {
    // setear los validadores
    this.AgenteForm.get('documento').enable();
    this.AgenteForm.get('cuise').enable();
    this.AgenteForm.get('fecha').enable();
  }

  createSearchFormGroup() {
    this.AgenteForm = this.formBuilder.group({
      documento: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*'),
      ]),
      cuise: new FormControl('', [
        Validators.pattern('[0-9]*'),
      ]),
      fecha: new FormControl('', [
        Validators.required,
      ])
    });
  }

  openAgenteDialog() {
    const dialogAgenteRef = this.dialog.open(BuscarAgenteComponent, {
      width: '750px',
      data: false
    });

    dialogAgenteRef.afterClosed().subscribe(result => {
      if (result > 0) {
        this.camposLicencia.Documento = result;
      }
    });
    return false;
  }

  openCUISEDialog() {
    const dialogAgenteRef = this.dialog.open(SearchCuiseComponent, {
      width: '850px',
      data: false
    });

    dialogAgenteRef.afterClosed().subscribe(result => {
      if (result > 0) {
        this.camposLicencia.CUISE = result;
      }
    });
    return false;
  }

  private inicializarBusqueda() {
    this.loading = true;
    this.statusError = false;
    this.statusErrorSS = false;
    this.showTitle = false;
    this.cleanFechaFinCheck();
  }

  private resetEdicion(formDirective: FormGroupDirective) {
    this.LicenciaForm.reset();
    formDirective.resetForm();
    this.inicializarEdicion();
  }

  private resetSelect(formDirective: FormGroupDirective) {
    this.disableEjecutar = true;
    this.diasLicencia = -1;
    this.camposLicencia.isFechaFin = false;
    this.disabledLicenciaFormGroup();
    this.disabledCamposOpcionales();
    this.LicenciaForm.reset();
    formDirective.resetForm();
  }

  private inicializarEdicion() {
    this.movimientoLicencia = new MovimientoLicencia();
    this.mostrarTitulo();
    this.completarCombos();
    this.disabledSearchFormGroup();
    this.enabledLicenciaFormGroup();
    // Seteo la fecha de inicio y de presentacion
    this.camposLicencia.FechaInicio = this.camposLicencia.Fecha;
    this.camposLicencia.FechaPresentacion = this.camposLicencia.Fecha;
    this.disableEjecutar = true;
  }

  private completarCombos() {
    // cargar el combo de licencias
    this.cargarLicencias();
    // cargar el combo de enfermedades
    this.cargarEnfermedades();
  }

  private cargarLicencias() {
    this.loading = true;
    this.sReferenciales.getLicenciaAll().subscribe(data => {
      // Assign the data to the data source for the table to render
      this.dsLicencias = data;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.dsLicencias = [];
    });
  }

  private cargarEnfermedades() {
    this.loading = true;
    this.sReferenciales.getEnfermedadAll().subscribe(data => {
      // Assign the data to the data source for the table to render
      this.dsEnfermedades = data;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.dsEnfermedades = [];
    });
  }

  private mostrarTitulo() {
    this.showTitle = true;
  }

  selectionDataSource(IdServicioAgente: number, isSelect: boolean) {
    this.dsServiciosConLicencia.forEach((item, index) => {
      if (item.IdServicioAgente === IdServicioAgente) {
        this.dsServiciosConLicencia[index].isSelect = isSelect;
        this.cargarServiciosSelect(item);
      }
    });
  }

  cargarServiciosSelect(value: any) {
    this.enabledLicenciaFormGroup();
    this.camposLicencia.FechaInicio = value.FechaAlta;
    this.camposLicencia.FechaPresentacion = value.FechaPresentacion;
    this.camposLicencia.Licencia = value.IdLicencia;
    this.camposLicencia.Enfermedad = value.IdEnfermedad;
    this.camposLicencia.CantidadHoras = value.Horas;
    this.camposLicencia.NroCertificado = value.NroCertificado;
    this.camposLicencia.FechaFin = '';
    this.camposLicencia.isFechaFin = false;
    if (value.FechaBaja) {
      this.camposLicencia.FechaFin = value.FechaBaja;
      this.camposLicencia.isFechaFin = true;
      this.enabledFechaFinLicenciaFormGroup();
    } else {
      this.disabledFechaFinLicenciaFormGroup();
    }
    this.camposLicencia.Observaciones = value.Observaciones;
  }

  ServicioSelect(value: any, formDirective: FormGroupDirective) {

    if (value.isSelect) {
      if (this.camposLicencia.CUISE) {
        this.movimientoLicencia.Organizacion = value.IdOrganizacion;
      }
      // Deselecciona todos los servicios con licencia
      this.movimientoLicencia.SubServicios.forEach((item, index) => {
        this.movimientoLicencia.SubServicios.splice(index, 1);
        this.selectionDataSource(item.IdServicioAgente, false);
      });
      // Quita el servicio seleccionado al movimiento
      this.movimientoLicencia.SubServicios.push(value);
      // Selecciona un solo servicio con licencia
      this.selectionDataSource(value.IdServicioAgente, true);
    } else {
      // Quita el servicio deseleccionado del movimiento
      this.movimientoLicencia.SubServicios.forEach((item, index) => {
        if (item.IdServicioAgente === value.IdServicioAgente) {
          this.movimientoLicencia.SubServicios.splice(index, 1);
          this.selectionDataSource(value.IdServicioAgente, false);
        }
      });
      this.resetSelect(formDirective);
    }
  }

  buscarServicios(formDirective: FormGroupDirective) {
    this.inicializarBusqueda();
    // Buscar el agente ingresado
    this.sServicios.getAgentePuntos(this.camposLicencia.Documento).subscribe(agente => {

      // Seteo los campos del agente
      this.camposLicencia.IdAgente = agente.ID;
      this.movimientoLicencia.idAgente = agente.ID;
      this.camposLicencia.Nombres = agente.ApellidosYNombres;
      this.camposLicencia.Documento = agente.Documento;

      // Obtener todos los servicios con licencias activas y sin licencia
      this.sServicios.getSubserviciosLicenciaRectificar(
        this.camposLicencia.Documento,
        this.camposLicencia.CUISE ? this.camposLicencia.CUISE : -1,
        this.camposLicencia.getFormatFecha(),
        this.authService.getIdConcurrentUser()).subscribe(data => {
          // Assign the data to the data source for the table to render
          this.dsServiciosConLicencia = Parser.arrayDate(data);
          this.loading = false;
          this.resetEdicion(formDirective);
        }, error => {
          this.dsServiciosConLicencia = [];
          this.loading = false;
          this.mostrarTitulo();
          console.log(error);
          this.disabledSearchFormGroup();
        });
    }, error => {
      if (error.status === 404) {
        this.mensaggeError = Parser.parseStyleMessageAlert('El agente en cuestión no existe en la base de datos');
      } else {
        this.mensaggeError = Parser.parseStyleMessageError('Ocurrio un error al buscar el agente');
      }
      console.log(status);
      console.log(error);
      this.statusError = true;
      this.loading = false;
    });
  }

  disabledCamposOpcionales() {
    this.disabledFechaFinLicenciaFormGroup();
    this.disabledHorasLicenciaFormGroup();
  }

  nuevo(formDirective: FormGroupDirective) {
    this.disableEjecutar = true;
    this.enabledSearchFormGroup();
    this.disabledLicenciaFormGroup();
    this.camposLicencia = new CamposLicencia();
    this.dsServiciosConLicencia = [];
    this.inicializarBusqueda();
    this.disabledCamposOpcionales();
    this.loading = false;
    this.diasLicencia = -1;
    formDirective.resetForm();
    this.AgenteForm.reset();
    this.cleanMessage();
    console.log('nuevo');
  }

  calcularDias() {
    this.diasLicencia = Parser.parseDayDiff(this.camposLicencia.FechaInicio, this.camposLicencia.FechaFin);
  }

  cleanMessage() {
    this.statusError = false;
    this.mensaggeChequeo = '';
    this.mensaggeError = '';
  }

  chequear() {
    console.log('chequear');
    this.cargarMovimiento();
    this.chequearLicencia();
  }

  private chequearLicencia() {
    this.loading = true;
    this.cleanMessage();
    this.sServicios.postChequearRectificarLicencia(this.movimientoLicencia).subscribe(data => {
      // Obtengo los Id de cola a ejecutar
      this.mensaggeChequeo = Parser.getMessageStyle(data.diagnostico, 'Resultado del Chequeo');
      if (data.estado === 0) {
        this.mensaggeChequeo += Parser.parseStyleMessageExito(Constantes.MESSAGE_CHEQUEO_EXITO);
        this.disableEjecutar = false;
        this.disabledLicenciaFormGroup();
        // Obtengo los Id de cola a ejecutar
        this.ejecutarLicencia = data;
      } else {
        this.ejecutarLicencia = null;
        this.disableEjecutar = true;
      }
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
      this.statusError = true;
      this.disableEjecutar = true;
      this.mensaggeError = Parser.parseStyleMessageError('Se produjo un error ' + error.statusText);
    });
  }

  confirmDialogEjecutar(busquedaDirective: FormGroupDirective) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Esta seguro que desea EJECUTAR este movimiento?',
        buttonText: {
          ok: 'Si',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log('SI');
        this.ejecutar(busquedaDirective);
      } else {
        console.log('NO');
      }
    });
  }

  ejecutar(busquedaDirective: FormGroupDirective) {
    console.log('ejecutar');
    this.loading = true;
    this.cleanMessage();
    this.sServicios.postEjecutarRectificarLicencia(this.ejecutarLicencia).subscribe(data => {
      this.disableEjecutar = true;
      this.mensaggeChequeo = Parser.getMessageStyle(data.diagnostico, 'Resultado de la ejecución');
      if (data.estado === 0) {
        this.mensaggeChequeo += Parser.parseStyleMessageError(Constantes.MESSAGE_CHEQUEO_EXITO);
      } else {
        this.ejecutarLicencia = null;
      }
      this.loading = false;
      this.nuevo(busquedaDirective);
    }, error => {
      console.log(error);
      this.loading = false;
      this.statusError = true;
      this.mensaggeError = Parser.parseStyleMessageError('Se produjo un error ' + error.statusText);
    });
  }

  onChangeFechaFin(event) {
    this.calcularDias();
  }

  private cargarMovimiento() {
    this.movimientoLicencia.idAgente = this.camposLicencia.IdAgente;
    this.movimientoLicencia.CantidadHoras = this.camposLicencia.CantidadHoras ? this.camposLicencia.CantidadHoras : 0;
    this.movimientoLicencia.Confirmada = Constantes.SI;
    this.movimientoLicencia.Fecha1 = this.camposLicencia.FechaInicio;
    this.movimientoLicencia.Fecha2 = this.camposLicencia.FechaFin;
    this.movimientoLicencia.FechaPresentacion = this.camposLicencia.FechaPresentacion;
    this.movimientoLicencia.FechaTermino = this.camposLicencia.FechaTermino;
    this.movimientoLicencia.Licencia = this.camposLicencia.Licencia;
    this.movimientoLicencia.NroCertificado = this.camposLicencia.NroCertificado;
    this.movimientoLicencia.Observaciones = this.camposLicencia.Observaciones ? this.camposLicencia.Observaciones : '';
    this.movimientoLicencia.IdUsuarioWeb = this.authService.getIdConcurrentUser();
    this.movimientoLicencia.Borrar = this.camposLicencia.isBorrar ? Constantes.SI : Constantes.NO;
  }

  onPressEnter(event: any, formDirective: FormGroupDirective) {
    if (event.keyCode === Constantes.KEY_ENTER) {
      if (this.AgenteForm.status === 'VALID') {
        console.log('onClickEnter');
        this.buscarServicios(formDirective);
        return false;
      }
    }
  }

}

