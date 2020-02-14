import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ImageService {

  constructor(
    private http: HttpClient
  ) { }

  public getAuthImage(url: string) {

    return new Observable<HttpResponse<ArrayBuffer>|ArrayBuffer|string>(s => {
      this.http.get(url, {
        observe: 'response',
        responseType: 'arraybuffer'
      }).subscribe(response => {
        if(response.ok) {
          let reader = new FileReader();
          reader.readAsDataURL(new Blob([response.body], {type: 'image/jpeg'}));
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
      })
    })
  }

}
