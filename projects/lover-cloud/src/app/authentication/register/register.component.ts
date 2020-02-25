import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, ValidationErrors, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserAddResource } from 'projects/lover-cloud/src/shared/models/user-add-resource';
import { Sex } from 'projects/lover-cloud/src/shared/models/sex.enum';
import { Router } from '@angular/router';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'projects/lover-cloud/src/environments/environment';

const userInfoValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const username = control.get('userName');
  const password = control.get('password');
  const birth = control.get('birth');
  const sex = control.get('sex');
  const email = control.get('email');

  const messages: string[] = [];

  username.errors && (username.dirty || username.touched)
    ? messages.push(`用户名必填且必须是${environment.authentication.minUsernameLength}-${environment.authentication.maxUsernameLength}个字符`)
    : null;
  password.errors && (password.dirty || password.touched)
    ? messages.push(`密码必填且必须是${environment.authentication.minPasswordLength}-${environment.authentication.maxPasswordLength}个字符`)
    : null;
  email.errors && (email.dirty || email.touched) ? messages.push('邮箱必填且邮箱格式错误') : null;

  return username.valid && password.valid && birth && sex && email ? null : { messages: messages };
};

const emailValidator:ValidatorFn = (control:AbstractControl) => {
  const regex: RegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  return regex.test(control.value)? null: {
    email: '邮箱格式错误'
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public userInfoForm: FormGroup = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(environment.authentication.minUsernameLength),
      Validators.maxLength(environment.authentication.maxUsernameLength),
    ]),
    email: new FormControl('', [
      Validators.required,
      emailValidator
    ]),
    birth: new FormControl(''),
    sex: new FormControl(''),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(environment.authentication.minPasswordLength),
      Validators.maxLength(environment.authentication.maxPasswordLength),
    ])
  }, userInfoValidator);
  public profileImage: File;
  public imgData: any = null;
  public status: 'none' | 'uploading' | 'error'|'success' = 'none';
  public error: string;

  constructor(
    private authServ: AuthService,
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
  }

  fileChange(file: File) {

    this.profileImage = file;

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgData = reader.result;
    }
  }

  handleChange(info: { file: UploadFile }): void {
    let reader = new FileReader();
    reader.readAsDataURL(info.file.originFileObj);
    reader.onload = () => {
      this.imgData = reader.result;
    }
  }

  onSubmit(event: any) {
    this.status = 'uploading';

    let sexText: '男' | '女' = this.userInfoForm.get('sex').value;
    let userAdd: UserAddResource = this.userInfoForm.value as UserAddResource;

    userAdd.sex = sexText === '男' ? Sex.male : Sex.female;
    userAdd = Object.assign(new UserAddResource(), userAdd);

    userAdd.profileImage = this.profileImage;
    this.authServ.register(userAdd)
      .subscribe(response => {
        if (response.status === 201) { // 注册成功， 导航到登录页面
          this.status = 'success';
          this.message.success('注册成功, 请登录');
          this.router.navigateByUrl('/auth/login');
        } else {
          let errorResponse = response as HttpErrorResponse;
          this.error = `${errorResponse.message}, ${JSON.stringify(errorResponse.error, null, 2)}`;
          this.status = 'error';
        }
      });
  }

  beforeImageUpload = (file:any) => {
    if(file instanceof File) {
      this.profileImage = file;
    
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgData = reader.result;
      }
    }
    
    return false;
  };
}
