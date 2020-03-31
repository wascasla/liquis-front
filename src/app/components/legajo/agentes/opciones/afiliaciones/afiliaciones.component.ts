import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
  FormGroupDirective
} from "@angular/forms";

@Component({
  selector: "app-afiliaciones",
  templateUrl: "./afiliaciones.component.html",
  styleUrls: ["./afiliaciones.component.css"]
})
export class AfiliacionesComponent implements OnInit {
  afiliacionAgenteForm: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createAgenteFormGroup();
  }

  createAgenteFormGroup() {
    this.afiliacionAgenteForm = this.formBuilder.group({
      codigoDescuento: new FormControl({ value: "", disabled: true }, []),
      fechaAlta: new FormControl({ value: "", disabled: true }, []),
      fechaBaja: new FormControl({ value: "", disabled: true }, []),
      observaciones: new FormControl({ value: "", disabled: true }, [])
    });
  }
}
