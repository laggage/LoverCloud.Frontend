import { Injectable } from '@angular/core';
import { Observable, observable, throwError } from 'rxjs';
import { User } from 'projects/lover-cloud/src/shared/models/user';
import { UserAddResource } from 'projects/lover-cloud/src/shared/models/user-add-resource';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'projects/lover-cloud/src/environments/environment';
import { catchError, retry } from 'rxjs/operators';
import { UserLoginMetadata } from 'projects/lover-cloud/src/shared/models/user-login-metadata';
import { Token } from 'projects/lover-cloud/src/shared/models/token';

@Injectable()
export class AuthService {

  private registerUrl: string = `${environment.apiHostUrl}${environment.registerEndPoint}`;
  private registerHeaders: HttpHeaders = new HttpHeaders({
    // 上传文件不要加 multipart/form-data Content-Type, 
    // 否则会提示 "Missing content-type boundary"
  })

  private loginUrl: string = `${environment.authentication.hostUrl}${environment.authentication.tokenEndPoint}`;
  private loginHeaders: HttpHeaders = new HttpHeaders({
  });

  constructor(
    private http: HttpClient
  ) { }

  /**
   * 用户注册
   */
  public register(userInfo: UserAddResource): Observable<HttpResponse<User> | HttpErrorResponse> {
    let form = new FormData();
    for (let key in userInfo) {
      form.append(key, userInfo[key]);
    }

    return this.http.post<User>(this.registerUrl, form, {
      headers: this.registerHeaders,
      observe: 'response'
    }).pipe(
      retry(3),
      catchError((error: HttpErrorResponse) => {
        return new Observable<HttpErrorResponse>(s => s.next(error));
      })
    );
  }

  public login(metadata: { username: string, password: string, saveToken?: true }) {
    let loginMetadata: UserLoginMetadata = new UserLoginMetadata();
    loginMetadata.username = metadata.username;
    loginMetadata.password = metadata.password;

    let formData: FormData = new FormData();
    for (let key in loginMetadata) {
      formData.append(key, loginMetadata[key]);
      // console.log(key, loginMetadata[key]);
    }
    
    return new Observable<HttpResponse<Token>|HttpErrorResponse>(s => {
      this.http.post<Token>(this.loginUrl, formData, {
        headers: this.loginHeaders,
        observe: 'response'
      }).pipe(
        retry(3),
        catchError((error: HttpErrorResponse) => {
          return new Observable<HttpErrorResponse>(s => s.next(error))
        })).subscribe(response => {
          if (response.ok) {
            let token: Token = Object.assign(new Token(), response.body);
            this.saveToken(token);
          }
          s.next(response);
        });
    })
  }

  /**
   * 保存身份密钥包本地存储
   * @param token 身份密钥
   */
  private saveToken(token: Token): void {
    localStorage.setItem(environment.localStorageTokenKey, JSON.stringify(token));
  }

  public getToken(): Token {
    let token: Token;
    token = Object.assign(new Token(), JSON.parse(localStorage.getItem(environment.localStorageTokenKey)));
    if (token.access_token === null || token.access_token.length < 1) {
      return null;
    }
    return token;
  }

  public isAuthenticate(): boolean {
    if (this.getToken() === null) {
      return false;
    } else {
      return true;
    }
  }
}
