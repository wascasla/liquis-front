import { Constantes } from 'src/app/util/Constantes';
import { ReferencialesService } from 'src/app/providers/referenciales.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormGroupDirective } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/util/error-matcher ';
import { Parser } from 'src/app/util/parser';
import { MatDialog, MatDatepickerInputEvent } from '@angular/material';
import { ServicioAgenteService } from 'src/app/providers/servicio-agente.service';
import { BusquedaServicioAgente } from 'src/app/class/busqueda-servicio-agente';
import { AuthServiceService } from 'src/app/providers/security/auth-service.service';
import { BuscarAgenteComponent } from 'src/app/components/shared/dialog/buscar-agente/buscar-agente.component';
import { SearchCuiseComponent } from 'src/app/components/shared/dialog/search-cuise/search-cuise.component';
import { CamposBaja } from 'src/app/class/movimiento/baja/campos-baja';
import { MovimientoBaja } from 'src/app/class/movimiento/baja/movimiento-baja';
import { ConfirmationDialogComponent } from '../../shared/dialog/confirmation-dialog/confirmation-dialog.component';
import { MessageDialogComponent } from '../../shared/dialog/message-dialog/message-dialog.component';

@Component({
  selector: 'app-baja-servicio-rectificar',
  templateUrl: './baja-servicio-rectificar.component.html',
  styleUrls: ['./baja-servicio-rectificar.component.css']
})
export class BajaServicioRectificarComponent implements OnInit {

  AgenteForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  BajaForm: FormGroup;

  // Gestion de Errores y mensajes
  statusError = false;
  mensaggeError: string;
  mensaggeChequeo: string;
  mensaggeEjecucion: string;
  statusErrorSS = false;

  // Mostrar Nombre del agente
  showTitle = false;

  // Mostrar Loading
  loading = false;

  // listado
  dsServiciosInactivos = [];
  dsCausaBaja = [];
  dsEnfermedades = [];

  // Objeto movimiento
  movimientoBaja: MovimientoBaja;

  // contenedor de campos del formulario
  camposBaja: CamposBaja;
  showInfo = false;
  disableEjecutar = true;
  isEjecutado = false;
  ejecutarBaja: any;

  constructor(public dialog: MatDialog, private sServicios: ServicioAgenteService, private authService: AuthServiceService,
              private sReferenciales: ReferencialesService, private formBuilder: FormBuilder, private renderer: Renderer2) { }

  ngOnInit() {
    this.movimientoBaja = new MovimientoBaja();
    this.camposBaja = new CamposBaja();
    this.createSearchFormGroup();
    this.createBajaFormGroup();
    this.enabledSearchFormGroup();
    this.disabledBajaFormGroup();
  }

  createBajaFormGroup() {
    this.BajaForm = this.formBuilder.group({
      fechaBaja: new FormControl({ value: '', disabled: true }, []),
      causaBaja: new FormControl({ value: '', disabled: true }, []),
      checkDeshacerBaja: new FormControl({ value: '', disabled: true }, null),
      fechaProbableParto: new FormControl({ value: '', disabled: true }, []),
      Observaciones: new FormControl({ value: '', disabled: true }, [])
    });
  }

  enabledBajaFormGroup() {
    // setear los validadores
    this.BajaForm.get('fechaBaja').setValidators([Validators.required]);
    this.BajaForm.get('causaBaja').setValidators([Validators.required]);

    // habilitar campos de edicion
    this.BajaForm.get('fechaBaja').enable();
    this.BajaForm.get('causaBaja').enable();
    this.BajaForm.get('checkDeshacerBaja').enable();
    this.BajaForm.get('Observaciones').enable();

    // actualizar los validadores
    this.BajaForm.updateValueAndValidity();
  }

  enabledFechaProbablePartoFormGroup() {
    this.BajaForm.get('fechaProbableParto').setValidators([Validators.required]);
    this.BajaForm.get('fechaProbableParto').updateValueAndValidity();
    this.BajaForm.get('fechaProbableParto').enable();
  }

  disabledFechaProbablePartoFormGroup() {
    this.BajaForm.get('fechaProbableParto').setValue(false);
    this.BajaForm.get('fechaProbableParto').disable();
    this.BajaForm.get('fechaProbableParto').setValidators(null);
  }

