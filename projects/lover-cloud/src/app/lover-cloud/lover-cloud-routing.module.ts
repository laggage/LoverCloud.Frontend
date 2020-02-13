import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoverCloudComponent } from './lover-cloud.component';
import { IndexComponent } from './components/index/index.component';
import { AlbumComponent } from './components/album/album.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  // { path: 'lover', component: LoverCloudComponent, pathMatch: 'full'},
  {
    path: 'lover', component: LoverCloudComponent, children: [
      { path: 'index', component: IndexComponent },
      { path: '', component: IndexComponent },
      { path: 'album', component: AlbumComponent },
      { path: 'chat', component: ChatComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoverCloudRoutingModule { }
