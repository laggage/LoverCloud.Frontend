import { Component, OnInit } from '@angular/core';
import { Image } from '../../models/image';
import { User } from 'projects/lover-cloud/src/shared/models/user';
import { UserService } from '../../../authentication/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../authentication/services/auth.service';
import { TimeSpan } from 'projects/lover-cloud/src/shared/services/time-span';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { DatePickComponent } from '../date-pick/date-pick.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  coverImage: Image;
  user: User;
  totalLoveDay: number;
  loveDate: Date;
  // @ViewChild('loveDayPanel', {static: true}) loveDayPanel: ElementRef;

  constructor(
    private userServ: UserService,
    private route: Router,
    private modalServ: NzModalService,
    private message: NzMessageService) { 
   this.loadUser();
  }

  private loadUser(refresh: boolean = false) {
    this.userServ.getUser(refresh).subscribe(async s => {
      if(s instanceof User) {
        this.user = s;
        this.loadTotalLoveDay();
      } else {
        this.route.navigateByUrl('/auth');
      }
    });
  }

  private loadTotalLoveDay() {
    if(!this.user || !this.user.lover || !this.user.lover.loveDay) return;
    this.totalLoveDay = (new TimeSpan(new Date(),new Date(this.user.lover.loveDay.date))).day;
  }

  ngOnInit(): void {
  }

  setLoveDay() {
    let uploading = false;
    let modal = this.modalServ.create({
      nzContent: DatePickComponent,
      nzOnOk: () => {},
      nzCancelDisabled: true,
      nzFooter: [{
        label: '确定',
        type: 'primary',
        onClick: (v) => {
          uploading = true;
          this.userServ.setLoveDay(v.date).subscribe(response => {
            AuthService.toAuthPageIfUnauthorized(response, this.route);
            if(response.status === 204)  {
              this.message.success('操作成功');
              this.user.lover.loveDay.date = v.date;
              this.loadTotalLoveDay();  // 刷新界面数据
            } else {
              this.message.error('操作失败');
            }
            modal.triggerOk();
          });
        },
        loading: uploading
      }],
      nzComponentParams: {'date': this.user.lover.loveDay.date}
    });
 
    modal.afterClose.subscribe(() => {
      modal.destroy();
    })
  }

}
