import { Constantes } from 'src/app/util/Constantes';
import { ReferencialesService } from 'src/app/providers/referenciales.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormGroupDirective } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/util/error-matcher ';
import { Parser } from 'src/app/util/parser';
import { MatDialog, MatDatepickerInputEvent } from '@angular/material';
import { ServicioAgenteService } from 'src/app/providers/servicio-agente.service';
import { AuthServiceService } from 'src/app/providers/security/auth-service.service';
import { BuscarAgenteComponent } from 'src/app/components/shared/dialog/buscar-agente/buscar-agente.component';
import { SearchCuiseComponent } from 'src/app/components/shared/dialog/search-cuise/search-cuise.component';
import { PlazaSelectComponent } from '../../shared/dialog/plaza-select/plaza-select.component';
import { ConfirmationDialogComponent } from '../../shared/dialog/confirmation-dialog/confirmation-dialog.component';
import { PlazaDetailComponent } from '../../shared/dialog/plaza-detail/plaza-detail.component';
import { MovimientoAlta } from 'src/app/class/movimiento/alta/movimiento-alta';
import { CamposAlta } from 'src/app/class/movimiento/alta/campos-alta';
import { MessageDialogComponent } from '../../shared/dialog/message-dialog/message-dialog.component';

@Component({
  selector: 'app-alta-servicio',
  templateUrl: './alta-servicio.component.html',
  styleUrls: ['./alta-servicio.component.css']
})
export class AltaServicioComponent implements OnInit {

  AgenteForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  AltaForm: FormGroup;

  // Gestion de Errores y mensajes
  statusError = false;
  menssageError: string;
  menssageChequeo: string;
  menssageEjecucion: string;
  statusErrorSS = false;

  // Mostrar Nombre del agente
  showTitle = false;

  // Mostrar Loading
  loading = false;

  // listado
  dsServiciosActivos = [];
  dsServiciosAnteriores = [];
  dsCausaAlta = [];
  dsCausaBaja = [];
  dsEdificio = [];
  dsAgrupamiento = [];
  dsZona = [];
  dsSituacionRevista = [];

  // Objeto movimiento
  movimientoAlta: MovimientoAlta;

  // contenedor de campos del formulario
  camposAlta: CamposAlta;

  showInfo = false;
  diasSituacionRevista: number;

  disableEjecutar = true;
  ejecutarAlta: any;

  constructor(public dialog: MatDialog, private sServicios: ServicioAgenteService, private authService: AuthServiceService,
              private sReferenciales: ReferencialesService, private formBuilder: FormBuilder, private renderer: Renderer2) { }

  ngOnInit() {
    this.movimientoAlta = new MovimientoAlta();
    this.camposAlta = new CamposAlta();
    this.createSearchFormGroup();
    this.createAltaFormGroup();
    this.enabledSearchFormGroup();
    this.disabledAltaFormGroup();
  }

  createAltaFormGroup() {
    this.AltaForm = this.formBuilder.group({
      fechaAlta: new FormControl({ value: '', disabled: true }, []),
      situacionRevista: new FormControl({ value: '', disabled: true }, []),
      agrupamiento: new FormControl({ value: '', disabled: true }, []),
      cargoSalarial: new FormControl({ value: '', disabled: true }, []),
      horas: new FormControl({ value: '', disabled: true }, []),
      nivelEnsenanza: new FormControl({ value: '', disabled: true }, []),
      modalidad: new FormControl({ value: '', disabled: true }, []),
      causaAlta: new FormControl({ value: '', disabled: true }, []),
      causaBaja: new FormControl({ value: '', disabled: true }, []),
      zona: new FormControl({ value: '', disabled: true }, []),
      edificio: new FormControl({ value: '', disabled: true }, []),
      fechaBaja: new FormControl(false),
      checkFechaBaja: new FormControl({ value: '', disabled: true }, null),
      observaciones: new FormControl({ value: '', disabled: true }, []),
    });
  }

  onEdificioSelect(edificio) {
    // NO IMPLEMENTADO
    console.log('onEdificioSelect');
    console.log(edificio);
    this.cargarZona(edificio.value);
  }

