import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthentionComponent } from './authention.component';

const routes: Routes = [
  {
    path: 'auth', component: AuthentionComponent, children: [
      { path: 'register', component: RegisterComponent },  // 注册
      { path: 'login', component: LoginComponent }, // 登录
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
