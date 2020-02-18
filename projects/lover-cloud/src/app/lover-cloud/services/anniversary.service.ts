import { Injectable } from '@angular/core';
import { environment } from 'projects/lover-cloud/src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Anniversary, Anniversaries } from '../models/anniversary';
import { retry, catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JsonPatchDocment } from 'projects/lover-cloud/src/shared/models/json-patch-document';
import { ResultWithLinks } from 'projects/lover-cloud/src/shared/models/result-with-links';
import { BaseService } from 'projects/lover-cloud/src/shared/services/base.service';

@Injectable()
export class AnniversaryService extends BaseService {

  public url: string = `${environment.apiHostUrl}${environment.anniversaryEndPoint}`;

  constructor(
    private http: HttpClient
  ) { 
    super();
  }

  public getById(id: string) {
    return this.http.get<Anniversary>(`${this.url}/${id}`, {
      observe: 'response'
    }).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  public get() {
    return this.http.get<ResultWithLinks<Anniversary>>(this.url, {
      observe: 'response'
    }).pipe(
      retry(2),
      map(x => {
        x.body.value = x.body.value.map(a => Object.assign(new Anniversary(), a));
        return x;
      }),
      catchError(this.handleError)
    );
  }

  public patch(anniversary: Anniversary) {
    let doc = new JsonPatchDocment();
    doc.opeartions.push({
      op: 'replace',
      path: '/date',
      value: anniversary.date
    }, {
      op: 'replace',
      path: '/name',
      value: anniversary.name
    },{
      op: 'replace',
      path: '/description',
      value: anniversary.description
    })
    return this.http.patch(`${this.url}/${anniversary.id}`, doc.opeartions, {
      observe: 'response'
    }).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  public add(anniversary: Anniversary) {
    return this.http.post<Anniversary>(this.url, anniversary, {
      observe: 'response'
    }).pipe(
      retry(2),
      catchError(err => new Observable<HttpErrorResponse>(err))
    )
  }

  public delete(id: string|Anniversary) {
    if(id instanceof Anniversary) {
      id = id.id;
    }
    return this.http.delete(`${this.url}/${id}`, {
      observe: 'response'
    }).pipe(
      retry(2),
      catchError(err => new Observable<HttpErrorResponse>(s => {s.next(err); s.complete()}))
    )
  }

}
