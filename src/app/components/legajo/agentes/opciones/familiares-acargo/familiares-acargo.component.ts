import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
  FormGroupDirective,
} from "@angular/forms";

@Component({
  selector: "app-familiares-acargo",
  templateUrl: "./familiares-acargo.component.html",
  styleUrls: ["./familiares-acargo.component.css"],
})
export class FamiliaresACargoComponent implements OnInit {
  familiarACargoAgenteForm: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createAgenteFormGroup();
  }

  createAgenteFormGroup() {
    this.familiarACargoAgenteForm = this.formBuilder.group({
      persona: new FormControl({ value: "", disabled: true }, []),
      fechaNacimiento: new FormControl({ value: "", disabled: true }, []),
      parentesco: new FormControl({ value: "", disabled: true }, []),
      fechaCasamiento: new FormControl({ value: "", disabled: true }, []),
      correspondeAsignacion: new FormControl({ value: "", disabled: true }, []),
      aCargo: new FormControl({ value: "", disabled: true }, []),
      observaciones: new FormControl({ value: "", disabled: true }, []),
      fechaCarga: new FormControl({ value: "", disabled: true }, []),
    });
  }
}
