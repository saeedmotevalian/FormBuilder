import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteUtil} from "../util/route.util";
import {AuthenticationGuard} from "../service/authentication.guard";
import {DashboardGuard} from "../service/dashboard.guard";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [{
  path: RouteUtil.AUTHENTICATION_MODULE,
  loadChildren: () => import('./authentication/authentication.module').then(module => module.AuthenticationModule),
  canActivateChild: [DashboardGuard]
}, {
  path: RouteUtil.DASHBOARD_MODULE,
  loadChildren: () => import('./dashboard/dashboard.module').then(module => module.DashboardModule),
  canActivateChild: [AuthenticationGuard]
}, {
  path: '',
  loadChildren: () => import('./dashboard/dashboard.module').then(module => module.DashboardModule),
  canActivateChild: [AuthenticationGuard]
}, {
  path: '**',
  component: PageNotFoundComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
