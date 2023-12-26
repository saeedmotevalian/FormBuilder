import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ServicePath} from "./service.path";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ServiceApi {

  constructor(private http: HttpClient) {
  }

  reformatQuery(queries: any[], useAndMark = false): string {
    let filledValues = queries.filter((query: any) => {
      return query.value && query.value !== undefined && query.value !== null;
    });
    let concatQueries = filledValues.map((query: any) => {
      return query.key + '=' + query.value;
    });
    if (concatQueries.length > 0) {
      return (useAndMark ? '&' : '?') + concatQueries.join('&');
    }
    return '';
  }

  public signIn(username: string, password: string): Observable<any> {
    return this.http.post(environment.baseUrl + ServicePath.SIGN_IN + this.reformatQuery([{
      key: 'username',
      value: username
    }, {
      key: 'password',
      value: password
    }]), null);
  }

  public signUp(username: string, password: string): Observable<any> {
    return this.http.post(environment.baseUrl + ServicePath.SIGN_UP, {
      UserName: username,
      Password: password
    });
  }

  public getForm(offset?: number, limit?: number, extra?: string, requestType?: string, filters?: any): Observable<any> {
    return this.http.post(environment.baseUrl + ServicePath.GET_FORM + this.reformatQuery([{
      key: 'offset',
      value: offset
    }, {
      key: 'limit',
      value: limit
    }, {
      key: 'extra',
      value: extra
    }, {
      key: 'RequestType',
      value: requestType
    }]), filters);
  }

  public createForm(Form: any): Observable<any> {
    return this.http.post(environment.baseUrl + ServicePath.CREATE_FORM, Form);
  }

  public updateForm(FormId: number, Form: any): Observable<any> {
    return this.http.put(environment.baseUrl + ServicePath.UPDATE_FORM + '/' + FormId, Form);
  }

  public getUserForm(offset?: number, limit?: number, extra?: string, requestType?: string, filters?: any): Observable<any> {
    return this.http.post(environment.baseUrl + ServicePath.GET_USER_FROM + this.reformatQuery([{
      key: 'offset',
      value: offset
    }, {
      key: 'limit',
      value: limit
    }, {
      key: 'extra',
      value: extra
    }, {
      key: 'RequestType',
      value: requestType
    }]), filters);
  }

  public createUserForm(UserForm: any): Observable<any> {
    return this.http.post(environment.baseUrl + ServicePath.CREATE_USER_FROM, UserForm);
  }

  public updateUserForm(UserFormId: string, UserForm: any): Observable<any> {
    return this.http.put(environment.baseUrl + ServicePath.UPDATE_USER_FROM + '/' + UserFormId, UserForm);
  }
}
