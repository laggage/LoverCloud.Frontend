import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './authentication/services/auth.guard';
import { LoverGuard } from './authentication/services/lover.guard';


const routes: Routes = [
  { path: 'auth', redirectTo: 'auth/login' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/authentication.module')
        .then(x => x.AuthenticationModule),
    pathMatch: 'full'
  },
  { path: 'lover', redirectTo: 'lover/index' },
  { path: 'loverRequest', redirectTo: 'auth/loverRequest' },
  {
    path: 'lover',
    loadChildren: () =>
      import('./lover-cloud/lover-cloud.module')
        .then(m => m.LoverCloudModule),
    canLoad: [AuthGuard, LoverGuard]
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
