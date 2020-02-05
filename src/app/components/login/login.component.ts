import { Constantes } from 'src/app/util/Constantes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/util/error-matcher ';
import { UsersService } from 'src/app/providers/security/users.service';
import { AuthServiceService } from 'src/app/providers/security/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  user: string;
  password: string;
  loginForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  loading = false;
  statusError = false;
  mensaggeError: string;

  constructor(private formBuilder: FormBuilder, private sAuth: AuthServiceService, private router: Router) {
    this.createFormGroup();
  }

  ngOnInit() {
  }

  createFormGroup() {
    this.loginForm = this.formBuilder.group({
      user: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
      ])
    });
    console.log(this.loginForm);
  }

  private inicializarLogin() {
    this.loading = true;
    this.statusError = false;
  }

  login() {
    this.inicializarLogin();
    this.sAuth.login(this.user, this.password).subscribe(data => {
      console.log(data);
      this.loading = false;
      localStorage.setItem(Constantes.LOGIN_USER, JSON.stringify(data));
      localStorage.setItem(Constantes.LOGIN_TOKEN, data.token);
      this.router.navigate(['/servicios']);
    }, error => {
      if (error.status === 401) {
        this.mensaggeError = 'Usuario y/o Contraseña Incorrectos.';
      } else {

        if (error.statusText === 'Unknown Error') {
          this.mensaggeError = 'Se produjo un error, compruebe su conexion a internet.';
        } else {
          this.mensaggeError = 'Se produjo un error ' + error.statusText;
        }
      }

      if (error.status === 503) {
        console.log('error 503');
      }

      console.log(error);
      this.statusError = true;
      this.loading = false;
    });
  }

  /*login() {
    this.sAuth.getEcho().subscribe(data => {
      // Assign the data to the data source for the table to render
      console.log(data);
    }, error => {
      console.log(error);
    });
  }*/

  onPressEnter(event: any) {
    if (event.keyCode === 13) {
      if (this.loginForm.status === 'VALID') {
        console.log('onClickEnter');
        this.login();
        return false;
      }
    }
  }
}
