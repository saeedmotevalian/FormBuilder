export class DataResponse<T> {

  success?: boolean;
  data?: T;
  token?: string;
  message?: string;
}
