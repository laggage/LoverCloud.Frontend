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

const routes: Routes = [
  // { path: 'lover', component: LoverCloudComponent, pathMatch: 'full'},
  {
    path: 'lover', component: LoverCloudComponent, children: [
      { path: 'index', component: IndexComponent },
      { path: '', component: IndexComponent },
      { path: 'album', component: AlbumComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'log', component: LoverLogsComponent },
      { path: 'log/add', component: LoverLogAddComponent },
      { path: 'anniversary', component: LoverAnniversaryComponent }
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
