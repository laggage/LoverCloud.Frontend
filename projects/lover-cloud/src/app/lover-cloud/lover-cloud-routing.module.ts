import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoverCloudComponent } from './lover-cloud.component';
import { IndexComponent } from './components/index/index.component';
import { AlbumComponent } from './components/album/album.component';
import { ChatComponent } from './components/chat/chat.component';
import { LoverLogsComponent } from './components/lover-logs/lover-logs.component';
import { LoverLogAddComponent } from './components/lover-log-add/lover-log-add.component';
import { ImagePreviewService } from './services/image-preview.service';
import { LoverAnniversaryComponent } from './components/lover-anniversary/lover-anniversary.component';
import { ImagesComponent } from './components/images/images.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { AuthGuard } from '../authentication/services/auth.guard';
import { LoverRequestComponent } from './components/lover-request/lover-request.component';
import { LoverRequestGuard } from './services/lover-request.guard';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    path: 'lover', component: LoverCloudComponent, children: [
      { path: 'index', component: IndexComponent },
      { path: '', component: IndexComponent },
      { path: 'album', component: AlbumComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'log', component: LoverLogsComponent },
      { path: 'log/add', component: LoverLogAddComponent },
      { path: 'anniversary', component: LoverAnniversaryComponent },
      { path: 'images', component: ImagesComponent },
      { path: 'images/upload', component: ImageUploadComponent },
      { path: 'loverRequest', component: LoverRequestComponent, canActivate: [LoverRequestGuard] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    ImagePreviewService
  ]
})
export class LoverCloudRoutingModule { }
