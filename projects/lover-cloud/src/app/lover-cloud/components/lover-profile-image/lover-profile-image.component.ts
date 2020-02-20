import { Component } from '@angular/core';
import { UserService } from '../../../authentication/services/user.service';
import { User } from 'projects/lover-cloud/src/shared/models/user';
import { AuthService } from '../../../authentication/services/auth.service';
import { HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'app-lover-profile-image',
  templateUrl: './lover-profile-image.component.html',
  styleUrls: ['./lover-profile-image.component.css']
})
export class LoverProfileImageComponent {
  public user: User;

  constructor(
    private userServ: UserService,
    private router: Router,
    private modalServ: NzModalService
  ) {
    this.userServ.getUser().subscribe(response => {
      if (response instanceof HttpResponseBase) {
        AuthService.toAuthPageIfUnauthorized(response as HttpErrorResponse, this.router);
      }
      else if (response instanceof User) {
        this.user = response as User;
      }
    });
  }

  showUserDetail(user: User) {
    let modal = this.modalServ.create({
      nzFooter: null,
      nzContent: UserDetailComponent,
      nzBodyStyle: {
        padding: '0'
      },
      nzClosable: false,
      nzComponentParams: {
        user: user
      },
      nzOnOk: () => {

      }
    })
  }
}
