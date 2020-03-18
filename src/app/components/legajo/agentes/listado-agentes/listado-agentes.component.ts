import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-listado-agentes",
  templateUrl: "./listado-agentes.component.html",
  styleUrls: ["./listado-agentes.component.css"]
})
export class ListadoAgentesComponent implements OnInit {
  constructor() {}

  displayedColumns: string[] = ["id", "dni", "nombres", "apellido"];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  nombres: string;
  id: number;
  dni: number;
  apellido: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, dni: 254522, nombres: "Juan", apellido: "Perez" },
  { id: 2, dni: 542154, nombres: "Juan", apellido: "Perez" },
  { id: 3, dni: 32233232, nombres: "Juan", apellido: "Perez" },
  { id: 4, dni: 25455445, nombres: "Juan", apellido: "Perez" }
];
