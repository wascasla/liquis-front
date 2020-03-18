import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
  FormGroupDirective
} from "@angular/forms";

@Component({
  selector: "app-personas",
  templateUrl: "./personas.component.html",
  styleUrls: ["./personas.component.css"]
})
export class PersonasComponent implements OnInit {
  PersonaForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createPersonaFormGroup();
  }

  createPersonaFormGroup() {
    this.PersonaForm = this.formBuilder.group({
      apellido: new FormControl({ value: "", disabled: true }, []),
      nombres: new FormControl({ value: "", disabled: true }, []),
      sexo: new FormControl({ value: "", disabled: true }, []),
      fechaNacimiento: new FormControl({ value: "", disabled: true }, []),
      localidadNacimiento: new FormControl({ value: "", disabled: true }, []),
      nacionalidad: new FormControl({ value: "", disabled: true }, []),
      tipoDocumento: new FormControl(false),
      nroDocumento: new FormControl({ value: "", disabled: true }, null),
      cuil: new FormControl({ value: "", disabled: true }, null),
      email: new FormControl({ value: "", disabled: true }, null),
      telefonoFijo: new FormControl({ value: "", disabled: true }, null),
      telefonoMovil: new FormControl({ value: "", disabled: true }, null),
      fechaBaja: new FormControl({ value: "", disabled: true }, null)
    });
  }
}
