import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponseBase} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, retry } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authServ: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.authServ.getToken();
    let result: Observable<HttpEvent<any>>;
    if (!token || !token.access_token || token.access_token.length < 1) {
      result = next.handle(request);
    } else {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token.access_token}`)
      });
      result = next.handle(authReq)
    }
    return result.pipe(
      retry(2),
      tap(
        () => {  },
        error => {
          if(error instanceof HttpResponseBase && error.status === 401) {
            console.error('登录状态失效');
          }
        },
      )
    );
  }
}
