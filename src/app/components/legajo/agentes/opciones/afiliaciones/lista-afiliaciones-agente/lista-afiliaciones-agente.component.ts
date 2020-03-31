import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-lista-afiliaciones-agente",
  templateUrl: "./lista-afiliaciones-agente.component.html",
  styleUrls: ["./lista-afiliaciones-agente.component.css"]
})
export class ListaAfiliacionesAgenteComponent implements OnInit {
  constructor() {}

  displayedColumns: string[] = [
    "codigo",
    "fechaAlta",
    "fechaBaja",
    "observaciones"
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  codigo: string;
  fechaAlta: string;
  fechaBaja: string;
  observaciones: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    codigo: "Obra Social OSEP",
    fechaAlta: "01/11/2019",
    fechaBaja: "",
    observaciones: ""
  },
  {
    codigo: "Cons. Prof. Cs. Econo.",
    fechaAlta: "13/11/2019",
    fechaBaja: "",
    observaciones: ""
  }
];
