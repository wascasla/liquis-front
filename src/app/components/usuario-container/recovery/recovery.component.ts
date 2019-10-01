import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthServiceService } from 'src/app/providers/security/auth-service.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

  loading = false;
  statusError = false;
  mensaggeError: string;
  statusSend = false;
  recoveryForm: FormGroup;
  mail: string;

  constructor(private formBuilder: FormBuilder, private sAuth: AuthServiceService) {
    this.createFormGroup();
  }

  ngOnInit() {
  }

  createFormGroup() {
    this.recoveryForm = this.formBuilder.group({
      mail: new FormControl('', [
        Validators.required,
        Validators.email
      ])
    });
    console.log(this.recoveryForm);
  }

  recoveryPassword() {
    this.loading = true;
    this.sAuth.recovery(this.mail).subscribe(data => {
      console.log(data);
      if (data.estado === 0) {
        this.statusSend = true;
      } else if (data.estado === 500) {
        this.statusError = true;
        this.mensaggeError = 'El mail ingresado no existe.';
      } else {
        this.statusError = true;
        this.mensaggeError = 'Se produjo un error, al enviar el email.';
      }
      this.loading = false;
    }, error => {
      if (error.statusText === 'Unknown Error') {
        this.mensaggeError = 'Se produjo un error, compruebe su conexion a internet.';
      } else {
        this.mensaggeError = 'Se produjo un error ' + error.statusText;
      }

      console.log(error);
      this.statusError = true;
      this.loading = false;
    });
  }
}
