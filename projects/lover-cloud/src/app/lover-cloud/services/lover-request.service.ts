import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoverRequest, LoverRequests, LoverRequestAdd } from '../models/lover-request';
import { environment } from 'projects/lover-cloud/src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'projects/lover-cloud/src/shared/services/base.service';
import { User } from 'projects/lover-cloud/src/shared/models/user';
import { ResultWithLinks } from 'projects/lover-cloud/src/shared/models/result-with-links';
import { ImageService } from './image.service';
import { JsonPatchDocment } from 'projects/lover-cloud/src/shared/models/json-patch-document';
import { UserService } from '../../authentication/services/user.service';
import { throwError } from 'rxjs';

@Injectable()
export class LoverRequestService extends BaseService {
  private url: string = `${environment.apiHostUrl}${environment.loverRequestEndPoint}`;

  constructor(
    private http: HttpClient,
    private imageServ: ImageService,
    private userServ: UserService
  ) {
    super();
  }

  public get() {
    return this.http.get<ResultWithLinks<LoverRequest>>(this.url, {
      observe: 'response',
    }).pipe(
      map(x => {
        x.body.value = x.body.value.map(l => this.assign(l));
        return x;
      }),
      catchError(this.handleError)
    );
  }

  public patch(loverRequest: LoverRequest, patchDoc: JsonPatchDocment) {
    if (!this.canPatchLoverRequest(loverRequest)) {
      throwError("invalid operation, check if LoverRequest.receiver is current logged user.")
    }

    return this.http.patch(`${this.url}/${loverRequest.id}`, patchDoc.opeartions, {
      observe: 'response'
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * 删除某个指定的 LoverRequest
   * @param loverRequest instance of LoverRequest/id of LoverRequest
   */
  public delete(loverRequest: LoverRequest | string) {
    let id: string;
    if (loverRequest instanceof LoverRequest) id = loverRequest.id;
    else id = loverRequest;

    this.http.delete(`${this.url}/${id}`, {
      observe: 'response'
    }).pipe(
      this.handleError
    );
  }

  public add(loverRequestAdd: LoverRequestAdd) {
    return this.http.post<LoverRequest>(this.url, loverRequestAdd, {
      observe: 'response'
    }).pipe(
      map(x => this.assign(x)),
      catchError(this.handleError)
    );
  }

  /**
   * 同意某个用户发出的情侣请求, 与之成为情侣
   * @param loverRequest 
   */
  public agreeLoverRequest(loverRequest: LoverRequest) {

    return this.patch(
      loverRequest,
      new JsonPatchDocment([
        {
          path: '/succeed',
          value: true,
          op: 'replace'
        }
      ]));
  }

  /**
   * 拒绝某个用户发出的情侣, 拒绝和她/他成为情侣
   * @param loverRequest 
   */
  public disagreeLoverRequest(loverRequest: LoverRequest) {
    return this.patch(
      loverRequest,
      new JsonPatchDocment([
        {
          path: '/succeed',
          value: false,
          op: 'replace'
        }
      ]));
  }

  /**
   * 验证是否有权能够局部更新 LoverRequest 资源, 即判断当前登录的用户是否为情侣请求的接收方
   * @param loverRequest 情侣请求
   */
  private async canPatchLoverRequest(loverRequest: LoverRequest) {
    const user = await this.userServ.getUser().toPromise() as User;

    return user && loverRequest && user.id === loverRequest.receiver.id;
  }

  /**
   * 为LoverRequest调用Object.assign方法
   * @param loverRequest 
   */
  protected assign(loverRequest: LoverRequest|any):LoverRequest {
    const request = Object.assign(new LoverRequest(), loverRequest);
    request.receiver = Object.assign(new User(this.imageServ), request.receiver);
    request.requester = Object.assign(new User(this.imageServ), request.requester);
    return request;
  }

  /**
   * 获得 loverRequests 中 receiver 为 user 的 LoverRequest, 即 user 接受到的 LoverRequest
   * @param user 当前登录的用户
   * @param loverRequests 该用户所有的情侣请求
   */
  public getReceivedLoverRequests(user: User, loverRequests: LoverRequests) {
    return loverRequests.filter(x => x.receiver && x.receiver.id === user.id);
  }

  /**
   * 获得 loverRequests 中 requester 为 user 的 LoverRequest, 即由 user 主动发出的LoverRequest
   * @param user 当前登录的用户
   * @param loverRequests 
   */
  public getSendedLoverRequests(user: User, loverRequests: LoverRequests) {
    return loverRequests.filter(x => x.requester && x.requester.id === user.id);
  }
}
