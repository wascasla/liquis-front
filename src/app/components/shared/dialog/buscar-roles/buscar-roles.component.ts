import { AgenteService } from './../../../../providers/agente.service';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/util/error-matcher ';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReferencialesService } from 'src/app/providers/referenciales.service';

@Component({
  selector: 'app-buscar-roles',
  templateUrl: './buscar-roles.component.html',
  styleUrls: ['./buscar-roles.component.css']
})
export class BuscarRolesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  rolesForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  Busqueda: string;
  dataSource: any;
  statusError = false;
  searching = false;

  displayedColumns: string[] = ['idRol', 'descripcion', 'star'];

  /*
    data
      true : returna el registro de la repartición
      false: returna el ID de la repartición
  */

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<BuscarRolesComponent>,
              private sReferenciales: ReferencialesService, @Inject(MAT_DIALOG_DATA) public data: boolean) {
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
    this.rolesForm = this.formBuilder.group({
      busqueda: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
    console.log(this.rolesForm);
  }

  buscar() {
    this.inicializarBusqueda();
    this.sReferenciales.getRolAll(
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
    this.dialogRef.close(value);
    let valueReturn = value;
    if (this.data) {
      valueReturn = this.dataSource.data.find(result => result.idRol === value);
    }
    this.dialogRef.close(valueReturn);
  }

  cerrar() {
    this.dialogRef.close(-1);
  }
}


