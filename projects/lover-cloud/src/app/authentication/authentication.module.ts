import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthentionComponent } from './authention.component';
import { AntdModule } from '../../shared/antd-module/antd-module.module';
import { AuthLogoComponent } from './auth-logo/auth-logo.component';
import { LoverRequestComponent } from './lover-request/lover-request.component';
import { LoverRequestService } from '../lover-cloud/services/lover-request.service';
import { ImageService } from '../lover-cloud/services/image.service';
import { AuthenticationImageUrlPipe } from '../lover-cloud/services/authentication-image-url.pipe';

@NgModule({
  declarations: [
    AuthentionComponent,
    LoginComponent,
    RegisterComponent,
    AuthLogoComponent,
    LoverRequestComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    AntdModule,
  ],
  providers: [
    LoverRequestService,
    ImageService
  ]
})
export class AuthenticationModule { }
