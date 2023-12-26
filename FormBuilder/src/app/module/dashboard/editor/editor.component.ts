import {Component, EventEmitter, Injector, Input, Output} from '@angular/core';
import {AddInputComponent} from "../dialog/add-input/add-input.component";
import {AddInputOptions} from "../dialog/add-input/options/add.input.options";
import {MatDialog} from "@angular/material/dialog";
import {DataResponse} from "../../../network/service/data.response";
import {SnackBarUtil} from "../../../util/snack.bar.util";
import {BaseComponent} from "../../base.component";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent extends BaseComponent {

  @Input()
  json?: any[];
  @Output()
  jsonChange = new EventEmitter<any[]>();
  @Input()
  formId?: number;

  constructor(injector: Injector, matDialog: MatDialog) {
    super(injector);
  }

  onAddMoreClicked() {
    let addInputOptions = new AddInputOptions();
    addInputOptions.onSubmitClicked = (input: any) => {
      if (!this.json) {
        this.json = [];
      }
      this.json.push(input);
    };
    let addInputComponent = this.matDialog.open(AddInputComponent, {
      height: 'auto',
      width: '100%'
    });
    addInputComponent.componentInstance.addInputOptions = addInputOptions;
  }

  onCreateClicked() {
    (this.formId ? this.serviceApi.updateForm(this.formId, {
      Json: JSON.stringify(this.json)
    }) : this.serviceApi.createForm({
      Json: JSON.stringify(this.json)
    })).subscribe((res: DataResponse<any>) => {
      if (res.success) {
        if (!this.formId) {
          this.formId = res.data.dataValues.FormId;
        }
      } else {
        SnackBarUtil.makeMessage(this, res.message!);
      }
    }, (error: any) => {
      SnackBarUtil.makeMessage(this, 'Something went wrong');
    });
  }

  onInputRemoved(index: number) {
    if (!this.json) {
      return;
    }
    this.json.splice(index, 1);
  }
}
