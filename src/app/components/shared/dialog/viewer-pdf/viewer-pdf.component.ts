import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ReferencialesService } from 'src/app/providers/referenciales.service';

@Component({
  selector: 'app-viewer-pdf',
  templateUrl: './viewer-pdf.component.html',
  styleUrls: ['./viewer-pdf.component.css']
})
export class ViewerPdfComponent implements OnInit {
  mostrar: boolean;
  pdfSrc: any;

  constructor(
    public dialogRef: MatDialogRef<ViewerPdfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private referencialesService: ReferencialesService) {
  }

  ngOnInit() {
    this.mostrar = true;
    this.referencialesService.GetReporteTest().subscribe(
      data => {
        // this.pdfSrc = URL.createObjectURL(data);
        this.pdfSrc = data;
        console.log(this.pdfSrc);
        this.mostrar = false;
      }, error => {
        console.log('error');
        console.log(error);
        this.mostrar = false;
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
