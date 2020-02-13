import { Injectable } from '@angular/core';
import { User } from 'projects/lover-cloud/src/shared/models/user';
import { AuthService } from './auth.service';
import { throwError, Observable } from 'rxjs';
import { Token } from 'projects/lover-cloud/src/shared/models/token';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'projects/lover-cloud/src/environments/environment';
import { catchError } from 'rxjs/operators';
import { ImageService } from '../../lover-cloud/services/image.service';

@Injectable()
export class UserService {
  private user: User;
  private useGetUrl: string = `${environment.apiHostUrl}${environment.userEndPoint}`

  constructor(
    private authServ: AuthService,
    private http: HttpClient,
    private imgServ: ImageService
  ) { }

  public getUser(refresh: boolean = false): Observable<User|HttpErrorResponse> {
    return new Observable(s => {
      let token: Token = this.authServ.getToken();
      // console.log(token);
      if (!token || !token.access_token || token.access_token.length < 1) {
        s.next(null);
      }
      if (!this.user || refresh) {
        this.http.get<User>(this.useGetUrl, {
          headers: {
            'Authorization': `Bearer ${token.access_token}`
          },
          observe: 'response'
        }).pipe(
          catchError((error: HttpErrorResponse) => {
            return new Observable<HttpErrorResponse>(s => s.next(error));
          })
        ).subscribe(u => {
          if(u.ok && u.status === 200) {
            u.body.spouse = Object.assign(new User(this.imgServ), u.body.spouse);
            s.next(Object.assign(new User(this.imgServ), u.body)); 
          } else s.next(u as HttpErrorResponse);
        });
      } else {
        this.user.spouse = Object.assign(new User(this.imgServ), this.user.spouse);
        s.next(Object.assign(new User(this.imgServ), this.user));
      }
    });
  }
}
