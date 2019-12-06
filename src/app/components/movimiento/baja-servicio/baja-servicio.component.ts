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
  selector: 'app-baja-servicio',
  templateUrl: './baja-servicio.component.html',
  styleUrls: ['./baja-servicio.component.css']
})
export class BajaServicioComponent implements OnInit {

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
  dsServiciosActivos = [];
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
      checkProteccionMaternidad: new FormControl({ value: '', disabled: true }, null),
      checkAccidenteTrabajo: new FormControl({ value: '', disabled: true }, null),
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
    this.BajaForm.get('checkProteccionMaternidad').enable();
    this.BajaForm.get('checkAccidenteTrabajo').enable();
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
    this.BajaForm.get('checkProteccionMaternidad').disable();
    this.BajaForm.get('checkAccidenteTrabajo').disable();
    this.BajaForm.get('Observaciones').disable();
  }

  disabledSearchFormGroup() {
    // setear los validadores
    this.AgenteForm.get('documento').disable();
    this.AgenteForm.get('cuise').disable();
  }

  enabledSearchFormGroup() {
    // setear los validadores
    this.AgenteForm.get('documento').enable();
    this.AgenteForm.get('cuise').enable();
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
    this.dsServiciosActivos.forEach((item, index) => {
      if (item.IdServicioAgente === IdServicioAgente) {
        this.dsServiciosActivos[index].isSelect = isSelect;
      }
    });
  }

  ServicioSelect(value) {
    console.log(value);
    if (value.isSelect) {
      if (this.camposBaja.CUISE) {
        this.movimientoBaja.Organizacion = value.IdOrganizacion;
      }
      this.movimientoBaja.Servicios.push(value);
      this.selectionDataSource(value.IdServicioAgente, true);
    } else {
      this.movimientoBaja.Servicios.forEach((item, index) => {
        if (item.IdServicioAgente === value.IdServicioAgente) {
          this.movimientoBaja.Servicios.splice(index, 1);
          this.selectionDataSource(value.IdServicioAgente, false);
        }
      });
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

  searchServicios(documento: number) {
    this.loading = true;
    this.sServicios.getAll(
      documento,
      -1,
      Constantes.ACTIVO,
      this.authService.getIdConcurrentUser()).subscribe(data => {
        // Assign the data to the data source for the table to render
        this.dsServiciosActivos = Parser.arrayDate(data);
        this.mostrarResultadoBusqueda();
        this.loading = false;
      }, error => {
        this.dsServiciosActivos = [];
        this.loading = false;
        this.mostrarTitulo();
        console.log(error);
        this.disabledSearchFormGroup();
      });
  }

  private resetEdicion(formDirective: FormGroupDirective) {
    this.BajaForm.reset();
    formDirective.resetForm();
    this.inicializarEdicion();
  }

  refreshServicios(documento: number) {
    this.loading = true;
    this.sServicios.getAll(
      documento,
      -1,
      Constantes.ACTIVO,
      this.authService.getIdConcurrentUser()).subscribe(data => {
        // Assign the data to the data source for the table to render
        this.dsServiciosActivos = Parser.arrayDate(data);
        this.loading = false;
      }, error => {
        this.dsServiciosActivos = [];
        this.loading = false;
        console.log(error);
      });
  }

  buscarServicios(formDirective: FormGroupDirective) {
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
      this.searchServicios(this.camposBaja.Documento);
      this.resetEdicion(formDirective);
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
    this.dsServiciosActivos = [];
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
    this.chequearBaja();
  }

  private chequearBaja() {
    this.loading = true;
    this.cleanMessage();
    console.log('this.movimientoBaja');
    console.log(this.movimientoBaja);
    this.sServicios.postChequearBaja(this.movimientoBaja).subscribe(data => {
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
    this.sServicios.postEjecutarBaja(this.ejecutarBaja).subscribe(data => {
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
  }

  onChangeFechaProbableParto(event) {
    console.log(event);
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

  onCausaBajaSelect(event) {
    console.log(event);
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

  onAccidenteTrabajoChk() {
    console.log('onAccidenteTrabajoChk');
    console.log(this.camposBaja.IsAccidenteTrabajo);
  }
}
