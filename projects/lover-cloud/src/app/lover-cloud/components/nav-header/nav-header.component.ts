import { Component, OnInit, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit {
  @Input() public backUrl: string;
  @Input() public title: string;
  @Input() public extraContent: TemplateRef<{}>;

  @ViewChild('extraContainer', {read: ViewContainerRef, static: true}) extraContainer:ViewContainerRef;

  constructor(
    private router: Router
  ) {
    // this.router.navigateByUrl(this.backUrl);
  }

  ngOnInit(): void {
    if(this.extraContent) {
      this.extraContainer.clear();
      this.extraContainer.createEmbeddedView(this.extraContent);
    }
  }

  goBack() {
    this.router.navigateByUrl(this.backUrl);
  }
}
