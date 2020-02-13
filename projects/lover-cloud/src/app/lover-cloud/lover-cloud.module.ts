import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoverCloudRoutingModule } from './lover-cloud-routing.module';
import { LoverCloudComponent } from './lover-cloud.component';
import { IndexComponent } from './components/index/index.component';
import { AlbumComponent } from './components/album/album.component';
import { ChatComponent } from './components/chat/chat.component';
import { AntdModule } from '../../shared/antd-module/antd-module.module';
import { ImageService } from './services/image.service';


@NgModule({
  declarations: [LoverCloudComponent, IndexComponent, AlbumComponent, ChatComponent],
  imports: [
    CommonModule,
    LoverCloudRoutingModule,
    AntdModule,
  ],
  bootstrap: [LoverCloudComponent],
  providers: [
    ImageService
  ]
})
export class LoverCloudModule { }
