import {Component} from '@angular/core';
import {AddInputOptions} from "./options/add.input.options";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-input',
  templateUrl: './add-input.component.html',
  styleUrls: ['./add-input.component.css']
})
export class AddInputComponent {

  addInputOptions = new AddInputOptions();
  title?: string;
  key?: string;
  type?: string;
  options: any[] = [{label: 'label1'}];
  required?: string;
  disabled?: string;

  constructor(private matDialogRef: MatDialogRef<AddInputComponent>) {
  }

  onAddOptionClicked() {
    this.options.push({label: 'label' + (this.options.length + 1)});
  }

  onSubmitClicked() {
    this.addInputOptions.onSubmitClicked({
      title: this.title,
      key: this.key,
      type: this.type,
      required: this.required,
      disabled: this.disabled
    });
    this.matDialogRef.close();
  }
}
