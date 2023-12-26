import {Component, Injector, OnInit} from '@angular/core';
import {RouteUtil} from "../../util/route.util";
import {BaseComponent} from "../base.component";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent extends BaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }

  onHomeClicked() {
    this.router.navigate([RouteUtil.DASHBOARD_MODULE, RouteUtil.HOME_COMPONENT]).then();
  }
}
