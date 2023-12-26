import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent {

  @Input()
  json?: any[];
  @Output()
  jsonChange = new EventEmitter<any[]>();
  @Output()
  onSubmit = new EventEmitter<any[]>();
  @Input()
  formId?: number;

  onSubmitClicked() {
    this.onSubmit.emit(this.json);
  }

  onResetClicked() {
    if (!this.json) {
      return;
    }
    for (let i = 0; i < this.json.length; i++) {
      this.json[i].value = undefined;
    }
  }
}
