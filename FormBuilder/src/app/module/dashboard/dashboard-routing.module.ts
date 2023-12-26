import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RouteUtil} from "../../util/route.util";

const routes: Routes = [{
  path: '',
  loadChildren: () => import('./dialog/dialog.module').then(module => module.DialogModule)
}, {
  path: RouteUtil.HOME_COMPONENT,
  component: HomeComponent
}, {
  path: '',
  component: HomeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
