import { Component, OnInit } from '@angular/core';
import { Album } from '../../models/album';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  public album: Album = new Album();

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    /* 获取路由参数 */
    this.route.queryParams.subscribe((params: Params) => {
      Object.assign(this.album, params);
    })
  }

  navigateToUploadImage() {
    this.router.navigate(['/lover/images/upload'], {
      queryParams: this.album
    });
  }
}
