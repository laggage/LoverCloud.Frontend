import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageAdd, Image } from '../models/image';
import { environment } from 'projects/lover-cloud/src/environments/environment';
import { retry, catchError, tap, last, map } from 'rxjs/operators';
import { BaseService } from 'projects/lover-cloud/src/shared/services/base.service';

@Injectable()
export class ImageService extends BaseService {

  public url: string = `${environment.apiHostUrl}${environment.imageEndpoint}`;

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  public getAuthImage(url: string) {

    return new Observable<HttpResponse<ArrayBuffer> | ArrayBuffer | string>(s => {
      this.http.get(url, {
        observe: 'response',
        responseType: 'arraybuffer'
      }).subscribe(response => {
        if (response.ok) {
          let reader = new FileReader();
          reader.readAsDataURL(new Blob([response.body], { type: 'image/jpeg' }));
          reader.onload = () => {
            s.next(reader.result);
            s.complete();
          }
          reader.onerror = () => {
            s.next(null);
            s.complete();
          }
        } else {
          s.next(response);
          s.complete();
        }
      }) // subscribe
    });

  }

  public uploadImage(imageAdd: ImageAdd) {
    
    let form = new FormData();
    for(let key in imageAdd) {
      if(key && imageAdd[key]) {
        if(key === '_thumbUrl') continue;
        form.append(key, imageAdd[key]);
      }
    }
    const req = new HttpRequest('POST', this.url, form, {
      reportProgress: true
    })

    return this.http.request(req).pipe(
      retry(2),
      map(event => this.getEventMessage(event)),
      // last(),
      catchError(this.handleError)
    )
  }

  /** Return distinct message for sent, upload progress, & response events */
  private getEventMessage(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.Sent:
        return 10;
      case HttpEventType.UploadProgress:
        return Math.round(50 * event.loaded / event.total);
      case HttpEventType.ResponseHeader:
        return 60 + 20;
      case HttpEventType.DownloadProgress:
        return Math.round(20*event.loaded/event.total)+80;
      case HttpEventType.Response:
          return event;
      default:
        return 0;
    }
  }
}
