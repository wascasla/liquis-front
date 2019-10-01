import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthServiceService } from 'src/app/providers/security/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  usuario: any;

  constructor(private authService: AuthServiceService, private router: Router) { }

  ngOnInit() {
  }

  isAuth() {
    this.usuario = this.authService.getConcurrentUser();
    return this.authService.isAuthenticated();
  }

  cerrarSession() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  cambiarPassword() {
    this.router.navigate(['/changepasword']);
  }

}
