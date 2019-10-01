import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/util/error-matcher ';
import { BusquedaServicioAgente } from 'src/app/class/busqueda-servicio-agente';
import { MatDialog } from '@angular/material';
import { ServicioAgenteService } from 'src/app/providers/servicio-agente.service';
import { Parser } from 'src/app/util/parser';
import { AuthServiceService } from 'src/app/providers/security/auth-service.service';
import { BuscarAgenteComponent } from '../../shared/dialog/buscar-agente/buscar-agente.component';
import { AntiguedadComponent } from '../../shared/dialog/antiguedad/antiguedad.component';
import { SearchCuiseComponent } from '../../shared/dialog/search-cuise/search-cuise.component';
import { Constantes } from 'src/app/util/Constantes';

@Component({
  selector: 'app-buscar-servicios-agente',
  templateUrl: './buscar-servicios-agente.component.html',
  styleUrls: ['./buscar-servicios-agente.component.css']
})
export class BuscarServiciosAgenteComponent implements OnInit {

  ServicioForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  uiServiciosAgentes: BusquedaServicioAgente;
  mostrarSubServicios = false;

  statusError = false;
  mensaggeError: string;
  showTitle = false;
  loading = false;
  statusErrorSS = false;

  Documento: number;
  CUISE: number;
  Activa = true;
  dsServicios = [];
  dsSubServicios = [];
  servicioSelect: number;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private sServicios: ServicioAgenteService,
    private authService: AuthServiceService, private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.uiServiciosAgentes = new BusquedaServicioAgente();
    this.createFormGroup();
  }

  createFormGroup() {
    this.ServicioForm = this.formBuilder.group({
      documento: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*'),
      ]),
      cuise: new FormControl('', [
        Validators.pattern('[0-9]*'),
      ]),
      Activa: new FormControl('')
    });
    console.log(this.ServicioForm);
  }

  private inicializarBusqueda() {
    this.loading = true;
    this.statusError = false;
    this.statusErrorSS = false;
    this.showTitle = false;
    this.mostrarSubServicios = false;
  }

  private inicializarBusquedaSS() {
    this.loading = true;
    this.statusErrorSS = false;
    this.mostrarSubServicios = false;
  }

  onPressEnter(event: any) {
    if (event.keyCode === Constantes.KEY_ENTER) {
      if (this.ServicioForm.status === 'VALID') {
        console.log('onClickEnter');
        this.buscarServicios();
        return false;
      }
    }
  }

  buscarServicios() {
    this.inicializarBusqueda();
    console.log(this.Documento);

    this.sServicios.getAgentePuntos(this.Documento).subscribe(agente => {
      console.log(agente);

      this.uiServiciosAgentes.Nombres = agente.ApellidosYNombres;
      this.uiServiciosAgentes.Documento = agente.Documento;
      this.uiServiciosAgentes.Puntos = agente.Puntos;
      this.uiServiciosAgentes.Estado = agente.Estado;
      this.uiServiciosAgentes.Activa = this.Activa;
      this.uiServiciosAgentes.CUISE = this.CUISE ? this.CUISE : -1;
      this.sServicios.getAll(
        this.uiServiciosAgentes.Documento,
        this.uiServiciosAgentes.CUISE,
        this.uiServiciosAgentes.Activa,
        this.authService.getIdConcurrentUser()).subscribe(data => {
          // Assign the data to the data source for the table to render
          this.dsServicios = Parser.arrayDate(data);
          console.log('servicios del agente');
          console.log(data);
          this.loading = false;
          this.mostrarTitulo();
        }, error => {
          this.dsServicios = [];
          this.loading = false;
          this.mostrarTitulo();
          console.log(error);
        });
    }, error => {
      if (error.status === 404) {
        this.mensaggeError = 'El agente en cuestión no existe en la base de datos';
      } else {
        this.mensaggeError = 'Ocurrio un error al buscar el agente';
      }
      console.log(status);
      console.log(error);
      this.statusError = true;
      this.loading = false;
    });
  }

  buscarSubServicios(value) {
    console.log(value);

    this.inicializarBusquedaSS();
    this.sServicios.getSubservicios(value).subscribe(subservicios => {
      this.dsSubServicios = Parser.arrayDate(subservicios);
      console.log(subservicios);
      this.loading = false;
      this.mostrarLicencias();
    }, error => {
      if (error.status === 404) {
        this.mensaggeError = 'No exiten subservicios para este servicio';
      } else {
        this.mensaggeError = 'Ocurrio un error al buscar los subservicios';
      }
      console.log(status);
      console.log(error);
      this.dsSubServicios = [];
      this.statusErrorSS = true;
      this.loading = false;
    });
  }

  mostrarServicio(event) {
    console.log(event.idServicio);
    this.servicioSelect = event.idServicio;
    this.mostrarSubServicios = false;
    this.buscarSubServicios(this.servicioSelect);
  }

  openDialog(): boolean {
    const dialogRef = this.dialog.open(AntiguedadComponent, {
      width: '500px',
      data: { Nombres: this.uiServiciosAgentes.Nombres, Documento: this.uiServiciosAgentes.Documento }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    return false;
  }

  openAgenteDialog() {
    const dialogAgenteRef = this.dialog.open(BuscarAgenteComponent, {
      width: '750px',
      data: false
    });

    dialogAgenteRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result > 0) {
        this.Documento = result;
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
      console.log('The dialog was closed');
      console.log(result);
      if (result > 0) {
        this.CUISE = result;
      }
    });
    return false;
  }

  private mostrarTitulo() {
    this.showTitle = true;
  }

  private mostrarLicencias() {
    this.mostrarSubServicios = true;
  }
}
