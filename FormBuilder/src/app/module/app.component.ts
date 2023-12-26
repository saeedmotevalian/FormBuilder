import {Component} from '@angular/core';
import {AuthenticatorUtil} from "../util/authenticator.util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ngOnInit(): void {
    window.addEventListener('storage', () => {
      window.location.href = '/';
    });
    if (AuthenticatorUtil.hasAccount()) {
      AuthenticatorUtil.getAccountToken();
    }
  }
}
