import {Component, Injector, OnInit} from '@angular/core';
import {BaseComponent} from "../../base.component";
import {DataResponse} from "../../../network/service/data.response";
import {SnackBarUtil} from "../../../util/snack.bar.util";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit {

  formId?: number;
  json: any[] = [];
  userFormId?: string;
  defaultForm: any[] = [{
    title: 'FullName',
    key: 'FullName',
    type: 'text',
    required: true,
    disabled: false
  }, {
    title: 'BirthDate',
    key: 'BirthDate',
    type: 'date',
    required: true,
    disabled: false
  }, {
    title: 'Age',
    key: 'Age',
    type: 'number',
    required: false,
    disabled: false
  }, {
    title: 'Description',
    key: 'Description',
    type: 'textarea',
    required: false,
    disabled: false
  }, {
    title: 'Are You Married?',
    key: 'IsMarried',
    type: 'checkbox',
    required: false,
    disabled: false
  }, {
    title: 'Gender',
    key: 'Gender',
    type: 'radio',
    required: false,
    disabled: false,
    options: [{
      label: 'Male'
    }, {
      label: 'Female'
    }]
  }, {
    title: 'Gender2',
    key: 'Gender2',
    type: 'radio',
    required: false,
    disabled: false,
    options: [{
      label: 'Male'
    }, {
      label: 'Female'
    }]
  }, {
    title: 'Country',
    key: 'Country',
    type: 'select',
    required: false,
    disabled: false,
    options: [{
      label: 'USA'
    }, {
      label: 'Canada'
    }]
  }];

  constructor(injector: Injector) {
    super(injector);
  }

  override loadOnline() {
    this.serviceApi.getForm(undefined, undefined, undefined, 'ONE').subscribe((res: DataResponse<any>) => {
      if (res.success) {
        if (res.data) {
          this.json = res.data.Json ? JSON.parse(res.data.Json) : this.defaultForm;
          this.formId = res.data.FormId;
          this.getUserForm();
        } else {
          this.json = this.defaultForm;
        }
      } else {
        SnackBarUtil.makeMessage(this, res.message!);
      }
    }, (error: any) => {
      SnackBarUtil.makeMessage(this, 'Something went wrong');
    });
  }

  getUserForm() {
    this.serviceApi.getUserForm(undefined, undefined, undefined, 'ALL', {
      Filter: {
        Values: [{
          Field: 'FormId',
          Type: 'FormId',
          Value: this.formId
        }],
        Type: 'AND'
      }
    }).subscribe((res: DataResponse<any>) => {
      if (res.success) {
        if (res.data && res.data.length > 0) {
          this.userFormId = res.data[0].UserFormId;
          let result = JSON.parse(res.data[0].Data);
          this.json = this.json.map((input: any) => {
            input.value = (result.find((userFormDetail: any) => {
              return userFormDetail.key === input.key;
            }) ?? {}).value;
            return input;
          });
        }
      } else {
        SnackBarUtil.makeMessage(this, res.message!);
      }
    }, (error: any) => {
      SnackBarUtil.makeMessage(this, 'Something went wrong');
    });
  }

  onSubmit(inputs: any[]) {
    (this.userFormId ? this.serviceApi.updateUserForm(this.userFormId, {
      FormId: this.formId,
      Data: JSON.stringify(inputs.map((input: any) => {
        return {
          key: input.key,
          value: input.value
        };
      }))
    }) : this.serviceApi.createUserForm({
      FormId: this.formId,
      Data: JSON.stringify(inputs.map((input: any) => {
        return {
          key: input.key,
          value: input.value
        };
      }))
    })).subscribe((res: DataResponse<any>) => {
      if (res.success) {
        if (!this.userFormId) {
          this.userFormId = res.data.dataValues.UserFormId;
        }
      } else {
        SnackBarUtil.makeMessage(this, res.message!);
      }
    }, (error: any) => {
      SnackBarUtil.makeMessage(this, 'Something went wrong');
    });
  }
}
