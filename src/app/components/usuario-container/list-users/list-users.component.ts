import { UsersService } from 'src/app/providers/security/users.service';
import { Component, OnInit, ViewChild, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Usuario } from 'src/app/class/usuario';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../shared/dialog/confirmation-dialog/confirmation-dialog.component';
import { MessageDialogComponent } from '../../shared/dialog/message-dialog/message-dialog.component';
import { AuthServiceService } from 'src/app/providers/security/auth-service.service';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit, OnChanges {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  displayedColumns: string[] = ['idUsuario', 'Nombre', 'Usuario', 'esJefe', 'email', 'Activo', 'opciones'];

  statusError = false;
  mensaggeError: string;
  showTitle = false;
  loading = true;
  dataSource: any;

  constructor(private sUsers: UsersService, private router: Router, private authService: AuthServiceService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
    console.log('ServiciosAgenteComponent');
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.dataSource);
    this.cargar();
  }

  ngOnChanges() {
    console.log('ngOnChanges');
    this.cargar();
  }

  cargar() {
    this.inicializarBusqueda();
    this.sUsers.getAll(
      this.authService.getIdConcurrentUser()
    ).subscribe(data => {
      // Assign the data to the data source for the table to render
      this.dataSource.data = data;
      console.log(this.dataSource.data);
      this.loading = false;
    }, error => {
      this.dataSource.data = [];
      console.log(error);
      this.loading = false;
    });
  }

  private inicializarBusqueda() {
    this.dataSource.data = [];
  }

  private mostrarTitulo() {
    this.showTitle = true;
  }


  onClickEdit(usuario: Usuario) {
    console.log(usuario);
    this.router.navigate(['/usuario/edit/' + usuario.idUsuario]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  desbloquear(idUser: number) {
    this.loading = true;
    this.sUsers.desbloquear(
      idUser,
      this.authService.getIdConcurrentUser()
    ).subscribe(data => {
      // Assign the data to the data source for the table to render
      console.log(data);
      this.openMessageDialog('Ejecución Exitosa');
      this.loading = false;
      this.cargar();
    }, error => {
      console.log(error);
      this.loading = false;
    });
  }

  bloquear(idUser: number) {
    this.loading = true;
    this.sUsers.bloquear(
      idUser,
      this.authService.getIdConcurrentUser()
    ).subscribe(data => {
      // Assign the data to the data source for the table to render
      console.log(data);
      this.openMessageDialog('Ejecución Exitosa');
      this.loading = false;
      this.cargar();
    }, error => {
      console.log(error);
      this.loading = false;
    });
  }

  confirmDialogActivar(idUser: number, activo: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Esta seguro que desea ' + (activo === 'S' ? 'Bloquear' : 'Desbloquear') + ' este usuario?',
        buttonText: {
          ok: 'Si',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        if (activo === 'S') {
          this.bloquear(idUser);
        } else {
          this.desbloquear(idUser);
        }
        console.log('SI');
      } else {
        console.log('NO');
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
  }
}

