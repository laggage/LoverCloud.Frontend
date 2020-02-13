import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


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
  {
    path: 'lover',
    loadChildren: () =>
      import('./lover-cloud/lover-cloud.module')
        .then(m => m.LoverCloudModule)
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
