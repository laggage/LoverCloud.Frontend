import { Component, OnInit, Input } from '@angular/core';
import { User } from 'projects/lover-cloud/src/shared/models/user';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit{
  @Input() public user:User;

  constructor(
    private modalRef: NzModalRef
  ) { 
  }

  ngOnInit(): void {
    console.log(this.user);
  }

  closeModal() {
    this.modalRef.triggerOk();
  }
}