  onProteccionMaternidadCheck(event) {
    console.log(event);
    if (event.checked) {
      if (this.camposBaja.Sexo === 'F') {
        this.enabledFechaProbablePartoFormGroup();
      } else {
        this.messageProteccionMaternidad();
      }
    }
  }

  disabledBajaFormGroup() {
    // setear los validadores
    this.BajaForm.get('fechaBaja').disable();
    this.BajaForm.get('causaBaja').disable();
    this.BajaForm.get('checkDeshacerBaja').disable();
    this.BajaForm.get('Observaciones').disable();
  }

  disabledSearchFormGroup() {
    // setear los validadores
    this.AgenteForm.get('documento').disable();
    this.AgenteForm.get('cuise').disable();
    this.AgenteForm.get('checkProteccionMaternidad').disable();
  }

  enabledSearchFormGroup() {
    // setear los validadores
    this.AgenteForm.get('documento').enable();
    this.AgenteForm.get('cuise').enable();
    this.AgenteForm.get('checkProteccionMaternidad').enable();
  }

  createSearchFormGroup() {
    this.AgenteForm = this.formBuilder.group({
      documento: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*'),
      ]),
      cuise: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*'),
      ]),
      checkProteccionMaternidad: new FormControl()
    });
  }

  openAgenteDialog() {
    const dialogAgenteRef = this.dialog.open(BuscarAgenteComponent, {
      width: '750px',
      data: false
    });

    dialogAgenteRef.afterClosed().subscribe(result => {
      if (result > 0) {
        this.camposBaja.Documento = result;
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
        this.camposBaja.CUISE = result;
      }
    });
    return false;
  }

  private inicializarBusqueda() {
    this.loading = true;
    this.statusError = false;
    this.statusErrorSS = false;
    this.showTitle = false;
    this.isEjecutado = false;
  }

  private inicializarEdicion() {
    this.movimientoBaja = new MovimientoBaja();
    this.mostrarTitulo();
    this.completarCombos();
    this.disabledSearchFormGroup();
    this.enabledBajaFormGroup();
    this.disableEjecutar = true;
    this.isEjecutado = false;
  }

  private refreshEdicion() {
    this.disabledSearchFormGroup();
    this.enabledBajaFormGroup();
    this.disableEjecutar = true;
    this.isEjecutado = false;
  }

  private completarCombos() {
    // cargar causas de baja
    this.cargarCausasBaja();
  }

  private cargarCausasBaja() {
    this.loading = true;
    this.sReferenciales.getCausasBaja().subscribe(data => {
      // Assign the data to the data source for the table to render
      this.dsCausaBaja = data;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.dsCausaBaja = [];
    });
  }

  private mostrarTitulo() {
    this.showTitle = true;
  }

  selectionDataSource(IdServicioAgente: number, isSelect: boolean) {
    this.dsServiciosInactivos.forEach((item, index) => {
      if (item.IdServicioAgente === IdServicioAgente) {
        this.dsServiciosInactivos[index].isSelect = isSelect;
      }
    });
  }

  private resetSelect(formDirective: FormGroupDirective) {
    this.disableEjecutar = true;
    this.disabledBajaFormGroup();
    this.BajaForm.reset();
    formDirective.resetForm();
  }

  ServicioSelect(value: any, formDirective: FormGroupDirective) {

    if (value.isSelect) {
      if (this.camposBaja.CUISE) {
        this.movimientoBaja.Organizacion = value.IdOrganizacion;
      }
      // Deselecciona todos los servicios con licencia
      this.movimientoBaja.Servicios.forEach((item, index) => {
        this.movimientoBaja.Servicios.splice(index, 1);
        this.selectionDataSource(item.IdServicioAgente, false);
      });
      // Quita el servicio seleccionado al movimiento
      this.movimientoBaja.Servicios.push(value);
      // Selecciona un solo servicio con licencia
      this.selectionDataSource(value.IdServicioAgente, true);
      this.resetEdicion(formDirective);
      console.log('cargarServiciosSelect');
      console.log(value);
      this.cargarServiciosSelect(value);
    } else {
      // Quita el servicio deseleccionado del movimiento
      this.movimientoBaja.Servicios.forEach((item, index) => {
        if (item.IdServicioAgente === value.IdServicioAgente) {
          this.movimientoBaja.Servicios.splice(index, 1);
          this.selectionDataSource(value.IdServicioAgente, false);
        }
      });
      this.resetSelect(formDirective);
      this.disabledBajaFormGroup();
    }
  }

  private mostrarResultadoBusqueda() {
    this.mostrarTitulo();
    this.disabledSearchFormGroup();
    // inicializo combos comunes
    this.completarCombos();
    // Seteo la fecha de inicio y de presentacion
    this.disableEjecutar = true;
  }

  searchServiciosInactivos(documento: number) {
    this.loading = true;
    this.sServicios.getAll(
      documento,
      this.camposBaja.CUISE,
      Constantes.INACTIVO,
      this.authService.getIdConcurrentUser()).subscribe(data => {
        // Assign the data to the data source for the table to render
        console.log('searchServiciosInactivos');
        console.log(data);
        this.dsServiciosInactivos = Parser.arrayDate(data);
        this.mostrarResultadoBusqueda();
        this.loading = false;
      }, error => {
        this.dsServiciosInactivos = [];
        this.loading = false;
        this.mostrarTitulo();
        console.log(error);
        this.disabledSearchFormGroup();
      });
  }

  searchServiciosInactivosReconocimiento(documento: number) {
    this.loading = true;
    this.sServicios.getAllReconocimientoServicio(
      documento,
      this.camposBaja.CUISE,
      this.authService.getIdConcurrentUser()).subscribe(data => {
        // Assign the data to the data source for the table to render
        console.log('searchServiciosInactivosReconocimiento');
        console.log(data);
        this.dsServiciosInactivos = Parser.arrayDate(data);
        this.mostrarResultadoBusqueda();
        this.loading = false;
      }, error => {
        this.dsServiciosInactivos = [];
        this.loading = false;
        this.mostrarTitulo();
        console.log(error);
        this.disabledSearchFormGroup();
      });
  }

  private resetEdicion(formDirective: FormGroupDirective) {
    this.BajaForm.reset();
    formDirective.resetForm();
    this.refreshEdicion();
  }

  refreshServicios(documento: number) {
    this.loading = true;
    if (this.camposBaja.IsProteccionMaternidad) {
      this.sServicios.getAllReconocimientoServicio(
        documento,
        this.camposBaja.CUISE,
        this.authService.getIdConcurrentUser()).subscribe(data => {
          // Assign the data to the data source for the table to render
          this.dsServiciosInactivos = Parser.arrayDate(data);
          this.loading = false;
        }, error => {
          this.dsServiciosInactivos = [];
          this.loading = false;
          console.log(error);
        });
    } else {
      this.sServicios.getAll(
        documento,
        this.camposBaja.CUISE,
        Constantes.INACTIVO,
        this.authService.getIdConcurrentUser()).subscribe(data => {
          // Assign the data to the data source for the table to render
          this.dsServiciosInactivos = Parser.arrayDate(data);
          this.loading = false;
        }, error => {
          this.dsServiciosInactivos = [];
          this.loading = false;
          console.log(error);
        });
    }
  }

  buscarServicios() {
    this.inicializarBusqueda();
    // Buscar el agente ingresado
    this.sServicios.getAgentePuntos(this.camposBaja.Documento).subscribe(agente => {

      // Seteo los campos del agente
      this.camposBaja.IdAgente = agente.ID;
      this.movimientoBaja.idAgente = agente.ID;
      this.camposBaja.Nombres = agente.ApellidosYNombres;
      this.camposBaja.Documento = agente.Documento;
      this.camposBaja.Sexo = agente.Sexo;
      console.log('sServicios');
      console.log(agente);
      // Obtener todos los servicios activos
      if (this.camposBaja.IsProteccionMaternidad) {
        this.searchServiciosInactivosReconocimiento(this.camposBaja.Documento);
      } else {
        this.searchServiciosInactivos(this.camposBaja.Documento);
      }
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

  nuevo(formDirective: FormGroupDirective) {
    this.enabledSearchFormGroup();
    this.disabledBajaFormGroup();
    this.camposBaja = new CamposBaja();
    this.dsServiciosInactivos = [];
    this.inicializarBusqueda();
    this.loading = false;
    formDirective.resetForm();
    this.AgenteForm.reset();
    this.cleanMessage();
    console.log('nuevo');
  }

  cleanMessage() {
    this.statusError = false;
    this.mensaggeChequeo = '';
    this.mensaggeError = '';
  }

  chequear() {
    console.log('chequear');
    this.cargarMovimiento();
    this.chequearRectificarBaja();
  }

  private chequearRectificarBaja() {
    this.loading = true;
    this.cleanMessage();
    console.log('this.movimientoBaja');
    console.log(this.movimientoBaja);
    this.sServicios.postChequearRectificarBaja(this.movimientoBaja).subscribe(data => {
      // Obtengo los Id de cola a ejecutar
      this.mensaggeChequeo = Parser.getMessageStyle(data.diagnostico, 'Resultado del Chequeo');
      console.log('Resultado del Chequeo');
      console.log(data);
      if (data.estado === 0) {
        this.mensaggeChequeo += Parser.parseStyleMessageExito(Constantes.MESSAGE_CHEQUEO_EXITO);
        this.disableEjecutar = false;
        this.disabledBajaFormGroup();
        // Obtengo los Id de cola a ejecutar
        this.ejecutarBaja = data;
      } else {
        this.ejecutarBaja = null;
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
    this.sServicios.postEjecutarRectificarBaja(this.ejecutarBaja).subscribe(data => {
      this.disableEjecutar = true;
      this.mensaggeChequeo = Parser.getMessageStyle(data.diagnostico, 'Resultado de la ejecución');
      if (data.estado === 0) {
        this.mensaggeChequeo += Parser.parseStyleMessageExito(Constantes.MESSAGE_CHEQUEO_EXITO);
        this.isEjecutado = true;
        this.refreshServicios(this.camposBaja.Documento);
      } else {
        this.ejecutarBaja = null;
      }
      this.loading = false;
      // this.nuevo(busquedaDirective);
    }, error => {
      console.log(error);
      this.loading = false;
      this.statusError = true;
      this.mensaggeError = Parser.parseStyleMessageError('Se produjo un error ' + error.statusText);
    });
  }

  private cargarMovimiento() {
    this.movimientoBaja.idAgente = this.camposBaja.IdAgente;
    this.movimientoBaja.Fecha2 = this.camposBaja.FechaBaja;
    this.movimientoBaja.FechaProbableParto = this.camposBaja.FechaProbableParto;
    this.movimientoBaja.CausaBaja = this.camposBaja.CausaBaja;
    this.movimientoBaja.FechaProbableParto = this.camposBaja.FechaProbableParto;
    this.movimientoBaja.IsAccidenteTrabajo = this.camposBaja.IsAccidenteTrabajo;
    this.movimientoBaja.Observaciones = this.camposBaja.Observaciones ? this.camposBaja.Observaciones : '';
    this.movimientoBaja.IdUsuarioWeb = this.authService.getIdConcurrentUser();
    this.movimientoBaja.IsDeshacerBaja = this.camposBaja.IsDeshacerBaja;
  }

  onChangeFechaProbableParto(event) {
    console.log(event);
  }

  onPressEnter(event: any, formDirective: FormGroupDirective) {
    if (event.keyCode === Constantes.KEY_ENTER) {
      if (this.AgenteForm.status === 'VALID') {
        console.log('onClickEnter');
        this.buscarServicios();
        return false;
      }
    }
  }

  onCausaBajaSelect(event) {
    console.log(event);
  }

  cargarServiciosSelect(value: any) {
    this.camposBaja.FechaBaja = value.FechaBaja;
    this.camposBaja.CausaBaja = value.CausaBaja;
    if (this.camposBaja.IsProteccionMaternidad) {
      this.camposBaja.FechaProbableParto = value.FechaTermino;
    }
    this.camposBaja.Observaciones = value.Observaciones;
  }

  messageProteccionMaternidad() {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: {
        title: 'Atención',
        message: 'No se puede dar una baja con Proteccion a la Maternidad, el agente no es de sexo FEMENINO.',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.camposBaja.IsProteccionMaternidad = false;
    });
  }

  onDeshacerBajaChk() {
    console.log('onAccidenteTrabajoChk');
    console.log(this.camposBaja.IsAccidenteTrabajo);
  }
}
