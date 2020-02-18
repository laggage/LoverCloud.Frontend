import { Injectable } from '@angular/core';
import { User } from 'projects/lover-cloud/src/shared/models/user';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Token } from 'projects/lover-cloud/src/shared/models/token';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'projects/lover-cloud/src/environments/environment';
import { catchError, retry } from 'rxjs/operators';
import { ImageService } from '../../lover-cloud/services/image.service';
import { BaseService } from 'projects/lover-cloud/src/shared/services/base.service';

@Injectable()
export class UserService extends BaseService {
  private user: User;
  private url: string = `${environment.apiHostUrl}${environment.userEndPoint}`

  constructor(
    private authServ: AuthService,
    private http: HttpClient,
    private imgServ: ImageService
  ) { 
    super();
  }

  public setLoveDay(date: Date) {
    return this.patchUser({
      value: date,
      path: '/lover/loveDay/date',
      op: 'replace'
    })
  }

  public patchUser(patchDoc: {
    value: any,
    path: string,
    op: 'replace' | 'remove' | 'add',
    from?: string
  }) {
    return this.http.patch(this.url, [patchDoc], {
      observe: 'response'
    }).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  public getUser(refresh: boolean = false): Observable<User | HttpErrorResponse> {
    return new Observable(s => {
      let token: Token = this.authServ.getToken();
      if (!token || !token.access_token || token.access_token.length < 1) {
        s.next(null);
      }
      if (!this.user || refresh) {
        this.http.get<User>(this.url, {
          observe: 'response'
        }).pipe(
          retry(2),
          catchError(this.handleError)
        ).subscribe(u => {
          if (u.ok && u.status === 200) {
            this.user = Object.assign(new User(this.imgServ), u.body);
            s.next(this.user);
          } else s.next(u as HttpErrorResponse);
          s.complete();
        });
      } else {
        s.next(this.user);
        s.complete();
      }
    });
  }

  
}
