import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-historial-liquidaciones',
  templateUrl: './historial-liquidaciones.component.html',
  styleUrls: ['./historial-liquidaciones.component.css']
})
export class HistorialLiquidacionesComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['usuario', 'liquidacion', 'inicio', 'fin', 'horainicio', 'horafin', 'tiempo', 'procesados'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface PeriodicElement {
  usuario: string;
  liquidacion: string;
  inicio: string;
  fin: string;
  horainicio: string;
  horafin: string;
  tiempo: string;
  procesados: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {usuario: 'pepe', liquidacion: 'Febrero 2020 - Complementaria estadística y Censos', inicio: '04/03/2020', fin: '04/03/2020', horainicio: '07:48:07 a.m.', horafin: '07:48:07 a.m.',tiempo:'00:00:04', procesados: '1'},
  {usuario: 'pepe', liquidacion: 'Febrero 2020 - Complementaria estadística y Censos', inicio: '04/03/2020', fin: '04/03/2020', horainicio: '07:48:07 a.m.', horafin: '07:48:07 a.m.',tiempo:'00:00:04', procesados: '1'},
  {usuario: 'pepe', liquidacion: 'Febrero 2020 - Complementaria estadística y Censos', inicio: '04/03/2020', fin: '04/03/2020', horainicio: '07:48:07 a.m.', horafin: '07:48:07 a.m.',tiempo:'00:00:04', procesados: '1'},
  {usuario: 'pepe', liquidacion: 'Febrero 2020 - Complementaria estadística y Censos', inicio: '04/03/2020', fin: '04/03/2020', horainicio: '07:48:07 a.m.', horafin: '07:48:07 a.m.',tiempo:'00:00:04', procesados: '1'},
  {usuario: 'pepe', liquidacion: 'Febrero 2020 - Complementaria estadística y Censos', inicio: '04/03/2020', fin: '04/03/2020', horainicio: '07:48:07 a.m.', horafin: '07:48:07 a.m.',tiempo:'00:00:04', procesados: '1'},
  {usuario: 'pepe', liquidacion: 'Febrero 2020 - Complementaria estadística y Censos', inicio: '04/03/2020', fin: '04/03/2020', horainicio: '07:48:07 a.m.', horafin: '07:48:07 a.m.',tiempo:'00:00:04', procesados: '1'},
  {usuario: 'pepe', liquidacion: 'Febrero 2020 - Complementaria estadística y Censos', inicio: '04/03/2020', fin: '04/03/2020', horainicio: '07:48:07 a.m.', horafin: '07:48:07 a.m.',tiempo:'00:00:04', procesados: '1'},
  {usuario: 'pepe', liquidacion: 'Febrero 2020 - Complementaria estadística y Censos', inicio: '04/03/2020', fin: '04/03/2020', horainicio: '07:48:07 a.m.', horafin: '07:48:07 a.m.',tiempo:'00:00:04', procesados: '1'},
  {usuario: 'pepe', liquidacion: 'Febrero 2020 - Complementaria estadística y Censos', inicio: '04/03/2020', fin: '04/03/2020', horainicio: '07:48:07 a.m.', horafin: '07:48:07 a.m.',tiempo:'00:00:04', procesados: '1'},
  {usuario: 'pepe', liquidacion: 'Febrero 2020 - Complementaria estadística y Censos', inicio: '04/03/2020', fin: '04/03/2020', horainicio: '07:48:07 a.m.', horafin: '07:48:07 a.m.',tiempo:'00:00:04', procesados: '1'},
  {usuario: 'pepe', liquidacion: 'Febrero 2020 - Complementaria estadística y Censos', inicio: '04/03/2020', fin: '04/03/2020', horainicio: '07:48:07 a.m.', horafin: '07:48:07 a.m.',tiempo:'00:00:04', procesados: '1'},
  {usuario: 'pepe', liquidacion: 'Febrero 2020 - Complementaria estadística y Censos', inicio: '04/03/2020', fin: '04/03/2020', horainicio: '07:48:07 a.m.', horafin: '07:48:07 a.m.',tiempo:'00:00:04', procesados: '1'},
  {usuario: 'pepe', liquidacion: 'Febrero 2020 - Complementaria estadística y Censos', inicio: '04/03/2020', fin: '04/03/2020', horainicio: '07:48:07 a.m.', horafin: '07:48:07 a.m.',tiempo:'00:00:04', procesados: '1'},
  {usuario: 'pepe', liquidacion: 'Febrero 2020 - Complementaria estadística y Censos', inicio: '04/03/2020', fin: '04/03/2020', horainicio: '07:48:07 a.m.', horafin: '07:48:07 a.m.',tiempo:'00:00:04', procesados: '1'},
  {usuario: 'pepe', liquidacion: 'Febrero 2020 - Complementaria estadística y Censos', inicio: '04/03/2020', fin: '04/03/2020', horainicio: '07:48:07 a.m.', horafin: '07:48:07 a.m.',tiempo:'00:00:04', procesados: '1'},
  {usuario: 'pepe', liquidacion: 'Febrero 2020 - Complementaria estadística y Censos', inicio: '04/03/2020', fin: '04/03/2020', horainicio: '07:48:07 a.m.', horafin: '07:48:07 a.m.',tiempo:'00:00:04', procesados: '1'},
  {usuario: 'pepe', liquidacion: 'Febrero 2020 - Complementaria estadística y Censos', inicio: '04/03/2020', fin: '04/03/2020', horainicio: '07:48:07 a.m.', horafin: '07:48:07 a.m.',tiempo:'00:00:04', procesados: '1'},
  {usuario: 'pepe', liquidacion: 'Febrero 2020 - Complementaria estadística y Censos', inicio: '04/03/2020', fin: '04/03/2020', horainicio: '07:48:07 a.m.', horafin: '07:48:07 a.m.',tiempo:'00:00:04', procesados: '1'},
  {usuario: 'pepe', liquidacion: 'Febrero 2020 - Complementaria estadística y Censos', inicio: '04/03/2020', fin: '04/03/2020', horainicio: '07:48:07 a.m.', horafin: '07:48:07 a.m.',tiempo:'00:00:04', procesados: '1'},
  {usuario: 'pepe', liquidacion: 'Febrero 2020 - Complementaria estadística y Censos', inicio: '04/03/2020', fin: '04/03/2020', horainicio: '07:48:07 a.m.', horafin: '07:48:07 a.m.',tiempo:'00:00:04', procesados: '1'},
];
