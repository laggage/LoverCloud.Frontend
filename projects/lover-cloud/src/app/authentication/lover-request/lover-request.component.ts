import { Component, OnInit } from '@angular/core';
import { LoverRequestService } from '../../lover-cloud/services/lover-request.service';
import { UserService } from '../services/user.service';
import { User } from 'projects/lover-cloud/src/shared/models/user';
import { LoverRequest, LoverRequests, LoverRequestAdd } from '../../lover-cloud/models/lover-request';
import { HttpResponse } from '@angular/common/http';
import { ImageService } from '../../lover-cloud/services/image.service';
import { NzMessageService } from 'ng-zorro-antd';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-lover-request',
  templateUrl: './lover-request.component.html',
  styleUrls: ['./lover-request.component.css']
})
export class LoverRequestComponent implements OnInit {
  user: User;
  loverRequests: LoverRequests = [];
  receivedLoverRequests: LoverRequests = [];
  users: User[] = [];
  username: string;
  isSearching: boolean = false;

  constructor(
    private loverRequestServ: LoverRequestService,
    private userServ: UserService,
    private imageServ: ImageService,
    private messageServ: NzMessageService,
    private authServ: AuthService
  ) { }

  ngOnInit(): void {
    
    this.userServ.getUser().subscribe(res => {
      if(res instanceof User) { // 获取到登录用户数据
        this.user = res;
        this.user.profileImage.loadThumbUrl(this.imageServ);
        this.loverRequestServ.get().subscribe(res => { // 获取 情侣请求 数据
          if (res instanceof HttpResponse && res.status === 200) {
            const loverRequests = res.body.value;
            this.receivedLoverRequests = this.loverRequestServ.getReceivedLoverRequests(
              this.user, loverRequests);
            this.loverRequests = this.loverRequestServ
              .getSendedLoverRequests(this.user, loverRequests);
          } // end if
        }); // end subscribe
      } // end if
    });// end subscribe

  }

  searchUser() {
    this.users.length > 0 ? this.users.splice(0, this.users.length):null;

    this.userServ.searchUser$(this.username).subscribe(res => {
      if(res instanceof HttpResponse && res.status === 200) {
        res.body.value.map(x => x.profileImage.loadThumbUrl(this.imageServ));
        this.users.length > 0 ? this.users.splice(0, this.users.length):null;
        this.users.push(...res.body.value);
      }
    });
  }

  /**
   * 发出情侣请求
   * @param receiver 接收方 / 被告白方
   */
  addLoverRequest(receiver: User) {
    receiver.status = 'active';
    this.loverRequestServ.add(new LoverRequestAdd(receiver)).subscribe(res => {
      if(res instanceof HttpResponse && res.status === 201) {
        this.loverRequests.push(res.body);
      } else {
        this.messageServ.error('操作失败');
      }
      receiver.status = 'inactive';
    })
  }

  /**
   * 同意某个用户发出的情侣, 与之成为情侣
   * @param loverRequest 
   */
  agreeLoverRequest(loverRequest: LoverRequest) {
    loverRequest.status = 'updating';
    this.loverRequestServ.agreeLoverRequest(loverRequest).subscribe(res => {
      if(res.status === 204) { // http patch返回204, 说明操作成功
        loverRequest.succeed = true;
        loverRequest.status = 'none';
      } 
      else {
        loverRequest.status = 'error_update';
        this.messageServ.error(`${res.status}:操作失败`);
      }
      
    });
  }

  /**
   * 拒绝某个用户发出的情侣, 拒绝与之成为情侣
   * @param loverRequest 
   */
  disagreenLoverRequest(loverRequest: LoverRequest) {
    loverRequest.status = 'updating';
    this.loverRequestServ.disagreeLoverRequest(loverRequest).subscribe(res => {
      if(res.status === 204) { // http patch返回204, 说明操作成功
        loverRequest.succeed = false;
        loverRequest.status = 'none';
      } else {
        loverRequest.status = 'error_update';
        this.messageServ.error(`${res.status}:操作失败`);
      }
    });
  }

  logout() {
    this.authServ.logout();
  }

}
