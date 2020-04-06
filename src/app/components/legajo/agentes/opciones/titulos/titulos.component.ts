import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
  FormGroupDirective,
} from "@angular/forms";

@Component({
  selector: "app-titulos",
  templateUrl: "./titulos.component.html",
  styleUrls: ["./titulos.component.css"],
})
export class TitulosComponent implements OnInit {
  titulosAgenteForm: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createAgenteFormGroup();
  }

  createAgenteFormGroup() {
    this.titulosAgenteForm = this.formBuilder.group({
      titulo: new FormControl({ value: "", disabled: true }, []),
      duracion: new FormControl({ value: "", disabled: true }, []),
      fechaEgreso: new FormControl({ value: "", disabled: true }, []),
      institucion: new FormControl({ value: "", disabled: true }, []),
    });
  }
}
