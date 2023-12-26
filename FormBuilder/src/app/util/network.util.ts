export class NetworkUtil {

  public static isInternetConnected(): boolean {
    return window.navigator.onLine;
  }
}
