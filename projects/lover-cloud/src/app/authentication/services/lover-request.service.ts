import { Injectable } from '@angular/core';
import { BaseService } from 'projects/lover-cloud/src/shared/services/base.service';
import { environment } from 'projects/lover-cloud/src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { LoverRequest } from '../../lover-cloud/models/lover-request';

@Injectable()
export class LoverRequestService extends BaseService {

  private url: string = `${environment.apiHostUrl}${environment.userEndPoint}`;

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  get() {
    this.http.get(this.url, {
      observe: 'response',
      params: {
        fields: 'loverRequests, receivedLoverRequests'
      }
    }).pipe(
      catchError(this.handleError)
    );
  }


  public agreeLoverRequest(loverRequest: LoverRequest) {

  }

  public refuseLoverRequest(loverRequest: LoverRequest) {

  }
}
