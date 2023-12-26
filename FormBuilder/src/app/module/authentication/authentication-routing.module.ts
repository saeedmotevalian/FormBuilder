import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {RouteUtil} from "../../util/route.util";

const routes: Routes = [{
  path: RouteUtil.SIGN_IN_COMPONENT,
  component: SignInComponent
}, {
  path: RouteUtil.SIGN_UP_COMPONENT,
  component: SignUpComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {
}
