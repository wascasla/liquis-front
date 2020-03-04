import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-lista-liquidaciones',
  templateUrl: './lista-liquidaciones.component.html',
  styleUrls: ['./lista-liquidaciones.component.css']
})
export class ListaLiquidacionesComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['id', 'descripcion', 'doblesf', 'periodo'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface PeriodicElement {
  descripcion: string;
  id: number;
  doblesf: string;
  periodo: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, descripcion: 'Febrero 2020 - Complementaria estadística y Censos', doblesf: 'S', periodo: 'febrero 2020'},
  {id: 2, descripcion: 'Marzo 2020 - COMPLETA', doblesf: 'S', periodo: 'Marzo 2020'},
  {id: 3, descripcion: 'Enero 2020 - COMPLETA', doblesf: 'N', periodo: 'enero 2020'},
  {id: 4, descripcion: 'Febrero 2020 - COMPLETA', doblesf: 'S', periodo: 'febrero 2020'},
  {id: 5, descripcion: 'Enero 2020 - Fonavi', doblesf: 'S', periodo: 'enero 2020'},
  {id: 6, descripcion: 'Enero 2020 - Recupero Gasto', doblesf: 'S', periodo: 'enero 2020'},
  {id: 7, descripcion: 'Dic/19-Ene/20 - Complementaria 3 Funcionarios', doblesf: 'S', periodo: 'diciembre 2020'},
  {id: 8, descripcion: 'Dic/19-Ene/20 - Complementaria 2 Funcionarios+Otros	', doblesf: 'S', periodo: 'diciembre 2020'},
  {id: 9, descripcion: 'Febrero 2019 - COMPLETA', doblesf: 'S', periodo: 'febrero 2019'},
  {id: 10, descripcion: 'Marzo 2019 - COMPLETA', doblesf: 'S', periodo: 'marzo 2019'},
  {id: 11, descripcion: 'Abril 2019 - COMPLETA', doblesf: 'S', periodo: 'abril 2019'},
  {id: 12, descripcion: 'Mayo 2019 - COMPLETA', doblesf: 'S', periodo: 'mayo 2019'},
  {id: 13, descripcion: 'Junio 2019 - COMPLETA', doblesf: 'S', periodo: 'junio 2019'},
  {id: 14, descripcion: 'Julio 2019 - COMPLETA', doblesf: 'S', periodo: 'julio 2019'},
  {id: 15, descripcion: 'Setiembre 2019 - COMPLETA', doblesf: 'S', periodo: 'setiembre 2019'},
  {id: 16, descripcion: 'Octubre 2019 - COMPLETA', doblesf: 'N', periodo: 'octubre 2019'},
  {id: 17, descripcion: 'Noviembre 2019 - COMPLETA', doblesf: 'S', periodo: 'noviembre 2019'},
  {id: 18, descripcion: 'Diciembre 2019 - COMPLETA', doblesf: 'S', periodo: 'diciembre 2019'},
  {id: 19, descripcion: 'Enero 2018 - COMPLETA', doblesf: 'S', periodo: 'enero 2018'},
  {id: 20, descripcion: 'Febrero 2018 - COMPLETA', doblesf: 'S', periodo: 'febrero 2018'},
];
