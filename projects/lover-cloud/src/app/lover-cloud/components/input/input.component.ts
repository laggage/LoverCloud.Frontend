import { Component, OnInit, Output, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() public value: string;
  @Input() public multiline: boolean = false;

  constructor(
    private modalRef: NzModalRef
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.modalRef.triggerOk();
  }
}
