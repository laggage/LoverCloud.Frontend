import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class BaseService {

  constructor() { }

  /**
   * http请求错误处理
   * @param error 
   */
  protected handleError(error: any) {
    return new Observable<HttpErrorResponse>(s => {
      s.next(error);
      s.complete();
    })
  }
}
