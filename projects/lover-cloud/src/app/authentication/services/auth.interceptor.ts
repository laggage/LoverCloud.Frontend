import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authServ: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.authServ.getToken();
    if(!token || !token.access_token || token.access_token.length<1){
      return next.handle(request);
    } else {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token.access_token}`)
      });
      return next.handle(authReq);
    }
  }
}
