import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lover-cloud',
  templateUrl: './lover-cloud.component.html',
  styleUrls: ['./lover-cloud.component.css']
})
export class LoverCloudComponent implements OnInit {
  // innerHeight: string;
  // innerWidth: string;

  constructor() { }

  ngOnInit(): void {
    // window.onresize = () => {
    //   this.innerHeight = `${window.innerHeight}vh`;
    //   this.innerWidth = `${window.innerWidth}vw`;
    //   alert(`${window.innerHeight}`)
    // }
    // alert(`${window.innerHeight}`);
  }

}
