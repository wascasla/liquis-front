import { PlazaSelectComponent } from './../shared/dialog/plaza-select/plaza-select.component';
import { BusquedaServicioAgente } from '../../class/busqueda-servicio-agente';
import { Component, OnInit, OnChanges, forwardRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UserCuiseComponent } from '../shared/controls/user-cuise/user-cuise.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  hola: BusquedaServicioAgente;
  mostrar = false;
  servicioSelect: number;
  disabled: boolean;
  CUISE: number;
  form: FormGroup;

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder) {
    console.log('test');
    this.hola = new BusquedaServicioAgente();
    this.hola.Documento = 24960552;
    this.hola.Activa = false;
    console.log(this.hola.Documento);
  }


  createValidatorFormGroup() {
    this.form = this.formBuilder.group({
      cuise: new FormControl(this.CUISE, [
        Validators.pattern('[0-9]*'),
        Validators.required
      ]),
    });
  }

  ngOnInit() {
    this.createValidatorFormGroup();
  }

  showServicio(event) {
    this.mostrar = true;
    console.log(event.idServicio);
    this.servicioSelect = event.idServicio;
  }

  openDialog(): boolean {
    const dialogRef = this.dialog.open(PlazaSelectComponent, {
      width: '800px',
      data: { CUISE: 1000448 }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    return false;
  }

  CuiseSelect(event) {
    console.log('CuiseSelect');
    console.log(event);
    this.CUISE = event.CUISE;
  }

  onClickButton() {
    console.log('onClickButton');
    console.log(this.disabled);
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.form.get('cuise').disable();
    } else {
      this.form.get('cuise').enable();
    }
  }

  onCuiseSelect(event) {
    console.log(event);
  }

  isCuiseValid() {
    return this.CUISE ? true : false;
  }
}
