import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Config} from "../../common/config";

export class HeaderInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let temp = req.clone();
    if (Config.TOKEN != null) {
      temp = temp.clone({
        headers: temp.headers.set('Authorization', 'Bearer ' + Config.TOKEN)
      });
    }
    return next.handle(temp);
  }
}
