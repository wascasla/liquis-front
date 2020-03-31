import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-lista-antiguedades-agente",
  templateUrl: "./lista-antiguedades-agente.component.html",
  styleUrls: ["./lista-antiguedades-agente.component.css"]
})
export class ListaAntiguedadesAgenteComponent implements OnInit {
  constructor() {}

  displayedColumns: string[] = [
    "tipoAntiguedad",
    "fechaDesde",
    "fechaHasta",
    "anios",
    "meses",
    "fechaCarga",
    "observaciones"
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  tipoAntiguedad: string;
  fechaDesde: string;
  fechaHasta: string;
  anios: number;
  meses: number;
  fechaCarga: string;
  observaciones: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    tipoAntiguedad: "Administrativa",
    fechaDesde: "13/11/2019",
    fechaHasta: "31/12/2019",
    anios: 1,
    meses: 10,
    fechaCarga: "",
    observaciones: ""
  },
  {
    tipoAntiguedad: "Docente",
    fechaDesde: "01/06/2004",
    fechaHasta: "01/11/2019",
    anios: 15,
    meses: 5,
    fechaCarga: "",
    observaciones: "prueba"
  }
];
