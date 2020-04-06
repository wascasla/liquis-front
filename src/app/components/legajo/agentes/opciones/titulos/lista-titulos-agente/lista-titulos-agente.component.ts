import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-lista-titulos-agente",
  templateUrl: "./lista-titulos-agente.component.html",
  styleUrls: ["./lista-titulos-agente.component.css"],
})
export class ListaTitulosAgenteComponent implements OnInit {
  constructor() {}

  displayedColumns: string[] = [
    "titulo",
    "duracion",
    "fechaEgreso",
    "institucion",
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  titulo: string;
  duracion: number;
  fechaEgreso: string;
  institucion: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    titulo: "Licenciado en Sistemas de Informacion",
    duracion: 5,
    fechaEgreso: "20/12/2007",
    institucion: "Universidad Nacional de Catamarca",
  },
];
