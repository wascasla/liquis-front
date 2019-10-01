import { PlazaSelectComponent } from './../shared/dialog/plaza-select/plaza-select.component';
import { BusquedaServicioAgente } from '../../class/busqueda-servicio-agente';
import { Component, OnInit, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  hola: BusquedaServicioAgente;
  mostrar = false;
  servicioSelect: number;

  constructor(public dialog: MatDialog) {
    console.log('test');
    this.hola = new BusquedaServicioAgente();
    this.hola.Documento = 24960552;
    this.hola.Activa = false;
    console.log(this.hola.Documento);
  }

  ngOnInit() {
  }

  showServicio(event) {
    this.mostrar = true;
    console.log(event.idServicio);
    this.servicioSelect = event.idServicio;
  }

  openDialog(): boolean {
    const dialogRef = this.dialog.open(PlazaSelectComponent, {
      width: '800px',
      data: { CUISE: 1000448}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    return false;
  }
}
