import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddInputComponent} from "./add-input/add-input.component";
import {CommonModuleModule} from "../../common-module/common-module.module";
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";


@NgModule({
  declarations: [
    AddInputComponent
  ],
  imports: [
    CommonModule,
    CommonModuleModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle
  ]
})
export class DialogModule {
}
