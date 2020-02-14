import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoverCloudRoutingModule } from './lover-cloud-routing.module';
import { LoverCloudComponent } from './lover-cloud.component';
import { IndexComponent } from './components/index/index.component';
import { AlbumComponent } from './components/album/album.component';
import { ChatComponent } from './components/chat/chat.component';
import { AntdModule } from '../../shared/antd-module/antd-module.module';
import { ImageService } from './services/image.service';
import { LoverLogsComponent } from './components/lover-logs/lover-logs.component';
import { LoverLogAddComponent } from './components/lover-log-add/lover-log-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoverLogService } from './services/lover-log.service';
import { LoverProfileImageComponent } from './components/lover-profile-image/lover-profile-image.component';
import { AuthenticationImageUrlPipe } from './services/authentication-image-url.pipe';


@NgModule({
  declarations: [LoverCloudComponent, IndexComponent, AlbumComponent, ChatComponent, LoverLogsComponent, LoverLogAddComponent, LoverProfileImageComponent, AuthenticationImageUrlPipe],
  imports: [
    CommonModule,
    LoverCloudRoutingModule,
    AntdModule,
    ReactiveFormsModule
  ],
  bootstrap: [LoverCloudComponent],
  providers: [
    ImageService,
    LoverLogService
  ]
})
export class LoverCloudModule { }
