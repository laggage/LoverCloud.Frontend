import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'projects/lover-cloud/src/shared/services/base.service';
import { environment } from 'projects/lover-cloud/src/environments/environment';
import { Albums, Album, AlbumAdd } from '../models/album';
import { retry, catchError, map } from 'rxjs/operators';
import { ResultWithLinks } from 'projects/lover-cloud/src/shared/models/result-with-links';
import { JsonPatchDocment, JsonPatchOperation } from 'projects/lover-cloud/src/shared/models/json-patch-document';

@Injectable()
export class AlbumService extends BaseService {
  url: string = `${environment.apiHostUrl}${environment.albumEndpoint}`

  constructor(
    private http: HttpClient,
  ) {
    super();
   }

  public get() {
    return this.http.get<ResultWithLinks<Album>>(this.url, {
      observe: 'response'
    }).pipe(
      retry(2),
      map(x => {
        x.body.value = x.body.value.map(album => Object.assign(new Album(), album));
        return x;
      }),
      catchError(this.handleError)
    );
  }

  public add(album: AlbumAdd) {
    return this.http.post<Album>(this.url, album, {
      observe: 'response'
    }).pipe(
      retry(2),
      catchError(this.handleError)
    )
  };

  public patch(album: Album) {
    let albumAdd =  AlbumAdd.fromAlbum(album);
    let doc = new JsonPatchDocment();
    for(let key in albumAdd) {
      doc.opeartions.push(new JsonPatchOperation('replace', `/${key}`, albumAdd[key]));
    }

    return this.http.patch(`${this.url}/${album.id}`, doc.opeartions, {
      observe: 'response'
    }).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}/${id}`, {
      observe: 'response'
    }).pipe(
      retry(2),
      catchError(this.handleError)
    )
  };
}
