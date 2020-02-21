import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { environment } from 'projects/lover-cloud/src/environments/environment';

const identityRevealedValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const username = control.get('username');
  const password = control.get('password');
  const messages: string[] = [];

  username.errors && (username.dirty || username.touched)
    ? messages.push(`用户名必须是${environment.authentication.minUsernameLength}-${environment.authentication.maxUsernameLength}个字符`)
    : null;
  password.errors && (password.dirty || password.touched)
    ? messages.push(`密码必须是${environment.authentication.minUsernameLength}-${environment.authentication.maxUsernameLength}个字符`)
    : null;
  return username.valid && password.valid ? null : { messages: messages };
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public userInfoProfile: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.minLength(environment.authentication.minUsernameLength),
      Validators.maxLength(environment.authentication.maxUsernameLength),
    ]),
    password: new FormControl('', [
      Validators.minLength(environment.authentication.minPasswordLength),
      Validators.maxLength(environment.authentication.maxPasswordLength),
    ])
  }, {
    validators: [identityRevealedValidator]
  });

  public logginStatus: 'none' | 'logging' | 'error' | 'success' = 'none';
  public error: string;

  constructor(
    private authServ: AuthService,
    private message: NzMessageService,
    private router: Router,
  ) {
    if (authServ.isAuthenticate()) {
      router.navigateByUrl('lover/index');
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.logginStatus === 'logging') { // 防止多次点击, 浪费资源
      return;
    }
    this.logginStatus = 'logging';
    this.authServ.login(this.userInfoProfile.value).subscribe(
      s => {
        if (s.ok) { // 登录成功
          this.logginStatus = 'success';
          this.message.success('登录成功');
          this.router.navigateByUrl('/lover/index');
        } else {
          let error = s as HttpErrorResponse;
          this.error = JSON.stringify(error, null, 2);
          this.logginStatus = 'error';
        }
      }
    )
  }
}
