import {Component, Injector} from '@angular/core';
import {BaseComponent} from "../../base.component";
import {SnackBarUtil} from "../../../util/snack.bar.util";
import {AuthenticatorUtil} from "../../../util/authenticator.util";
import {DataResponse} from "../../../network/service/data.response";
import {RouteUtil} from "../../../util/route.util";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent extends BaseComponent {

  username?: string;
  password?: string;
  passwordRepeat?: string;

  constructor(injector: Injector) {
    super(injector);
  }

  onSignUpClicked() {
    if (!this.username || this.username.trim() === '') {
      SnackBarUtil.makeMessage(this, 'Please fill the username.');
      return;
    }
    if (!this.password || this.password.trim() === '') {
      SnackBarUtil.makeMessage(this, 'Please fill the password.');
      return;
    }
    if (!this.passwordRepeat || this.passwordRepeat.trim() === '') {
      SnackBarUtil.makeMessage(this, 'Please fill the password repeat.');
      return;
    }
    if (this.password.trim() !== this.passwordRepeat.trim()) {
      SnackBarUtil.makeMessage(this, 'Passwords must be equal.');
      return;
    }
    this.serviceApi.signUp(this.username.trim(), this.password.trim()).subscribe((res: DataResponse<string>) => {
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

  onSignInClicked() {
    this.router.navigate([RouteUtil.AUTHENTICATION_MODULE, RouteUtil.SIGN_IN_COMPONENT]);
  }
}
