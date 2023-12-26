import {Component, Injector} from '@angular/core';
import {BaseComponent} from "../../base.component";
import {SnackBarUtil} from "../../../util/snack.bar.util";
import {DataResponse} from "../../../network/service/data.response";
import {AuthenticatorUtil} from "../../../util/authenticator.util";
import {RouteUtil} from "../../../util/route.util";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent extends BaseComponent {

  username?: string;
  password?: string;

  constructor(injector: Injector) {
    super(injector);
  }

  onSignInClicked() {
    if (!this.username || this.username.trim() === '') {
      SnackBarUtil.makeMessage(this, 'Please fill the username.');
      return;
    }
    if (!this.password || this.password.trim() === '') {
      SnackBarUtil.makeMessage(this, 'Please fill the password.');
      return;
    }
    this.serviceApi.signIn(this.username.trim(), this.password.trim()).subscribe((res: DataResponse<string>) => {
      if (res.success) {
        AuthenticatorUtil.saveAccount(res.token!);
        this.router.navigate([RouteUtil.DASHBOARD_MODULE, RouteUtil.HOME_COMPONENT]);
      } else {
        SnackBarUtil.makeMessage(this, res.message!);
      }
    }, (error: any) => {
      SnackBarUtil.makeMessage(this, 'Something went wrong');
    });
  }

  onSignUpClicked() {
    this.router.navigate([RouteUtil.AUTHENTICATION_MODULE, RouteUtil.SIGN_UP_COMPONENT]);
  }
}
