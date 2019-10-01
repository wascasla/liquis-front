import { Injectable, Injector } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthServiceService } from './auth-service.service';


@Injectable()
export class AuthGuardService implements CanActivate {

  private authServiceService: AuthServiceService;

  constructor(private router: Router, private injector: Injector) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      this.authServiceService = this.injector.get(AuthServiceService);

      if (this.authServiceService.isAuthenticated()) {
          // logged in so return true
          console.log('logged in so return true');
          return true;
      }
      // not logged in so redirect to login page
      console.log('not logged in so redirect to login page');
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
  }
}
