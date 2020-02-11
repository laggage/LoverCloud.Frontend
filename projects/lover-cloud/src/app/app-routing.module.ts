import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../shared/components/login/login.component';
import { RegisterComponent } from '../shared/components/register/register.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent }, // 登录
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // 默认路由
  { path: 'register', component: RegisterComponent },  // 注册
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
