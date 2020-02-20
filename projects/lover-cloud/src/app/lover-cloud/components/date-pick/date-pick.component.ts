import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-date-pick',
  templateUrl: './date-pick.component.html',
})
export class DatePickComponent  {
  @Input() public date: Date;
}
