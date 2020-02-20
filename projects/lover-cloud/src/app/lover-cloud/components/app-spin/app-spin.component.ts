import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spin',
  templateUrl: './app-spin.component.html',
})
export class AppSpinComponent {

  @Input() public size: number = 16;
  @Input() public color: string;

  constructor() { }

}
