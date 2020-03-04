import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-modelos-liquidacion',
  templateUrl: './modelos-liquidacion.component.html',
  styleUrls: ['./modelos-liquidacion.component.css']
})
export class ModelosLiquidacionComponent implements OnInit {

  ModelosForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createLiquidacionesFormGroup();
  }

  createLiquidacionesFormGroup() {
    this.ModelosForm = this.formBuilder.group({
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
