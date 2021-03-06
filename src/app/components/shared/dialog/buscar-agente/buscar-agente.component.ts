import { AgenteService } from './../../../../providers/agente.service';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/util/error-matcher ';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-buscar-agente',
  templateUrl: './buscar-agente.component.html',
  styleUrls: ['./buscar-agente.component.css']
})
export class BuscarAgenteComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  agenteForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  Busqueda: string;
  dataSource: any;
  statusError = false;
  searching = false;

  displayedColumns: string[] = ['Documento', 'Descripcion', 'star'];

  /*
    data
      true : returna el registro del agente
      false: returna el DNI del agente
  */

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<BuscarAgenteComponent>,
              private sAgente: AgenteService, @Inject(MAT_DIALOG_DATA) public data: boolean) {
    this.Busqueda = '';
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.createFormGroup();
  }

  private inicializarBusqueda() {
    this.dataSource.data = [];
    this.searching = true;
  }

  createFormGroup() {
    this.agenteForm = this.formBuilder.group({
      busqueda: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
    console.log(this.agenteForm);
  }

  buscarAgente() {
    this.inicializarBusqueda();
    this.sAgente.getAll(
      this.Busqueda
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
      valueReturn = this.dataSource.data.find(result => result.Documento === value);
    }
    this.dialogRef.close(valueReturn);
  }

  cerrar() {
    this.dialogRef.close(-1);
  }
}
