import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserAddResource } from 'projects/lover-cloud/src/shared/models/user-add-resource';
import { Sex } from 'projects/lover-cloud/src/shared/models/sex.enum';
import { Router } from '@angular/router';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public userInfoForm: FormGroup = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl(''),
    birth: new FormControl(''),
    sex: new FormControl(''),
    password: new FormControl(''),
  });
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

    userAdd.sex = sexText === '男' ? Sex.female : Sex.male;
    userAdd = Object.assign(new UserAddResource(), userAdd);

    userAdd.profileImage = this.profileImage;
    this.authServ.register(userAdd)
      .subscribe(response => {
        if (response.ok) { // 注册成功， 导航到登录页面
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
}
