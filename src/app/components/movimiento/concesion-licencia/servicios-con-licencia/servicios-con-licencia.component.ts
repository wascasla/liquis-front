import { Component, OnInit, ViewChild, Output, Input, OnChanges } from '@angular/core';
import { MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { DatePipe } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { PlazaDetailComponent } from 'src/app/components/shared/dialog/plaza-detail/plaza-detail.component';

@Component({
  selector: 'app-servicios-con-licencia',
  templateUrl: './servicios-con-licencia.component.html',
  styleUrls: ['./servicios-con-licencia.component.css']
})
export class ServiciosConLicenciaComponent implements OnInit, OnChanges {

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input() dataSourceInput: any;


  displayedColumns: string[] = ['IdServicioAgente', 'IdPlaza', 'SubOrganizacion', 'Asignatura',
    'Horas', 'SR', 'SituacionLaboral', 'FechaAlta', 'star'];

  pipe: DatePipe;
  statusError = false;
  mensaggeError: string;
  showTitle = false;
  loading = true;
  dataSource: any;

  selection = new SelectionModel<any>(true, []);

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
    console.log('ServiciosConLicenciaComponent');
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
    this.inicializarBusqueda();
    this.filtrar();
  }

  filtrar() {
    const filtro = [];
    this.dataSourceInput.forEach(element => {
      if (element.SituacionLaboral !== 'NR') {
        filtro.push(element);
      }
    });
    this.dataSource.data = filtro;
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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}
