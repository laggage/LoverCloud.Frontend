import { Component, OnInit, Input } from '@angular/core';
import { User } from 'projects/lover-cloud/src/shared/models/user';
import { NzModalRef } from 'ng-zorro-antd';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit{
  @Input() public user:User;
  @Input() public isSpouse: boolean;

  constructor(
    private modalRef: NzModalRef,
    private authServ: AuthService
  ) { 
  }

  ngOnInit(): void {
    console.log(this.user);
  }

  closeModal() {
    this.modalRef.triggerOk();
  }

  public logout() {
    this.modalRef.triggerOk();
    this.authServ.logout();
  }
}
