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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoverLogService } from './services/lover-log.service';
import { LoverProfileImageComponent } from './components/lover-profile-image/lover-profile-image.component';
import { AuthenticationImageUrlPipe } from './services/authentication-image-url.pipe';
import { ImagePreviewComponent } from './components/image-preview/image-preview.component';
import { LoverAnniversaryComponent } from './components/lover-anniversary/lover-anniversary.component';
import { DatePickComponent } from './components/date-pick/date-pick.component';
import { LoverService } from './services/lover.service';
import { AnniversaryService } from './services/anniversary.service';
import { AnniversaryEditComponent } from './components/anniversary-edit/anniversary-edit.component';
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
import { AlbumEditComponent } from './components/album-edit/album-edit.component';
import { AlbumService } from './services/album.service';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { ImagesComponent } from './components/images/images.component';
import { InputComponent } from './components/input/input.component';


@NgModule({
  declarations: [LoverCloudComponent, IndexComponent, AlbumComponent, ChatComponent, LoverLogsComponent, LoverLogAddComponent, LoverProfileImageComponent, AuthenticationImageUrlPipe, ImagePreviewComponent, LoverAnniversaryComponent, DatePickComponent, AnniversaryEditComponent, NavHeaderComponent, AlbumEditComponent, ImageUploadComponent, ImagesComponent, InputComponent],
  imports: [
    CommonModule,
    LoverCloudRoutingModule,
    AntdModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  bootstrap: [LoverCloudComponent],
  providers: [
    ImageService,
    LoverLogService,
    LoverService,
    AnniversaryService,
    AlbumService
  ]
})
export class LoverCloudModule { }
