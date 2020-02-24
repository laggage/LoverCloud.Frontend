import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthentionComponent } from './authention.component';
import { LoverRequestComponent } from './lover-request/lover-request.component';
import { AuthGuard } from './services/auth.guard';
import { NoLoverGuard } from './services/no-lover.guard';

const routes: Routes = [
  {
    path: 'auth', component: AuthentionComponent, children: [
      { path: 'register', component: RegisterComponent },  // 注册
      { path: 'login', component: LoginComponent }, // 登录
      { path: 'loverRequest', component: LoverRequestComponent, canActivate: [AuthGuard,NoLoverGuard] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