  enabledAltaFormGroup() {
    // setear los validadores
    this.AltaForm.get('fechaAlta').setValidators([Validators.required]);
    this.AltaForm.get('situacionRevista').setValidators([Validators.required]);
    this.AltaForm.get('agrupamiento').setValidators([Validators.required]);
    this.AltaForm.get('causaAlta').setValidators([Validators.required]);
    this.AltaForm.get('cargoSalarial').setValidators([Validators.required]);
    this.AltaForm.get('horas').setValidators([Validators.required]);
    this.AltaForm.get('nivelEnsenanza').setValidators([Validators.required]);
    this.AltaForm.get('edificio').setValidators([Validators.required]);

    // habilitar campos de edicion
    this.AltaForm.get('fechaAlta').enable();
    this.AltaForm.get('situacionRevista').enable();
    this.AltaForm.get('agrupamiento').enable();
    this.AltaForm.get('causaAlta').enable();
    this.AltaForm.get('cargoSalarial').enable();
    this.AltaForm.get('horas').enable();
    this.AltaForm.get('nivelEnsenanza').enable();
    this.AltaForm.get('edificio').enable();
    this.AltaForm.get('observaciones').enable();
    this.AltaForm.get('checkFechaBaja').enable();

    // actualizar los validadores
    this.AltaForm.updateValueAndValidity();
  }

  enabledCausaBajaFormGroup() {
    this.AltaForm.get('causaBaja').setValidators([Validators.required]);
    this.AltaForm.get('causaBaja').updateValueAndValidity();
    this.AltaForm.get('causaBaja').enable();
  }

  disabledCausaBajaFormGroup() {
    this.AltaForm.get('causaBaja').setValue('');
    this.AltaForm.get('causaBaja').disable();
    this.AltaForm.get('causaBaja').setValidators(null);
  }

  enabledFechaBajaFormGroup() {
    this.AltaForm.get('fechaBaja').setValidators([Validators.required]);
    this.AltaForm.get('fechaBaja').updateValueAndValidity();
    this.AltaForm.get('fechaBaja').enable();
  }

  disabledFechaBajaFormGroup() {
    this.AltaForm.get('fechaBaja').setValue(false);
    this.AltaForm.get('fechaBaja').disable();
    this.AltaForm.get('fechaBaja').setValidators(null);
  }

  cleanFechaBajaCheck() {
    this.camposAlta.isFechaBaja = false;
  }

