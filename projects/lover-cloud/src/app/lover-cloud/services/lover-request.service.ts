import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoverRequest } from '../models/lover-request';
import { environment } from 'projects/lover-cloud/src/environments/environment';
import { catchError } from 'rxjs/operators';
import { BaseService } from 'projects/lover-cloud/src/shared/services/base.service';

@Injectable()
export class LoverRequestService extends BaseService {
  private url: string = `${environment.apiHostUrl}${environment.userEndPoint}`;

  constructor(
    private http:HttpClient
  ) { 
    super();
  }

  public get() {
    this.http.get(this.url, {
      observe: 'response'
    }).pipe(
      catchError(this.handleError)
    )
  }

  public agreeLoverRequest(loverRequest: LoverRequest) {
  }

  public refuseLoverRequest(loverRequest: LoverRequest) {

  }
}
