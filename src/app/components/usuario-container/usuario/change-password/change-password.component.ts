import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PasswordValidation } from 'src/app/util/validator/password-validator';
import { MyErrorStateMatcher } from 'src/app/util/error-matcher ';
import { AuthServiceService } from 'src/app/providers/security/auth-service.service';
import { UsersService } from 'src/app/providers/security/users.service';
import { Usuario } from 'src/app/class/usuario';
import { Constantes } from 'src/app/util/Constantes';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MessageDialogComponent } from 'src/app/components/shared/dialog/message-dialog/message-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/components/shared/dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {


  changePasswordForm: FormGroup;
  password: string;
  confirmPassword: string;
  matcher = new MyErrorStateMatcher();
  usuario: any;
  loading = false;
  statusError = false;
  mensaggeError: string;

  constructor(private formBuilder: FormBuilder, private sUser: UsersService, private sAuth: AuthServiceService,
              private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.createFormGroup();
    this.obtenerUsuarioActual();
  }

  createFormGroup() {
    this.changePasswordForm = this.formBuilder.group({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: ['', Validators.required],
    }, { validators: PasswordValidation.MatchPassword });
  }

  obtenerUsuarioActual() {
    this.usuario = this.sAuth.getConcurrentUser();
  }

  guardar() {
    this.loading = true;
    // tslint:disable-next-line:no-debugger
    debugger;
    this.sUser.cambiarPasswordByUsuario(this.password, this.usuario.user.idUsuario).subscribe(data => {
      console.log(data);
      this.loading = false;
      if (data.estado === 500) {
        this.mensaggeError = data.diagnostico;
      } else {
        this.openMessageDialog('La modificación fue éxitosa. Inicie sesión nuevamente.');
      }
    }, error => {
      this.loading = false;
      if (error.statusText === 'Unknown Error') {
        this.mensaggeError = 'Se produjo un error, compruebe su conexion a internet.';
      } else {
        this.mensaggeError = 'Se produjo un error ' + error.statusText;
      }
    });
  }

  openMessageDialog(info: string) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: {
        message: info,
        buttonText: {
          cancel: 'Aceptar'
        }
      },
    });

    dialogRef.afterClosed().subscribe( data => {
      this.sAuth.logout();
      this.router.navigate(['/login']);
    });
  }

  confirmDialogCancelar() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Esta seguro que desea Cancelar la operación?',
        buttonText: {
          ok: 'Si',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log('SI');
        this.router.navigate(['/servicios']);
      } else {
        console.log('NO');
      }
    });
  }
}
