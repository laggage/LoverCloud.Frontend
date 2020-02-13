import { Component, OnInit } from '@angular/core';
import { Image } from '../../models/image';
import { User } from 'projects/lover-cloud/src/shared/models/user';
import { Sex } from 'projects/lover-cloud/src/shared/models/sex.enum';
import { UserService } from '../../../authentication/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  coverImage: Image;
  user: User;
  imgData: any;
  spouseImgData: any;

  constructor(
    userServ: UserService,
    private route: Router,
    imageServ: ImageService
  ) { 
    userServ.getUser().subscribe(async s => {
      if(s instanceof HttpErrorResponse || !s) {
        this.route.navigateByUrl('/auth/login');
      } else {
        this.user = s;
        this.imgData = await this.user.getProfileImage();
        if(this.user.spouse)
          this.spouseImgData = await this.user.spouse.getProfileImage();
      }
    });
  }

  ngOnInit(): void {
  }

}
