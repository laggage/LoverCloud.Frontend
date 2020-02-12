import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public userInfoProfile: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  constructor(
    private authServ: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    
    this.authServ.login(this.userInfoProfile.value).subscribe(
      s => {
        if(s.ok) { // 登录成功
          console.log(this.authServ.getToken().access_token);
        } else {
          let error = s as HttpErrorResponse;
          console.log(error.error);
        }
      }
    )
  }

}
