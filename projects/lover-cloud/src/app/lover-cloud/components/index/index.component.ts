import { Component, OnInit } from '@angular/core';
import { Image } from '../../models/image';
import { User } from 'projects/lover-cloud/src/shared/models/user';
import { Sex } from 'projects/lover-cloud/src/shared/models/sex.enum';
import { UserService } from '../../../authentication/services/user.service';
import { HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { Router } from '@angular/router';
import { ImageService } from '../../services/image.service';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  coverImage: Image;
  user: User;

  constructor(
    userServ: UserService,
    private route: Router  ) { 
    userServ.getUser().subscribe(async s => {
      if(s instanceof HttpErrorResponse || !s) {
        AuthService.toAuthPageIfUnauthorized(s as HttpResponseBase,this.route);
      } else {
        this.user = s;
      }
    });
  }

  ngOnInit(): void {
  }

}
