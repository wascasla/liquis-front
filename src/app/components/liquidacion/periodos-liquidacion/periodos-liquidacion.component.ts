import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-periodos-liquidacion',
  templateUrl: './periodos-liquidacion.component.html',
  styleUrls: ['./periodos-liquidacion.component.css']
})
export class PeriodosLiquidacionComponent implements OnInit {

  LiquidacionesForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createLiquidacionesFormGroup();
  }

  createLiquidacionesFormGroup() {
    this.LiquidacionesForm = this.formBuilder.group({
      periodo: new FormControl({ value: '', disabled: true }, []),
      tipo: new FormControl({ value: '', disabled: true }, []),
      descripcion: new FormControl({ value: '', disabled: true }, []),
      dobleSalarioFamiliar: new FormControl({ value: '', disabled: true }, []),
      liquidaFonid: new FormControl({ value: '', disabled: true }, []),
      acreditadaEnBanco: new FormControl({ value: '', disabled: true }, []),
      estado: new FormControl(false),
      liquidacionAnterior: new FormControl({ value: '', disabled: true }, null)
    });
  }

}
