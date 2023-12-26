import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticatorUtil} from "../util/authenticator.util";
import {RouteUtil} from "../util/route.util";

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!AuthenticatorUtil.hasAccount()) {
      return true;
    }
    return this.router.createUrlTree([RouteUtil.DASHBOARD_MODULE, RouteUtil.HOME_COMPONENT]);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!AuthenticatorUtil.hasAccount()) {
      return true;
    }
    return this.router.createUrlTree([RouteUtil.DASHBOARD_MODULE, RouteUtil.HOME_COMPONENT]);
  }
}
