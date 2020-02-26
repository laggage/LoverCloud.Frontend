import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpEvent, HttpEventType, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadImage, Image, ImageUpdate } from '../models/image';
import { environment } from 'projects/lover-cloud/src/environments/environment';
import { retry, catchError, tap, last, map } from 'rxjs/operators';
import { BaseService } from 'projects/lover-cloud/src/shared/services/base.service';
import { ImageQueryParameters } from '../models/image-query-parameters';
import { ResultWithLinks } from 'projects/lover-cloud/src/shared/models/result-with-links';
import { JsonPatchDocment, JsonPatchOperation } from 'projects/lover-cloud/src/shared/models/json-patch-document';

@Injectable()
export class ImageService extends BaseService {
  public url: string = `${environment.apiHostUrl}${environment.imageEndpoint}`;

  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  public getAuthImage(url: string) {
    const reg: RegExp = /^https?:\/\//;
    if(!reg.test(url)) {
      url = `${environment.apiHostUrl.substr(0, environment.apiHostUrl.length-1)}${url}`
    }
    return new Observable<HttpResponse<ArrayBuffer> | ArrayBuffer | string>(s => {
      let sub = this.http.get(url, {
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
      }, () => {
        s.next(null);
        s.complete();
      }); // subscribe
      return {
        unsubscribe() {
          sub.unsubscribe();
        }
      }
    });

  }

  public uploadImage(imageAdd: UploadImage) {

    let form = new FormData();
    for (let key in imageAdd) {
      if (key && imageAdd[key]) {
        if (key === '_thumbUrl') continue;
        form.append(key, imageAdd[key]);
      }
    }
    const req = new HttpRequest('POST', this.url, form, {
      reportProgress: true
    })

    return this.http.request(req).pipe(
      map(event => this.getEventMessage(event)),
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
        return Math.round(20 * event.loaded / event.total) + 80;
      case HttpEventType.Response:
        return event;
      default:
        return 0;
    }
  }

  /**
   * 获取图片
   * @param parameters 查询参数
   * @param loadImage 是否加载用来渲染的图片数据
   */
  public getImages(parameters?: ImageQueryParameters, loadImage: boolean = false) {
    let params = new HttpParams();
    for(let key in parameters) {
      params = params.append(key, parameters[key]);
    }
    return this.http.get<ResultWithLinks<Image>>(this.url, {
      observe: 'response',
      params: params
    }).pipe(
      retry(2),
      map(o => {
        o.body.value = o.body.value.map(x => {
          const image = Object.assign(new Image(), x);
          return image;
        });
        // o.body.value.forEach(o => {
        //   o.loadThumbUrl(this);
        // })
        return o;
      }),
      catchError(this.handleError)
    )
  }

  public deleteImage(image: Image) {
    return this.http.delete(`${this.url}/${image.id}`, {
      observe: 'response'
    }).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  public patchImage(image: Image) {

    let imageUpdate: ImageUpdate = ImageUpdate.fromImage(image);

    let doc = new JsonPatchDocment();
    for(let key in imageUpdate) {
      doc.opeartions.push(new JsonPatchOperation('replace', `/${key}`, imageUpdate[key]));
    }

    return this.http.patch(`${this.url}/${image.id}`, doc.opeartions, {
      observe: 'response'
    }).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
}
