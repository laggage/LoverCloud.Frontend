import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserAddResource } from 'projects/lover-cloud/src/shared/models/user-add-resource';
import { Sex } from 'projects/lover-cloud/src/shared/models/sex.enum';
import { Router } from '@angular/router';

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
  public imgData: any;

  constructor(
    private authServ: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  fileChange(file: File[]) {
    if (file.length == 0) {
      this.imgData = null;
      return;
    }
    this.profileImage = file[0];

    let reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = () => {
      this.imgData = reader.result;

    }
  }

  onSubmit(event: any) {
    let sexText: '男'|'女' = this.userInfoForm.get('sex').value;
    let userAdd: UserAddResource = this.userInfoForm.value as UserAddResource;

    userAdd.sex = sexText === '男' ? Sex.female : Sex.male;
    userAdd = Object.assign(new UserAddResource(), userAdd);

    userAdd.profileImage = this.profileImage;
    this.authServ.register(userAdd)
      .subscribe(response => {
        if(response.ok) { // 注册成功， 导航到登录页面
          this.router.navigateByUrl('/auth/login');
        }
      });
  }
}
