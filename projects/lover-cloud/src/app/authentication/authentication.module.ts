import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthentionComponent } from './authention.component';
import { AntdModule } from '../../shared/antd-module/antd-module.module';
import { AuthLogoComponent } from './auth-logo/auth-logo.component';

@NgModule({
  declarations: [
    AuthentionComponent,
    LoginComponent,
    RegisterComponent,
    AuthLogoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    AntdModule
  ]
})
export class AuthenticationModule { }
