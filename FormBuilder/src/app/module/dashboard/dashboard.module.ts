import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {EditorComponent} from "./editor/editor.component";
import {ViewerComponent} from "./viewer/viewer.component";
import {HomeComponent} from "./home/home.component";
import {CommonModuleModule} from "../common-module/common-module.module";
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    HomeComponent,
    EditorComponent,
    ViewerComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CommonModuleModule,
    MatIconModule,
    HttpClientModule
  ]
})
export class DashboardModule {
}
