import { Injectable } from '@angular/core';
import { LoverLogAddResource } from '../models/lover-log-add-resource';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'projects/lover-cloud/src/environments/environment';
import { LoverLog } from '../models/lover-log';
import { retry, catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { QueryParameters } from 'projects/lover-cloud/src/shared/models/query-parameters';
import { ResultWithLinks } from 'projects/lover-cloud/src/shared/models/result-with-links';
import { BaseService } from 'projects/lover-cloud/src/shared/services/base.service';

@Injectable()
export class LoverLogService extends BaseService {

  private url: string = `${environment.apiHostUrl}${environment.loverLogsEndPoint}`

  constructor(
    private http: HttpClient,
    private message: NzMessageService) {
      super();
     }


  public get(parameters: QueryParameters) {
    let params = new HttpParams();
    for (let key in parameters) {
      params = params.append(key, parameters[key]);
    }
    return this.http.get<ResultWithLinks<LoverLog>>(this.url, {
      observe: 'response',
      params: params
    }).pipe(
      retry(2),
      map(o => {
        o.body.value = o.body.value.map(log => {
          return Object.assign(new LoverLog(), log);
        });
        return o;
      }),
      catchError(this.handleError)
    );
  }

  public deleteLoverLog(loverLog: LoverLog) {
    return this.http.delete(`${this.url}/${loverLog.id}`, {
      observe: 'response'
    }).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  public addLoverLog(loverLogAddResource: LoverLogAddResource) {
    let formData = new FormData();
    formData.append('content', loverLogAddResource.content);
    loverLogAddResource.photos.forEach(element => {
      formData.append('photos', element);
    });

    return this.http.post<LoverLog>(this.url, formData, {
      observe: 'response'
    })
      .pipe(
        retry(3),
        catchError(this.handleError),
      )
  }
}
