import { PlazaService } from './../../../../providers/plaza.service';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Parser } from 'src/app/util/parser';

export interface DialogData {
  Historial: any;
  Organizacion: string;
  Plaza: number;
}

@Component({
  selector: 'app-agentes-plaza',
  templateUrl: './agentes-plaza.component.html',
  styleUrls: ['./agentes-plaza.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AgentesPlazaComponent {

  currentDate: Date;
  mostrar: boolean;

  constructor(
    public dialogRef: MatDialogRef<AgentesPlazaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private plazasService: PlazaService) {

    this.mostrar = true;
    this.plazasService.getHistorialPlaza(this.data.Plaza).subscribe(agentes => {
         this.data.Historial = Parser.arrayDate(agentes);
         this.mostrar = false;
         console.log(this.data);
    }, error => {
        console.log(error);
        this.mostrar = false;
    });
    this.currentDate = new Date();
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
