import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-lista-prenatal-agente",
  templateUrl: "./lista-prenatal-agente.component.html",
  styleUrls: ["./lista-prenatal-agente.component.css"],
})
export class ListaPrenatalAgenteComponent implements OnInit {
  constructor() {}

  displayedColumns: string[] = [
    "agente",
    "fechaEmision",
    "fun",
    "fechaProbableParto",
    "fechaFallecimiento",
    "nacio",
    "fechaCarga",
    "observaciones",
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  agente: number;
  fechaEmision: string;
  fun: string;
  fechaProbableParto: string;
  fechaFallecimiento: string;
  nacio: string;
  fechaCarga: string;
  observaciones: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    agente: 1,
    fechaEmision: "01/11/2019",
    fun: "01/10/2019",
    fechaProbableParto: "01/05/2020",
    fechaFallecimiento: "",
    nacio: "",
    fechaCarga: "",
    observaciones: "prueba prenatal",
  },
];
