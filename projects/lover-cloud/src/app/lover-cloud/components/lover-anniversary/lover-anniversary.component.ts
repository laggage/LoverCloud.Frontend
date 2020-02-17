import { Component, OnInit } from '@angular/core';
import { AnniversaryService } from '../../services/anniversary.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { AnniversaryEditComponent } from '../anniversary-edit/anniversary-edit.component';
import { Anniversaries, Anniversary } from '../../models/anniversary';
import { AuthService } from '../../../authentication/services/auth.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { UserService } from '../../../authentication/services/user.service';
import { User } from 'projects/lover-cloud/src/shared/models/user';
import { ResultWithLinks } from 'projects/lover-cloud/src/shared/models/result-with-links';
import { ImageService } from '../../services/image.service';
import { TimeSpan } from 'projects/lover-cloud/src/shared/services/time-span';

@Component({
  selector: 'app-lover-anniversary',
  templateUrl: './lover-anniversary.component.html',
  styleUrls: ['./lover-anniversary.component.css']
})
export class LoverAnniversaryComponent implements OnInit {

  public anniversaries: Anniversaries;
  public user: User;
  constructor(
    private anniversaryServ: AnniversaryService,
    private modalServ: NzModalService,
    private router: Router,
    private userServ: UserService,
    private imageServ: ImageService,
    private message: NzMessageService
  ) { }

  async ngOnInit() {
    try{
      let response = await this.anniversaryServ.get().toPromise();
      if (response instanceof HttpResponse) {
        this.anniversaries = response.body.value;
      }
      let user = Object.assign(new User(this.imageServ), await this.userServ.getUser().toPromise());
      user.birth = new Date(user.birth);
      user.spouse.birth = new Date(user.spouse.birth);
      if(user instanceof User) {
        user.lover.loveDay = Object.assign(new Anniversary(), user.lover.loveDay);
        this.user = user;
        if(user.lover.weddingDay) {
          this.anniversaries.push(user.lover.weddingDay);
        }
        if(user.birth) {
          let ann = new Anniversary(`${user.userName}的生日`, user.birth);
          ann.timeSpan = new TimeSpan(new Date(), TimeSpan.getNextDateFrom(ann.date));
          this.anniversaries.push(ann);
        }
        if(user.spouse&&user.spouse.birth) {
          let ann = new Anniversary(`${user.spouse.userName}的生日`, user.spouse.birth);
          ann.timeSpan = new TimeSpan(new Date(), TimeSpan.getNextDateFrom(ann.date));
          this.anniversaries.push(ann);
        }
        if(user.lover.loveDay) {
          this.anniversaries.push(user.lover.loveDay);
        }
      }
    } catch(err) {
      
      console.error(err);
    }
  }

  newAnniversary() {
    let modal = this.modalServ.create({
      nzContent: AnniversaryEditComponent,
      nzOnOk: (v) => {
        v.anniversary.isLoading = true;
        this.anniversaries.unshift(v.anniversary);
        this.anniversaryServ.add(v.anniversary).subscribe(response => {
          if(!(response instanceof HttpResponse && response.status === 201)) {
            this.anniversaries.shift();
            this.message.error('操作失败');
          } else {
            v.anniversary.isLoading = false;
          }
        })
        // this.anniversaryServ.
      },
      nzClosable: false,
      nzFooter: null
    });
    modal.afterClose.subscribe(() => modal.destroy());
  }

  deleteAnniversary(anniversary: Anniversary) {
    if(anniversary) {
      this.modalServ.confirm({
        nzTitle: '确认操作',
        nzContent: '确定要删除吗? 删除后数据将无法恢复!!!',
        nzOnOk: () => {
          anniversary.isLoading = true;
          this.anniversaryServ.delete(anniversary.id).subscribe(resposne => {
            AuthService.toAuthPageIfUnauthorized(resposne, this.router);
            if(resposne.status === 204) {
              anniversary.isLoading =false;
              this.anniversaries.splice(this.anniversaries.indexOf(anniversary), 1);
            } else {
              this.message.error('操作失败');
              anniversary.isLoading =false;
            }
          })
        }
      });
    }
  }
}
