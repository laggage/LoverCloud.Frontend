import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoverCloudComponent } from './lover-cloud.component';

const routes: Routes = [
  { path: '', component: LoverCloudComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoverCloudRoutingModule { }
