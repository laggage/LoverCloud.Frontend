import { Component, OnInit, Input, ElementRef, ViewChild, ComponentRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Anniversary } from '../../models/anniversary';
import { NzModalRef, NzDatePickerComponent } from 'ng-zorro-antd';

@Component({
  selector: 'app-anniversary-edit',
  templateUrl: './anniversary-edit.component.html',
  styleUrls: ['./anniversary-edit.component.css']
})
export class AnniversaryEditComponent {
  
  
@Input() public anniversary: Anniversary = new Anniversary();
@ViewChild('date', {static: true}) date: ComponentRef<NzDatePickerComponent>
  constructor(
    private modalRef: NzModalRef
  ) { 
  }

  onSubmit() {
    this.modalRef.triggerOk();
  }
}
