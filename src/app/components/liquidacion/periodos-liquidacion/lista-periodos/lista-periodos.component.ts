import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-lista-periodos',
  templateUrl: './lista-periodos.component.html',
  styleUrls: ['./lista-periodos.component.css']
})
export class ListaPeriodosComponent implements OnInit {

  constructor() { }

  
  displayedColumns: string[] = ['id', 'mes', 'ano', 'desde', 'hasta', 'descripcion', 'cerrado'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}


export interface PeriodicElement {
  
  id: number;
  mes: number;
  ano: number;
  desde: string;
  hasta: string;
  descripcion: string;
  cerrado: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, mes: 3 , ano: 2020 , desde: '01/03/2020', hasta: '31/03/2020',  descripcion: 'marzo 2020', cerrado: 'NO'},
  {id: 2, mes: 2 , ano: 2020 , desde: '01/02/2020', hasta: '29/02/2020',  descripcion: 'febrero 2020', cerrado: 'SI'},
  {id: 3, mes: 3 , ano: 2020 , desde: '01/03/2020', hasta: '31/03/2020',  descripcion: 'marzo 2020', cerrado: 'NO'},
  {id: 4, mes: 3 , ano: 2020 , desde: '01/03/2020', hasta: '31/03/2020',  descripcion: 'marzo 2020', cerrado: 'NO'},
  {id: 5, mes: 3 , ano: 2020 , desde: '01/03/2020', hasta: '31/03/2020',  descripcion: 'marzo 2020', cerrado: 'NO'},
  {id: 6, mes: 3 , ano: 2020 , desde: '01/03/2020', hasta: '31/03/2020',  descripcion: 'marzo 2020', cerrado: 'NO'},
  {id: 7, mes: 3 , ano: 2020 , desde: '01/03/2020', hasta: '31/03/2020',  descripcion: 'marzo 2020', cerrado: 'NO'},
  {id: 8, mes: 3 , ano: 2020 , desde: '01/03/2020', hasta: '31/03/2020',  descripcion: 'marzo 2020', cerrado: 'NO'},
  {id: 9, mes: 3 , ano: 2020 , desde: '01/03/2020', hasta: '31/03/2020',  descripcion: 'marzo 2020', cerrado: 'NO'},
  {id: 10, mes: 3 , ano: 2020 , desde: '01/03/2020', hasta: '31/03/2020',  descripcion: 'marzo 2020', cerrado: 'NO'},
];