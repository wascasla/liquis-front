import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
  FormGroupDirective
} from "@angular/forms";

@Component({
  selector: "app-antiguedades",
  templateUrl: "./antiguedades.component.html",
  styleUrls: ["./antiguedades.component.css"]
})
export class AntiguedadesComponent implements OnInit {
  antiguedadAgenteForm: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createAgenteFormGroup();
  }

  createAgenteFormGroup() {
    this.antiguedadAgenteForm = this.formBuilder.group({
      tipoAntiguedad: new FormControl({ value: "", disabled: true }, []),
      fechaDesde: new FormControl({ value: "", disabled: true }, []),
      fechaHasta: new FormControl({ value: "", disabled: true }, []),
      anios: new FormControl({ value: "", disabled: true }, []),
      meses: new FormControl({ value: "", disabled: true }, []),
      observaciones: new FormControl({ value: "", disabled: true }, [])
    });
  }
}
