import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-lista-familiar-acargo-agente",
  templateUrl: "./lista-familiar-acargo-agente.component.html",
  styleUrls: ["./lista-familiar-acargo-agente.component.css"],
})
export class ListaFamiliarAcargoAgenteComponent implements OnInit {
  constructor() {}

  displayedColumns: string[] = [
    "persona",
    "nombre",
    "fechaNacimiento",
    "parentesco",
    "fechaCasamiento",
    "correspondeAsignacion",
    "aCargo",
    "observaciones",
    "fechaCarga",
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  persona: number;
  nombre: string;
  fechaNacimiento: string;
  parentesco: string;
  fechaCasamiento: string;
  correspondeAsignacion: string;
  aCargo: string;
  observaciones: string;
  fechaCarga: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    persona: 8,
    nombre: "Ariel Marchesin",
    fechaNacimiento: "31/12/2019",
    parentesco: "Hijo/a",
    fechaCasamiento: "",
    correspondeAsignacion: "",
    aCargo: "",
    fechaCarga: "",
    observaciones: "",
  },
  {
    persona: 55,
    nombre: "prueba prueba",
    fechaNacimiento: "31/12/1985",
    parentesco: "Hijo/a",
    fechaCasamiento: "",
    correspondeAsignacion: "",
    aCargo: "",
    fechaCarga: "16/11/2019",
    observaciones: "",
  },
];
