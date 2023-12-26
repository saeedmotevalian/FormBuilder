import {LocalStorageUtil} from "./local.storage.util";
import {strings} from "../../value/strings";
import {Config} from "../common/config";

export class AuthenticatorUtil {

  public static saveAccount(token: string): boolean {
    this.removeAccount();
    LocalStorageUtil.saveString(strings.account_token, token);

    Config.TOKEN = token;
    return true;
  }

  public static getAccountToken(): string | null {
    Config.TOKEN = <string>LocalStorageUtil.loadString(strings.account_token, null);
    return LocalStorageUtil.loadString(strings.account_token, null);
  }

  public static hasAccount(): boolean {
    return LocalStorageUtil.loadString(strings.account_token, null) != null;
  }

  public static removeAccount(): boolean {
    LocalStorageUtil.remove(strings.account_token);
    return true;
  }
}
