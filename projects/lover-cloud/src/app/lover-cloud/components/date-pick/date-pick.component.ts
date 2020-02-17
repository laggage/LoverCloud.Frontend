import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-date-pick',
  templateUrl: './date-pick.component.html',
  styleUrls: ['./date-pick.component.css']
})
export class DatePickComponent implements OnInit {
  @Input() public  date: Date;

  constructor() {
  }

  ngOnInit(): void {
  }
}
