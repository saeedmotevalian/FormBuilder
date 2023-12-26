import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {AuthenticationModule} from "./authentication/authentication.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {CommonModuleModule} from "./common-module/common-module.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HeaderInterceptor} from "../network/header/header.interceptor";


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    DashboardModule,
    CommonModuleModule
  ],
  bootstrap: [AppComponent],
  providers: [{
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
    useValue: {duration: 2500}
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptor,
    multi: true
  }]
})
export class AppModule {
}
