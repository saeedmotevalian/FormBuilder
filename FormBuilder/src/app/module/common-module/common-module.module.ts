import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomInputComponent} from "./custom-input/custom-input.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CustomInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CustomInputComponent
  ]
})
export class CommonModuleModule {
}
