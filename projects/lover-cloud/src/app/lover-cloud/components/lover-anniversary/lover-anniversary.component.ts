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
  public selectedAnniversary: Anniversary;

  constructor(
    private anniversaryServ: AnniversaryService,
    private modalServ: NzModalService,
    private router: Router,
    private userServ: UserService,
    private message: NzMessageService
  ) { }

  private loadSelectedAnniversary() {
    if(this.anniversaries && this.anniversaries.length > 0)
      this.selectedAnniversary = this.anniversaries[0];
  }

  async ngOnInit() {
    try {
      let response = await this.anniversaryServ.get().toPromise();
      if (response instanceof HttpResponse) {
        this.anniversaries = response.body.value.sort((a, b) => {
          a.date = new Date(a.date);
          b.date = new Date(b.date);
          return a.date.valueOf() < b.date.valueOf() ? 1 : ((a.date.valueOf() === b.date.valueOf()) ? 0 : -1)
        });
        this.loadSelectedAnniversary();
      }
      this.userServ.getUser().subscribe(response => {
        let user:User;
        if(response instanceof User) {
          user = response;
          user.birth = new Date(user.birth);
          user.spouse.birth = new Date(user.spouse.birth);
          user.lover.loveDay = Object.assign(new Anniversary(), user.lover.loveDay);
          this.user = user;
          this.loadExtraAnniversary();
          this.loadSelectedAnniversary();
        }
      })
    } catch (err) {
      console.error(err);
      AuthService.toAuthPageIfUnauthorized(null, this.router);
    }
  }

  private loadExtraAnniversary() {
    if (!this.user) {
      return;
    }
    let user = this.user;
    if (user.lover.weddingDay) {
      this.anniversaries.push(user.lover.weddingDay);
    }
    if (user.birth) {
      let ann = new Anniversary(`${user.userName}的生日`, user.birth);
      ann.timeSpan = new TimeSpan(new Date(), TimeSpan.getNextDateFrom(ann.date));
      this.anniversaries.push(ann);
    }
    if (user.spouse && user.spouse.birth) {
      let ann = new Anniversary(`${user.spouse.userName}的生日`, user.spouse.birth);
      ann.timeSpan = new TimeSpan(new Date(), TimeSpan.getNextDateFrom(ann.date));
      this.anniversaries.push(ann);
    }
    if (user.lover.loveDay) {
      this.anniversaries.push(user.lover.loveDay);
    }
  }

  newAnniversary() {
    let modal = this.modalServ.create({
      nzContent: AnniversaryEditComponent,
      nzOnOk: (v) => {
        v.anniversary.isLoading = true;
        this.anniversaries.unshift(v.anniversary);
        this.anniversaryServ.add(v.anniversary).subscribe(response => {
          if (!(response instanceof HttpResponse && response.status === 201)) {
            this.anniversaries.shift();
            this.message.error('操作失败');
          } else { // 成功
            v.anniversary.isLoading = false;
            this.user.loverAnniversaryCount += 1;
            this.loadSelectedAnniversary();
          }
        })
      },
      nzClosable: false,
      nzFooter: null
    });
    modal.afterClose.subscribe(() => modal.destroy());
  }

  editAnniversary(anniversary: Anniversary) {
    let oldValue = Object.assign(new Anniversary(), anniversary);
    let modal = this.modalServ.create({
      nzContent: AnniversaryEditComponent,
      nzOnOk: (v) => {
        anniversary.isLoading = true;
        this.anniversaryServ.patch(v.anniversary).subscribe(response => {
          if (!(response instanceof HttpResponse && response.status === 204)) {
            this.message.error('操作失败');
            anniversary = Object.assign(anniversary, oldValue);
          }
          anniversary.isLoading = false;
        })
      },
      nzClosable: false,
      nzFooter: null,
      nzComponentParams: { anniversary: anniversary }
    });
    modal.afterClose.subscribe(() => modal.destroy());
  }

  deleteAnniversary(anniversary: Anniversary) {
    if (anniversary) {
      this.modalServ.confirm({
        nzTitle: '确认操作',
        nzContent: '确定要删除吗? 删除后数据将无法恢复!!!',
        nzOnOk: () => {
          anniversary.isLoading = true;

          this.anniversaryServ.delete(anniversary.id).subscribe(resposne => {
            AuthService.toAuthPageIfUnauthorized(resposne, this.router);
            if (resposne.status === 204) { // 成功
              anniversary.isLoading = false;
              this.anniversaries.splice(this.anniversaries.indexOf(anniversary), 1);
              this.loadSelectedAnniversary();
              this.user.loverAnniversaryCount -= 1;
            } else {
              this.message.error('操作失败');
              anniversary.isLoading = false;
            }
          })
        }
      });
    }
  }
}
