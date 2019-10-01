import { Component, OnInit, Inject } from '@angular/core';;
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { PlazaService } from 'src/app/providers/plaza.service';
import { AgentesPlazaComponent } from '../agentes-plaza/agentes-plaza.component';

export interface DialogData {
  detalle: any;
  Plaza: number;
}

@Component({
  selector: 'app-plaza-detail',
  templateUrl: './plaza-detail.component.html',
  styleUrls: ['./plaza-detail.component.css']
})
export class PlazaDetailComponent {

  mostrar = true;

  constructor(
    public dialogRef: MatDialogRef<PlazaDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog,
    private plazasService: PlazaService) {

    this.mostrar = true;
    this.plazasService.getDetallePlaza(this.data.Plaza).subscribe(datos => {
         this.data.detalle = datos;
         this.mostrar = false;
         console.log(this.data);
    }, error => {
        console.log(error);
        this.mostrar = false;
    });
    console.log(data);
  }

  openDialog(): boolean {
    const dialogRef = this.dialog.open(AgentesPlazaComponent, {
      width: '700px',
      data: { Historial: null, Organizacion: this.data.detalle.SubOrganizacion , Plaza: this.data.detalle.ID }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    return false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