  disabledAltaFormGroup() {
    // setear los validadores
    this.AltaForm.get('fechaAlta').disable();
    this.AltaForm.get('situacionRevista').disable();
    this.AltaForm.get('causaAlta').disable();
    this.AltaForm.get('causaBaja').disable();
    this.AltaForm.get('zona').disable();
    this.AltaForm.get('edificio').disable();
    this.AltaForm.get('agrupamiento').disable();
    this.AltaForm.get('cargoSalarial').disable();
    this.AltaForm.get('horas').disable();
    this.AltaForm.get('nivelEnsenanza').disable();
    this.AltaForm.get('fechaBaja').disable();
    this.AltaForm.get('checkFechaBaja').disable();
    this.AltaForm.get('observaciones').disable();
    if (this.disableEjecutar) {
      this.cleanFechaBajaCheck();
    }
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
        this.camposAlta.Documento = result;
      }
    });
    return false;
  }

  confirmDialogPlaza(formDirective: FormGroupDirective) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Esta seguro que desea quitar esta Plaza?',
        buttonText: {
          ok: 'Si',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log('SI');
        this.camposAlta.plazaSelect = null;
        this.resetSelect(formDirective);
      } else {
        console.log('NO');
      }
    });
  }

  messageFechaFin() {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: {
        title: 'Recuerde',
        message: 'Debe ingresar la fecha de baja y seleccionar la causa de baja correspondiente.',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }


  openCUISEDialog() {
    const dialogAgenteRef = this.dialog.open(SearchCuiseComponent, {
      width: '850px',
      data: false
    });

    dialogAgenteRef.afterClosed().subscribe(result => {
      if (result > 0) {
        this.camposAlta.CUISE = result;
      }
    });
    return false;
  }

  openDialogPlazaSelect(formDirective: FormGroupDirective): boolean {
    const dialogRef = this.dialog.open(PlazaSelectComponent, {
      width: '800px',
      data: { CUISE: this.camposAlta.CUISE }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.camposAlta.plazaSelect = null;
      if (result.ID) {
        this.camposAlta.plazaSelect = result;
        this.resetEdicion(formDirective);
      }
      console.log(result);
    });
    return false;
  }

  private inicializarBusqueda() {
    this.loading = true;
    this.statusError = false;
    this.statusErrorSS = false;
    this.showTitle = false;
    this.cleanFechaBajaCheck();
  }

  private resetEdicion(formDirective: FormGroupDirective) {
    this.AltaForm.reset();
    formDirective.resetForm();
    this.inicializarEdicion();
  }

  private resetSelect(formDirective: FormGroupDirective) {
    this.disableEjecutar = true;
    this.diasSituacionRevista = -1;
    this.camposAlta.isFechaBaja = false;
    this.disabledAltaFormGroup();
    this.disabledCamposOpcionales();
    this.cleanMessage();
    this.AltaForm.reset();
    formDirective.resetForm();
  }

  cleanCamposOpcionales() {
    this.camposAlta.limpiarCamposOpcinales();
  }

  onFechaBajaCheck(event) {
    console.log(event);
    if (event.checked) {
      this.messageFechaFin();
      this.enabledFechaBajaFormGroup();
      this.enabledCausaBajaFormGroup();
    } else {
      this.disabledFechaBajaFormGroup();
      this.disabledCausaBajaFormGroup();
      this.cleanCamposOpcionales();
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

  private inicializarEdicion() {
    this.movimientoAlta = new MovimientoAlta();
    this.camposAlta.limpiarCampos();
    if (this.camposAlta.plazaSelect !== null) {
      this.completarCombosPlaza();
    }
  }

  private completarCombos() {
    // cargar el combo de CausaAltas
    this.cargarCausaAlta();
    // cargar el combo de CausaBajas
    this.cargarCausaBaja();
  }

  private completarCombosPlaza() {
    // enabled campos alta
    this.enabledAltaFormGroup();
    // cargar el combo de SituacionRevistas
    this.cargarSituacionRevistas();
    // cargar los edificios
    this.cargarEdificio();
    // cargar agrupamiento
    this.cargarAgrupamiento();
    // los datos de la plaza seleccionada
    this.camposAlta.cargarCampos();
  }

  private cargarSituacionRevistas() {
    this.loading = true;
    this.sReferenciales.getSituacionRevistaCargo(this.camposAlta.plazaSelect.idCargoSalarial).subscribe(data => {
      // Assign the data to the data source for the table to render
      this.dsSituacionRevista = data;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.dsSituacionRevista = [];
    });
  }

  private cargarCausaAlta() {
    this.loading = true;
    this.sReferenciales.getCausasAlta().subscribe(data => {
      // Assign the data to the data source for the table to render
      this.dsCausaAlta = data;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.dsCausaAlta = [];
    });
  }

  enabledZona() {
    this.AltaForm.get('zona').setValidators([Validators.required]);
    this.AltaForm.get('zona').enable();
  }

  enabledEdificio() {
    this.AltaForm.get('edificio').setValidators([Validators.required]);
    this.AltaForm.get('edificio').enable();
  }

  disabledZona() {
    this.AltaForm.get('zona').disable();
  }

  private cargarZona(edificio) {
    this.loading = true;
    this.sReferenciales.GetZonaEdificio(edificio).subscribe(data => {
      // Assign the data to the data source for the table to render
      this.dsZona = data;
      this.enabledZona();
      this.loading = false;
    }, error => {
      this.loading = false;
      this.dsZona = [];
      this.enabledZona();
    });
  }

  private cargarEdificio() {
    this.loading = true;
    this.sReferenciales.getEdificiosSubOrganizacion(this.camposAlta.plazaSelect.IdSubOrganizacion).subscribe(data => {
      // Assign the data to the data source for the table to render
      this.dsEdificio = data;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.dsEdificio = [];
    });
  }

  private cargarAgrupamiento() {
    this.loading = true;
    this.sReferenciales.GetAgrupamiento(this.camposAlta.plazaSelect.idCargoSalarial).subscribe(data => {
      // Assign the data to the data source for the table to render
      this.dsAgrupamiento = data;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.dsAgrupamiento = [];
    });
  }

  private cargarCausaBaja() {
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


  private ObtenerEdificioTitularInterino(IdPlaza: number) {
    this.loading = true;
    this.sReferenciales.GetEdificioTitularInterino(IdPlaza).subscribe(data => {
      // Assign the data to the data source for the table to render
      this.dsEdificio = [];
      if (data) {
        this.enabledEdificio();
        this.dsEdificio = data;
      }
      this.loading = false;
    }, error => {
      this.loading = false;
      this.dsEdificio = [];
    });
  }

  private mostrarTitulo() {
    this.showTitle = true;
  }

  searchServicios(documento: number) {
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

  refreshServicios(documento: number) {
    this.dsServiciosAnteriores = this.dsServiciosActivos;
    console.log('this.dsServiciosAnteriores');
    console.log(this.dsServiciosAnteriores);
    this.sServicios.getAll(
      documento,
      -1,
      Constantes.ACTIVO,
      this.authService.getIdConcurrentUser()).subscribe(data => {
        // Assign the data to the data source for the table to render
        this.dsServiciosActivos = Parser.arrayDate(data);
        this.highlight();
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
    this.sServicios.getAgentePuntos(this.camposAlta.Documento).subscribe(agente => {

      // Seteo los campos del agente
      this.camposAlta.IdAgente = agente.ID;
      this.movimientoAlta.idAgente = agente.ID;
      this.camposAlta.Nombres = agente.ApellidosYNombres;
      this.camposAlta.Documento = agente.Documento;

      // Obtener todos los servicios con SituacionRevistas activas y sin SituacionRevista
      this.searchServicios(this.camposAlta.Documento);
    }, error => {
      if (error.status === 404) {
        this.menssageError = 'El agente en cuestión no existe en la base de datos';
      } else {
        this.menssageError = 'Ocurrio un error al buscar el agente';
      }
      console.log(status);
      console.log(error);
      this.statusError = true;
      this.loading = false;
    });
  }

  disabledCamposOpcionales() {
    this.disabledFechaBajaFormGroup();
    this.disabledCausaBajaFormGroup();
  }

  nuevo(formDirective: FormGroupDirective) {
    this.enabledSearchFormGroup();
    this.disabledAltaFormGroup();
    this.camposAlta = new CamposAlta();
    this.dsServiciosActivos = [];
    this.inicializarBusqueda();
    this.disabledCamposOpcionales();
    this.loading = false;
    this.diasSituacionRevista = -1;
    formDirective.resetForm();
    this.AgenteForm.reset();
    this.cleanMessage();
    console.log('nuevo');
  }

  cleanMessage() {
    this.statusError = false;
    this.menssageChequeo = '';
    this.menssageError = '';
  }

  chequear() {
    console.log('chequear');
    this.cargarMovimiento();
    this.chequearAlta();
  }

  private chequearAlta() {
    this.loading = true;
    this.cleanMessage();
    this.sServicios.postChequearAlta(this.movimientoAlta).subscribe(data => {
      // Obtengo los Id de cola a ejecutar
      console.log(data.diagnostico);
      this.menssageChequeo = Parser.getMessageStyle(data.diagnostico, 'Resultado del Chequeo');
      if (data.estado === 0) {
        this.menssageChequeo = this.menssageChequeo.concat(Parser.parseStyleMessageExito(Constantes.MESSAGE_CHEQUEO_EXITO));
        console.log(this.menssageChequeo);
        this.disableEjecutar = false;
        this.disabledAltaFormGroup();
        // Obtengo los Id de cola a ejecutar
        this.ejecutarAlta = data;
        console.log(data);
      } else {
        this.ejecutarAlta = null;
        this.disableEjecutar = true;
      }
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
      this.statusError = true;
      this.disableEjecutar = true;
      this.menssageError = Parser.parseStyleMessageError('Se produjo un error ' + error.statusText);
    });
  }

  highlight() {
    // tslint:disable-next-line:no-debugger
    debugger;
    this.dsServiciosActivos.forEach(actual => {
      let existe = false;
      this.dsServiciosAnteriores.forEach(anterior => {
        if (actual.IdServicioAgente === anterior.IdServicioAgente) {
          existe = true;
        }
      });
      if (!existe) {
        actual.highlighted = true;
      }
    });
  }

  ejecutar(busquedaDirective: FormGroupDirective) {
    console.log('ejecutar');
    this.loading = true;
    this.cleanMessage();
    this.sServicios.postEjecutarAlta(this.ejecutarAlta).subscribe(data => {
      this.disableEjecutar = true;
      console.log(data.diagnostico);
      if (data.estado === 0) {
        this.menssageChequeo += Parser.parseStyleMessageExito(Constantes.MESSAGE_EJECUCION_EXITO);
        this.menssageChequeo = Parser.getMessageStyle(this.menssageChequeo, 'Resultado de la ejecución');
      } else {
        this.menssageChequeo = Parser.getMessageStyle(data.diagnostico, 'Resultado de la ejecución');
      }
      this.loading = false;
      this.refreshServicios(this.camposAlta.Documento);
    }, error => {
      console.log(error);
      this.loading = false;
      this.statusError = true;
      this.menssageError = Parser.parseStyleMessageError('Se produjo un error ' + error.statusText);
    });
  }

  private cargarMovimiento() {
    this.movimientoAlta.idAgente = this.camposAlta.IdAgente;
    this.movimientoAlta.Organizacion = this.camposAlta.CUISE;
    this.movimientoAlta.Fecha1 = this.camposAlta.getFormatFechaAlta();
    this.movimientoAlta.Fecha2 = this.camposAlta.getFormatFechaBaja();
    this.movimientoAlta.FechaTermino = this.camposAlta.FechaTermino;
    this.movimientoAlta.SituacionRevista = this.camposAlta.SituacionRevista;
    this.movimientoAlta.CausaAlta = this.camposAlta.CausaAlta;
    this.movimientoAlta.CausaBaja = this.camposAlta.CausaBaja;
    this.movimientoAlta.Edificio = this.camposAlta.Edificio;
    this.movimientoAlta.IdAgrupamiento = this.camposAlta.IdAgrupamiento;
    this.movimientoAlta.IdPlaza = this.camposAlta.plazaSelect.ID;
    this.movimientoAlta.Observaciones = this.camposAlta.Observaciones ? this.camposAlta.Observaciones : '';
    this.movimientoAlta.IdUsuarioWeb = this.authService.getIdConcurrentUser();
  }

  onPressEnter(event: any, formDirective: FormGroupDirective) {
    if (event.keyCode === Constantes.KEY_ENTER) {
      console.log('onClickEnter');
      if (this.AgenteForm.status === 'VALID') {
        this.buscarServicios(formDirective);
        return false;
      }
    }
  }

  openDialogPlazaDetail(value): boolean {
    console.log('Plaza');
    console.log(value);
    const dialogRef = this.dialog.open(PlazaDetailComponent, {
      width: '520px',
      data: { Plaza: value }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    return false;
  }

  onZonaSelect(event) {
    console.log(event);
  }

  onSituacionRevistaSelect(event) {
    console.log(event.value);
    if (event.value === Constantes.SR_SUPLENTE) {
      // obtengo el edificio en el que fue cargado el
      // dueño de la plaza
      this.camposAlta.Edificio = -1;
      this.camposAlta.Zona = -1;
      this.ObtenerEdificioTitularInterino(this.camposAlta.plazaSelect.ID);
      if (this.dsEdificio.length === 0) {
        this.cargarEdificio();
      }
    } else {
      // cargar los edificios
      this.cargarEdificio();
    }
  }
}

