import { UsersService } from 'src/app/providers/security/users.service';
import { Component, OnInit, ViewContainerRef, NgZone, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors, FormControl } from '@angular/forms';
import { Usuario } from 'src/app/class/Usuario';
import { MyErrorStateMatcher } from 'src/app/util/error-matcher ';
import { PasswordValidation } from 'src/app/util/validator/password-validator';
import { MatDialog, MatSnackBar, MatSnackBarConfig, MAT_SNACK_BAR_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';
import { BuscarAgenteComponent } from 'src/app/components/shared/dialog/buscar-agente/buscar-agente.component';
import { BuscarReparticionComponent } from 'src/app/components/shared/dialog/buscar-reparticion/buscar-reparticion.component';
import { BuscarRolesComponent } from 'src/app/components/shared/dialog/buscar-roles/buscar-roles.component';
import { ConfirmationDialogComponent } from 'src/app/components/shared/dialog/confirmation-dialog/confirmation-dialog.component';
import { AuthServiceService } from 'src/app/providers/security/auth-service.service';

export interface Modo {
  value: string;
  descripcion: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  usuario: Usuario;

  primerFormGroup: FormGroup;
  segundoFormGroup: FormGroup;
  tercerFormGroup: FormGroup;

  esAgente = false;
  esJefe = false;
  loading = false;
  IdUser: number;
  confirmPassword: string;

  statusError = false;
  mensaggeError: string;
  matcher = new MyErrorStateMatcher();

  modosList: Modo[] = [
    { value: '2', descripcion: 'Escuela' },
    { value: '1', descripcion: 'Sistema' },
  ];

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private snackBar: MatSnackBar, private zone: NgZone,
              private sUsuario: UsersService, private router: Router, private activatedRouter: ActivatedRoute,
              private authService: AuthServiceService) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    // tslint:disable-next-line:no-string-literal
    this.IdUser = this.activatedRouter.snapshot.params['IdUser'];
    if (this.IdUser) {
      console.log('Id User');
      console.log(this.IdUser);
      this.getUser(this.IdUser);
      this.buidFormAdd();
    } else {
      this.buidFormAdd();
    }
  }

  buidFormAdd() {
    this.primerFormGroup = this.formBuilder.group({
      usuario: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: ['', Validators.required],
      mail: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      nombres: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      modo: new FormControl('', [
        Validators.required
      ]),
      esJefe: [''],
      esAgente: [''],
    }, { validators: PasswordValidation.MatchPassword });
    this.segundoFormGroup = this.formBuilder.group({
      permisos: ['']
    });
    this.tercerFormGroup = this.formBuilder.group({
      roles: ['']
    });
  }

  buidFormEdit() {
    this.primerFormGroup = this.formBuilder.group({
      usuario: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      mail: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      nombres: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      modo: new FormControl('', [
        Validators.required
      ]),
      esJefe: [''],
      esAgente: [''],
    });
    this.segundoFormGroup = this.formBuilder.group({
      permisos: ['']
    });
    this.tercerFormGroup = this.formBuilder.group({
      roles: ['']
    });
  }

  openAgenteDialog() {
    const dialogAgenteRef = this.dialog.open(BuscarAgenteComponent, {
      width: '700px',
      data: true
    });

    dialogAgenteRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result.ID) {
        console.log(result);
        this.usuario.Nombre = result.ApellidosYNombres;
        this.usuario.Agente = result.ID;
        this.esAgente = true;
      }
    });
    return false;
  }

  openReparticionDialog() {
    const dialogReparticionRef = this.dialog.open(BuscarReparticionComponent, {
      width: '700px',
      data: true
    });

    dialogReparticionRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result.idReparticion) {
        const check = this.usuario.reparticion.find(search => search.idReparticion === result.idReparticion);
        console.log(check);
        if (typeof check === 'undefined') {
          this.usuario.reparticion.push(result);
        } else {
          this.alert('La reparticion seleccionada ya fue ingresada.');
        }
      }
    });
    return false;
  }

  openRolesDialog() {
    const dialogRolRef = this.dialog.open(BuscarRolesComponent, {
      width: '700px',
      data: true
    });

    dialogRolRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result.idRol) {
        const check = this.usuario.roles.find(search => search.idRol === result.idRol);
        console.log(check);
        if (typeof check === 'undefined') {
          this.usuario.roles.push(result);
        } else {
          this.alert('El rol seleccionado ya fue ingresado.');
        }
      }
    });
    return false;
  }

  alert(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.verticalPosition = 'top';
    config.horizontalPosition = 'center';
    config.duration = 5000;
    this.zone.run(() => {
      this.snackBar.open(message, 'X', config);
    });
    console.log(config);
    console.log(this.snackBar);
  }

  onCheckedEsAgente() {
    this.usuario.Nombre = '';
    this.usuario.Agente = -1;
    this.esAgente = false;
  }

  onCheckedEsJefe(evento) {
    this.usuario.esJefe = 'N';
    if (evento.checked) {
      this.usuario.esJefe = 'S';
    }
  }

  onClickDeleteRol(position: number) {
    this.confirmDialogRol(position);
  }

  onClickDeleteReparticion(position: number) {
    this.confirmDialogReparticion(position);
  }

  deleteRol(position: number) {
    console.log(position);
    if (position >= 0) {
      this.usuario.roles.splice(position, 1);
    } else {
      this.alert('El rol seleccionado ya fue eliminado.');
    }
  }

  deleteReparticion(position: number) {
    console.log(position);
    if (position >= 0) {
      this.usuario.reparticion.splice(position, 1);
    } else {
      this.alert('El rol seleccionado ya fue eliminado.');
    }
  }

  guardar() {
    this.loading = true;
    this.statusError = false;
    if (this.usuario.idUsuario) {
      this.actualizar();
    } else {
      this.nuevo();
    }
  }

  private actualizar() {
    this.sUsuario.actualizar(this.usuario).subscribe(data => {
      console.log(data);
      this.loading = false;
      if (data.estado !== 0) {
        this.statusError = true;
        this.mensaggeError = data.diagnostico;
      } else {
        this.router.navigate(['/listado/usuario']);
      }
    }, error => {
      console.log(error);
      this.loading = false;
      this.statusError = true;
      this.mensaggeError = 'Se produjo un error ' + error.statusText;
    });
  }

  private nuevo() {
    this.sUsuario.nuevo(this.usuario).subscribe(data => {
      console.log(data);
      this.loading = false;
      if (data.estado !== 0) {
        this.statusError = true;
        this.mensaggeError = data.diagnostico;
      } else {
        this.router.navigate(['/listado/usuario']);
      }
    }, error => {
      console.log(error);
      this.loading = false;
      this.statusError = true;
      this.mensaggeError = 'Se produjo un error ' + error.statusText;
    });
  }

  onModoSelect() {
    console.log(this.usuario.Modo);
  }

  private getUser(idUser: number) {
    this.loading = true;
    this.sUsuario.getUser(
      idUser,
      this.authService.getIdConcurrentUser()
    ).subscribe(data => {
      // Assign the data to the data source for the table to render
      this.usuario = data;
      this.confirmPassword = this.usuario.password;
      if (this.usuario.Agente) {
        this.esAgente = true;
      }
      if (this.usuario.esJefe === 'S') {
        this.esJefe = true;
      }
      console.log(this.usuario);
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
    });
  }

  onClickGuardar() {
    let title;
    if (this.usuario.idUsuario) {
      title = 'Esta seguro que desea modificar?';
    } else {
      title = 'Esta seguro que desea guardar?';
    }
    this.confirmDialog(title);
  }

  confirmDialog(title: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: title,
        buttonText: {
          ok: 'Save',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log('SI');
        this.guardar();
      } else {
        console.log('NO');
      }
    });
  }

  confirmDialogRol(position: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Esta seguro que desea eliminar esta Rol?',
        buttonText: {
          ok: 'Si',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log('SI');
        this.deleteRol(position);
      } else {
        console.log('NO');
      }
    });
  }

  confirmDialogReparticion(position: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Esta seguro que desea eliminar esta Repartición?',
        buttonText: {
          ok: 'Si',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log('SI');
        this.deleteReparticion(position);
      } else {
        console.log('NO');
      }
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
        this.router.navigate(['/listado/usuario']);
      } else {
        console.log('NO');
      }
    });
  }

}
