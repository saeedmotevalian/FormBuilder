import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css']
})
export class CustomInputComponent {

  @Input()
  value?: string;
  @Output()
  valueChange = new EventEmitter<string>();
  @Input()
  title?: string;
  @Input()
  key?: string;
  @Input()
  type?: string;
  @Input()
  required: boolean | string = false;
  @Input()
  disabled: boolean = false;
  @Input()
  options: any[] = [];

  onChange(event: any) {
    if (this.type === 'checkbox') {
      this.valueChange.emit(event.target.checked);
    } else {
      this.valueChange.emit(this.value);
    }
  }
}
