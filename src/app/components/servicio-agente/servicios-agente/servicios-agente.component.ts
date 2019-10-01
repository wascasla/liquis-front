import { Component, OnInit, ViewChild, Input, EventEmitter, Output, OnChanges, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';
import { PlazaDetailComponent } from '../../shared/dialog/plaza-detail/plaza-detail.component';

@Component({
  selector: 'app-servicios-agente',
  templateUrl: './servicios-agente.component.html',
  styleUrls: ['./servicios-agente.component.css']
})

export class ServiciosAgenteComponent implements OnInit, OnChanges {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input() dataSourceInput: any;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSelect = new EventEmitter();


  displayedColumns: string[] = ['IdServicioAgente', 'Info', 'IdPlaza', 'SR', 'Ligado', 'CUISE', 'FechaAlta',
    'FechaBaja', 'Liquida', 'Horas', 'Asignatura', 'CargoSalarial1', 'Carrera', 'Edificio', 'Agrupamiento', 'star'];

  pipe: DatePipe;
  statusError = false;
  mensaggeError: string;
  showTitle = false;
  loading = true;
  dataSource: any;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
    console.log('ServiciosAgenteComponent');
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
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
    this.dataSource.data.forEach( value => {
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
    this.inicializarBusqueda();
    this.dataSource.data = this.dataSourceInput;
  }

  private inicializarBusqueda() {
    this.dataSource.data = [];
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

  cellClicked(row) {
    this.highlight(row);
    // Usamos el método emit
    this.onSelect.emit({ idServicio: row.IdServicioAgente });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
