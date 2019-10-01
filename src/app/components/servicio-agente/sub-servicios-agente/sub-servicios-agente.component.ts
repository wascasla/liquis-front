import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DatePipe } from '@angular/common';
import { ServicioAgenteService } from 'src/app/providers/servicio-agente.service';

@Component({
  selector: 'app-sub-servicios-agente',
  templateUrl: './sub-servicios-agente.component.html',
  styleUrls: ['./sub-servicios-agente.component.css']
})
export class SubServiciosAgenteComponent implements OnInit, OnChanges {


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input() dataSourceInput: any;

  displayedColumns: string[] = ['IdSubservicio', 'FechaAlta', 'FechaBaja', 'Baja', 'FechaDif',
    'LicenciaDescripcion', 'NroCertificado', 'FechaCarga', 'end'];
  dataSource: any;
  mensaggeError: string;
  pipe: DatePipe;
  servicioSelect: number;

  constructor(private sServicios: ServicioAgenteService) {
    this.dataSource = new MatTableDataSource();
    console.log('SubServiciosAgenteComponent');
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.createFilter();
    this.cargar();
  }

  ngOnChanges() {
    this.cargar();
    this.scrollTo();
  }

  public scrollTo() {
    document.querySelector('#target')
      .scrollIntoView({ block: 'end', behavior: 'smooth' });
  }

  highlight(element: any) {
    element.highlighted = !element.highlighted;
  }

  createFilter() {
    this.pipe = new DatePipe('en');
    const defaultPredicate = this.dataSource.filterPredicate;
    this.dataSource.filterPredicate = (data, filter) => {
      const formattedFechaAlta = this.pipe.transform(data.FechaAlta, 'dd/MM/yyyy');
      const formattedFechaBaja = this.pipe.transform(data.FechaBaja, 'dd/MM/yyyy');
      const formattedFechaCarga = this.pipe.transform(data.FechaCarga, 'dd/MM/yyyy');

      if ((formattedFechaAlta !== null)) {
        return formattedFechaAlta.indexOf(filter) >= 0 || defaultPredicate(data, filter);
      }
      if ((formattedFechaBaja !== null)) {
        return formattedFechaBaja.indexOf(filter) >= 0 || defaultPredicate(data, filter);
      }
      if ((formattedFechaCarga !== null)) {
        return formattedFechaCarga.indexOf(filter) >= 0 || defaultPredicate(data, filter);
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


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
