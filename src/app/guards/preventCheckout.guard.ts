import {Injectable} from '@angular/core';
import {CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate} from '@angular/router';
import {Observable} from 'rxjs';
import {CheckoutService} from '../services/checkout.service';

@Injectable({
  providedIn: 'root'
})
export class PreventCheckoutGuard implements CanActivate {
  constructor(private checkoutService: CheckoutService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.checkoutService.isValid) {
      return true;
    } else {
      this.router.navigate(['cart'], {
        queryParams: {returnUrl: state.url}
      });
    }
  }
}
