import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicioAgenteService } from 'src/app/providers/servicio-agente.service';

export interface DialogData {
  Antiguedad: any;
  Nombres: string;
  Documento: number;
}

@Component({
  selector: 'app-antiguedad',
  templateUrl: './antiguedad.component.html',
  styleUrls: ['./antiguedad.component.css']
})
export class AntiguedadComponent {


  currentDate: Date;
  mostrar: boolean;

  constructor(
    public dialogRef: MatDialogRef<AntiguedadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private serviciosAgente: ServicioAgenteService) {

    this.mostrar = true;
    this.serviciosAgente.getAgenteAntiguedad(this.data.Documento).subscribe(antiguedad => {
         this.data.Antiguedad = antiguedad;
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
