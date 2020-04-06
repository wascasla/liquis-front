import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
  FormGroupDirective,
} from "@angular/forms";

@Component({
  selector: "app-prenatal",
  templateUrl: "./prenatal.component.html",
  styleUrls: ["./prenatal.component.css"],
})
export class PrenatalComponent implements OnInit {
  prenatalAgenteForm: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createAgenteFormGroup();
  }

  createAgenteFormGroup() {
    this.prenatalAgenteForm = this.formBuilder.group({
      agente: new FormControl({ value: "", disabled: true }, []),
      fechaEmision: new FormControl({ value: "", disabled: true }, []),
      fun: new FormControl({ value: "", disabled: true }, []),
      fechaProbableParto: new FormControl({ value: "", disabled: true }, []),
      fechaFallecimiento: new FormControl({ value: "", disabled: true }, []),
      nacio: new FormControl({ value: "", disabled: true }, []),
      fechaCarga: new FormControl({ value: "", disabled: true }, []),
      observaciones: new FormControl({ value: "", disabled: true }, []),
    });
  }
}
