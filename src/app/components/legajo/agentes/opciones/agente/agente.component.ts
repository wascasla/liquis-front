import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
  FormGroupDirective
} from "@angular/forms";

@Component({
  selector: "app-agente",
  templateUrl: "./agente.component.html",
  styleUrls: ["./agente.component.css"]
})
export class AgenteComponent implements OnInit {
  AgenteForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createAgenteFormGroup();
  }

  createAgenteFormGroup() {
    this.AgenteForm = this.formBuilder.group({
      legajo: new FormControl({ value: "", disabled: true }, []),
      fechaAlta: new FormControl({ value: "", disabled: true }, []),
      fechaBaja: new FormControl({ value: "", disabled: true }, []),
      causaBaja: new FormControl({ value: "", disabled: true }, []),
      observaciones: new FormControl({ value: "", disabled: true }, [])
    });
  }
}
