import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoverLogs, LoverLog } from '../../models/lover-log';
import { LoverLogService } from '../../services/lover-log.service';
import { AuthService } from '../../../authentication/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'projects/lover-cloud/src/shared/models/user';
import { UserService } from '../../../authentication/services/user.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Sex } from 'projects/lover-cloud/src/shared/models/sex.enum';
import { PaginationMetadata } from 'projects/lover-cloud/src/shared/models/pagination-metadata';
import { environment } from 'projects/lover-cloud/src/environments/environment';
import { Links } from 'projects/lover-cloud/src/shared/models/link';
import { NzMessageService } from 'ng-zorro-antd';
import { ResultWithLinks } from 'projects/lover-cloud/src/shared/models/result-with-links';

@Component({
  selector: 'app-lover-logs',
  templateUrl: './lover-logs.component.html',
  styleUrls: ['./lover-logs.component.css']
})
export class LoverLogsComponent implements OnInit {
  public loverLogs: LoverLogs;
  // 用户信息
  public user: User;
  // 翻页数据
  public paginationData: PaginationMetadata = new PaginationMetadata(1, 3);
  public links: Links = [];
  @ViewChild('iconBoy') iconBoy: ElementRef;
  @ViewChild('iconGirl') iconGirl: ElementRef;
  @ViewChild('iconLover') iconLover: ElementRef;

  constructor(
    private loverLogServ: LoverLogService,
    private userServ: UserService,
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  isBoy(sex: Sex) {
    return sex === Sex.male;
  }

  getTimeLineIcon(loverLog: LoverLog) {
    let result: any;
    if (!loverLog || !loverLog.creater || loverLog.creater.sex === undefined) {
      result = this.iconLover;
    } else if (loverLog.creater.sex === Sex.male) {
      result = this.iconBoy;
    } else {
      result = this.iconGirl;
    }

    return result;
  }

  private loadData() {
    /**
     * 1. 获取用户信息
     * 2. 判断登录状态是否有效, 有效则继续, 无效则跳转到登录状态
     * 3. http请求情侣日志数据
     * 4. 判断情侣日志请求是否成功
     * 5. 如果成功, 获取数据， 包括翻页元数据, 情侣说说数据, 还有翻页链接
     * 6. 如果失败, 提示用户
     */
    this.userServ.getUser().subscribe(r => {
      if (r instanceof User) { // 1
        this.user = r as User;
        let users: User[] = [this.user, this.user.spouse]
        this.loverLogServ.get({
          orderBy: 'createDateTime desc',
          pageSize: this.paginationData.pageSize,
          pageIndex: this.paginationData.pageIndex
        }).subscribe(response => { // 2
          AuthService.toAuthPageIfUnauthorized(response, this.router);
          if (response.ok && response.status === 200) {
            this.paginationData = Object.assign(new PaginationMetadata(this.paginationData.pageIndex, this.paginationData.pageSize), JSON.parse(response.headers.get(environment.paginationHeaderKey))) ;
            this.loverLogs = response.body.value.map(x => {
              x.creater = users.find(u => u.id === x.createrId);
              return x;
            });
          } else {
            this.message.error('抱歉, 获取数据失败, 请检查网络');
          }
        });

      } else {  // 获取用户信息失败 - 登录状态失效
        AuthService.toAuthPageIfUnauthorized(r as HttpErrorResponse, this.router);
      }
    })
  }

  public getLoverLog() {
    if(this.paginationData.hasNext) {
      this.paginationData.pageIndex++;
      this.loverLogServ.get({
        orderBy: 'createDateTime desc', 
        pageIndex: this.paginationData.pageIndex,
        pageSize: this.paginationData.pageSize
      }).subscribe(response => {
        AuthService.toAuthPageIfUnauthorized(response, this.router);
        if(response.status === 200) {
          this.loverLogs.push(...(response as HttpResponse<ResultWithLinks<LoverLog>>).body.value);
        }
      })
    }
  }
}
