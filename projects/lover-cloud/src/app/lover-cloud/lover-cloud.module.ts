import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoverCloudRoutingModule } from './lover-cloud-routing.module';
import { LoverCloudComponent } from './lover-cloud.component';


@NgModule({
  declarations: [LoverCloudComponent],
  imports: [
    CommonModule,
    LoverCloudRoutingModule
  ]
})
export class LoverCloudModule { }
