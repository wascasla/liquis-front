import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-lista-modelos',
  templateUrl: './lista-modelos.component.html',
  styleUrls: ['./lista-modelos.component.css']
})
export class ListaModelosComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['id', 'descripcion', 'escalafon', 'moneda', 'fechabaja'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface PeriodicElement {
  
  id: number;
  descripcion: string;
  escalafon: string;
  moneda: string;
  fechabaja: string;
 
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, descripcion: 'Sueldo Anual Complementario OSEP Municipios' ,  escalafon: 'OSEP MUNICIPIOS',   moneda: 'Pesos', fechabaja: ''},
  {id: 2, descripcion: 'Sueldo Anual Complementario Liq.Prop.Rentas' ,  escalafon: 'LIQUIDACIONES PROPIAS RENTAS',   moneda: 'Pesos', fechabaja: ''},
  {id: 3, descripcion: 'Sueldo Anual Complementario Hs.Extras Policía' ,  escalafon: 'HORAS EXTRAS POLICIA',   moneda: 'Pesos', fechabaja: ''},
  {id: 4, descripcion: 'Sueldo Anual Complementario FONAVI IPV - General' ,  escalafon: 'GENERAL',   moneda: 'Pesos', fechabaja: ''},
  {id: 5, descripcion: 'Sueldo Anual Complementario FONAVI IPV - Funcionar' ,  escalafon: 'GENERAL',   moneda: 'Pesos', fechabaja: ''},
  {id: 6, descripcion: 'Sueldo Anual Complementario Esc.General' ,  escalafon: 'GENERAL',   moneda: 'Pesos', fechabaja: ''},
  {id: 7, descripcion: 'Sueldo Anual Complementario Esc.Asistencial' ,  escalafon: 'PERSONAL ASISTENCIAL',   moneda: 'Pesos', fechabaja: ''},
  {id: 8, descripcion: 'Sueldo Anual Complementario Esc. Vial' ,  escalafon: 'VIAL',   moneda: 'Pesos', fechabaja: ''},
  {id: 9, descripcion: 'Sueldo Anual Complementario Esc. Seguridad' ,  escalafon: 'SEGURIDAD',   moneda: 'Pesos', fechabaja: ''},
  {id: 10, descripcion: 'Sueldo Anual Complementario Esc. Gráfico' ,  escalafon: 'GRAFICO',  moneda: 'Pesos', fechabaja: ''},
];
