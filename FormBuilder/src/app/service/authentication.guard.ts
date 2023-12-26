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
export class AuthenticationGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (AuthenticatorUtil.hasAccount()) {
      return true;
    }
    return this.router.createUrlTree([RouteUtil.AUTHENTICATION_MODULE, RouteUtil.SIGN_IN_COMPONENT]);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (AuthenticatorUtil.hasAccount()) {
      return true;
    }
    return this.router.createUrlTree([RouteUtil.AUTHENTICATION_MODULE, RouteUtil.SIGN_IN_COMPONENT]);
  }
}
