import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../authentication/services/user.service';
import { User } from 'projects/lover-cloud/src/shared/models/user';
import { AuthService } from '../../../authentication/services/auth.service';
import { HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lover-profile-image',
  templateUrl: './lover-profile-image.component.html',
  styleUrls: ['./lover-profile-image.component.css']
})
export class LoverProfileImageComponent implements OnInit {
  public user: User;

  constructor(
    private userServ: UserService,
    private router: Router
  ) {
    this.userServ.getUser().subscribe(response => {
      if (response instanceof HttpResponseBase) {
        AuthService.toAuthPageIfUnauthorized(response as HttpErrorResponse, this.router);
      }
      else if (response instanceof User) {
        this.user = response as User;
      }
    });
  }

  ngOnInit(): void {
  }

}
