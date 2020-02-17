import { Component, OnInit, Input } from '@angular/core';
import { Anniversary } from '../../models/anniversary';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-anniversary-edit',
  templateUrl: './anniversary-edit.component.html',
  styleUrls: ['./anniversary-edit.component.css']
})
export class AnniversaryEditComponent implements OnInit {
@Input() public anniversary: Anniversary = new Anniversary();

  constructor(
    private modalRef: NzModalRef
  ) { 
  }

  ngOnInit(): void {
  }

  dateChange(event) {
    console.log(event);
    this.anniversary.date = event;
  }

  onSubmit() {
    this.modalRef.triggerOk();
  }
}
