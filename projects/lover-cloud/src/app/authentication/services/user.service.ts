import { Injectable } from '@angular/core';
import { User } from 'projects/lover-cloud/src/shared/models/user';
import { AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Token } from 'projects/lover-cloud/src/shared/models/token';
import { HttpClient, HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { environment } from 'projects/lover-cloud/src/environments/environment';
import { catchError, retry, last } from 'rxjs/operators';
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
      if (!this.user || refresh) {
        this.http.get<User>(this.url, {
          observe: 'response',
          params: {
            'fields': 'id, userName, profileImageUrl, sex, birth, spouse, lover, loverLogCount, loverAlbumCount, loverAnniversaryCount',
          }
        }).pipe(
          catchError(this.handleError)
        ).subscribe(u => {
          if (u.ok && u.status === 200) {
            this.user = Object.assign(new User(this.imgServ), u.body);
            this.user.spouse = Object.assign(new User(this.imgServ), this.user.spouse);
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
