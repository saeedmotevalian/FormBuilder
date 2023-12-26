import {Component, Injector} from "@angular/core";
import {ServiceApi} from "../network/service/service.api";
import {ActivatedRoute, Router} from "@angular/router";
import {NetworkUtil} from "../util/network.util";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {Location} from "@angular/common";
import {AuthenticatorUtil} from "../util/authenticator.util";

@Component({
  template: ''
})
export abstract class BaseComponent {

  public serviceApi: ServiceApi;
  public router: Router;
  public matDialog: MatDialog;
  public matSnackBar: MatSnackBar;
  public activatedRoute: ActivatedRoute;
  public location: Location;

  protected constructor(injector: Injector) {
    this.serviceApi = injector.get(ServiceApi);
    this.router = injector.get(Router);
    this.matDialog = injector.get(MatDialog);
    this.matSnackBar = injector.get(MatSnackBar);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.location = injector.get(Location);
  }

  ngOnInit(): void {
    this.executeLoader();
  }

  ngAfterViewInit(): void {
  }

  ngAfterContentInit(): void {
  }

  public executeLoader(): void {
    if (NetworkUtil.isInternetConnected()) {
      this.loadOnline();
    } else {
      this.loadOffline();
    }
  }

  public onInternetConnected(): void {
    this.executeLoader();
  }

  public loadOnline(): void {
  }

  public loadOffline(): void {
  }

  hasAccount(): boolean {
    return AuthenticatorUtil.hasAccount();
  }

  onBackPressed() {
    this.location.back();
  }

  onForwardPressed() {
    this.location.forward();
  }
}
