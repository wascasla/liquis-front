import { AgenteService } from './../../../../providers/agente.service';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/util/error-matcher ';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReferencialesService } from 'src/app/providers/referenciales.service';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { PlazaService } from 'src/app/providers/plaza.service';
import { PlazaDetailComponent } from '../plaza-detail/plaza-detail.component';


@Component({
  selector: 'app-plaza-select',
  templateUrl: './plaza-select.component.html',
  styleUrls: ['./plaza-select.component.css']
})
export class PlazaSelectComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  plazaForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  Busqueda: string;
  dataSource: any;
  statusError = false;
  searching = false;
  messageLoading: string;

  autoSubOrganizaciones = [];
  autoMateria = [];
  autoCargo = [];
  autoPlan = [];
  autoNivel = [];
  Anio: number;

  suborganizacion = '';
  cargo = '';
  planestudio = '';
  espaciocurricular = '';
  fecha = '';
  nivel = '';

  displayedColumns: string[] = ['ID', 'Historial', 'SubOrganizacion', 'Carrera', 'EspacioCurricularDescripcion', 'Categoria',
    'Hora', 'Nivel', 'Division', 'Curso', 'Turno', 'OrigenVacante', 'star'];

  filteredOptions: Observable<string[]>;

  /*
    data
      true : returna el registro del agente
      false: returna el DNI del agente
  */

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<PlazaSelectComponent>, public dialog: MatDialog,
              private sPlaza: PlazaService, private sReferenciales: ReferencialesService,
              @Inject(MAT_DIALOG_DATA) public data: { CUISE: number }) {
    this.Busqueda = '';
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.createFormGroup();
    this.loadAutocomplete();
  }

  highlight(element: any) {
    console.log('dataSource');
    console.log(element);
    if (!element.highlighted){
      this.dataSource.data.forEach( value => {
        value.highlighted = element.highlighted;
      });
      element.highlighted = !element.highlighted;
    }
  }

  loadAutocomplete() {
    console.log(this.data);
    this.messageLoading = 'Loading...';
    this.initAutocomplete();
  }

  private initAutocomplete() {
    this.searching = true;
    this.sReferenciales.getAutocompletarSelectPlaza(
      this.data.CUISE
    ).subscribe(data => {
      // Assign the data to the data source for the table to render
      if (data) {
        data.materias.forEach(element => {
          this.autoMateria.push(element.Materia);
        });
        data.cargos.forEach(element => {
          this.autoCargo.push(element.Cargo);
        });

        data.planes.forEach(element => {
          this.autoPlan.push(element.PlanEstudio);
        });

        data.niveles.forEach(element => {
          this.autoNivel.push(element.Nivel);
        });
      }
      this.searching = false;
    }, error => {
      this.autoMateria = [];
      console.log(error);
      this.searching = false;
    });
  }

  private inicializarBusqueda() {
    this.dataSource.data = [];
    this.searching = true;
    this.messageLoading = 'Buscando...';
  }

  createFormGroup() {
    this.plazaForm = this.formBuilder.group({
      anio: new FormControl('', [
        Validators.pattern('[0-9]*'),
      ]),
    });
    console.log(this.plazaForm);
  }

  buscarPlazas() {
    this.inicializarBusqueda();
    this.sPlaza.getSearchPlaza(
      this.data.CUISE,
      this.suborganizacion,
      this.cargo,
      this.planestudio,
      this.espaciocurricular,
      this.fecha, this.nivel,
      this.Anio ? this.Anio.toString() : ''
    ).subscribe(data => {
      // Assign the data to the data source for the table to render
      this.dataSource.data = data;
      console.log(this.dataSource.data);
      this.searching = false;
    }, error => {
      this.dataSource.data = [];
      console.log(error);
      this.searching = false;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cellClicked(value) {
    let valueReturn = value;
    if (this.data) {
      valueReturn = this.dataSource.data.find(result => result.ID === value);
    }
    console.log('cellClicked');
    console.log(valueReturn);
    this.dialogRef.close(valueReturn);
  }

  cerrar() {
    this.dialogRef.close(-1);
  }

  onAutoSelect(event: any, campo: string) {
    switch (campo) {
      case 'Cargo': {
        this.cargo = event.search;
        console.log(this.cargo);
        break;
      }
      case 'Plan': {
        this.planestudio = event.search;
        console.log(this.planestudio);
        break;
      }
      case 'Materia': {
        this.espaciocurricular = event.search;
        console.log(this.espaciocurricular);
        break;
      }
      case 'Nivel': {
        this.nivel = event.search;
        console.log(this.nivel);
        break;
      }
    }
  }

  onAutoKeyPress(event: any, campo: string) {
    switch (campo) {
      case 'Cargo': {
        this.cargo = event.search;
        console.log(this.cargo);
        break;
      }
      case 'Plan': {
        this.planestudio = event.search;
        console.log(this.planestudio);
        break;
      }
      case 'Materia': {
        this.espaciocurricular = event.search;
        console.log(this.espaciocurricular);
        break;
      }
      case 'Nivel': {
        this.nivel = event.search;
        console.log(this.nivel);
        break;
      }
    }
  }

  openDialogPlazaDetail(value): boolean {
    const dialogRef = this.dialog.open(PlazaDetailComponent, {
      width: '520px',
      data: { Plaza: value }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    return false;
  }
}
