import {BaseComponent} from "../module/base.component";

export class SnackBarUtil {

  public static makeMessage(baseComponent: BaseComponent, text: string) {
    baseComponent.matSnackBar.open(text);
  }

  public static makeMessageWithAction(baseComponent: BaseComponent, text: string, actionText: string, action: () => void) {
    let matSnackBar = baseComponent.matSnackBar.open(text, actionText);
    matSnackBar.onAction().subscribe(() => {
      action();
    });
  }
}
