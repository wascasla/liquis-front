import { Component, OnInit, ViewChild, Output, Input, OnChanges } from '@angular/core';
import { MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { DatePipe } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { PlazaDetailComponent } from 'src/app/components/shared/dialog/plaza-detail/plaza-detail.component';

@Component({
  selector: 'app-servicios-activos',
  templateUrl: './servicios-activos.component.html',
  styleUrls: ['./servicios-activos.component.css']
})
export class ServiciosActivosComponent implements OnInit, OnChanges {

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input() dataSourceInput: any;

  displayedColumns: string[] = ['IdServicioAgente', 'IdPlaza', 'suborganizacion', 'Asignatura',
    'Horas', 'SituacionRevista', 'NivelEnsenanza', 'FechaAlta', 'star'];

  pipe: DatePipe;
  statusError = false;
  mensaggeError: string;
  showTitle = false;
  loading = true;
  dataSource: any;

  selection = new SelectionModel<any>(true, []);

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
    console.log('ServiciosActivosComponent');
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    console.log(this.dataSource);
    this.createFilter();
    this.cargar();
  }

  ngOnChanges() {
    console.log('ngOnChanges');
    this.cargar();
  }

  highlight(element: any) {
    console.log('dataSource');
    console.log(this.dataSource.data);
    this.dataSource.data.forEach(value => {
      value.highlighted = element.highlighted;
    });
    element.highlighted = !element.highlighted;
  }

  createFilter() {
    this.pipe = new DatePipe('en');
    const defaultPredicate = this.dataSource.filterPredicate;
    this.dataSource.filterPredicate = (data, filter) => {
      const formattedFechaAlta = this.pipe.transform(data.FechaAlta, 'dd/MM/yyyy');
      const formattedFechaBaja = this.pipe.transform(data.FechaBaja, 'dd/MM/yyyy');
      if ((formattedFechaAlta !== null)) {
        return formattedFechaAlta.indexOf(filter) >= 0 || defaultPredicate(data, filter);
      }
      if ((formattedFechaBaja !== null)) {
        return formattedFechaBaja.indexOf(filter) >= 0 || defaultPredicate(data, filter);
      }
      return defaultPredicate(data, filter);
    };
  }

  cargar() {
    this.filtrar();
  }

  filtrar() {
    const filtro = [];
    this.dataSourceInput.forEach(element => {
      if (!element.servicioligado) {
        filtro.push(element);
      }
    });
    this.dataSource.data = filtro;
  }

  private mostrarTitulo() {
    this.showTitle = true;
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

}
