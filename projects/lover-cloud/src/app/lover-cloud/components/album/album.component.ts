import { Component, OnInit } from '@angular/core';
import { Albums, Album, AlbumAdd } from '../../models/album';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { AlbumEditComponent } from '../album-edit/album-edit.component';
import { AlbumService } from '../../services/album.service';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from '../../../authentication/services/auth.service';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { User } from 'projects/lover-cloud/src/shared/models/user';
import { UserService } from '../../../authentication/services/user.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
  animations: [
    trigger('isClicked',[
      state('normal', style({
        transform: 'scale(1,1)'
      })),
      state('clicked', style({
        transform: 'scale(.9,.9)'
      })),
      transition('normal => clicked', [
        animate('0.1s ease-in-out')
      ]),
      transition('clicked => normal', [
        animate('0.1s ease-in-out')
      ]),
    ])
  ]
})
export class AlbumComponent implements OnInit {
  title: string = '我们的相册';
  albums: Albums = [];
  isClicked: boolean = false;
  user: User;
  userProfileImage: string;
  spouseProfileImage: string;

  constructor(
    private modalServ: NzModalService,
    private albumServ: AlbumService,
    private messageServ: NzMessageService,
    private router: Router,
    private userServ: UserService
  ) { 
    this.loadAlbums();
    this.loadUser();
  }

  ngOnInit(): void {
  }

  private loadUser() {
    this.userServ.getUser().subscribe(response => {
      if(response instanceof User) {
        this.user = response;
      }
      if(this.user) {
        this.user.getProfileImage().subscribe(o => this.userProfileImage = o);
        this.user.spouse.getProfileImage().subscribe(o => this.spouseProfileImage = o);
      }
    })
  }

  private loadAlbums() {
    this.albumServ.get().subscribe(response => {
      AuthService.toAuthPageIfUnauthorized(response, this.router);
      if(response instanceof HttpResponse && response.status === 200) {
        this.albums.push(...response.body.value);
      }
    })
  }

  private deleteAlbum(albumId: string) {
    this.albumServ.delete(albumId).subscribe(res => {
      if(res instanceof HttpResponse && res.status === 204) {
        let index = this.albums.findIndex(x => x.id === albumId)
        if(index>=0) {
          this.albums.splice(index, 1);
        }
      } else {
        this.messageServ.error('操作失败, 请检查网络');
      }
    })
  }

  confirmDeleteAlbum(album:Album) {
    this.modalServ.confirm({
      nzTitle: '警告',
      nzContent: `确定要删除相册"${album.name}"吗? 数据将无法恢复!!!`,
      nzOnOk: () => {
        this.deleteAlbum(album.id);
      }
    });
  }

  openUpdateAlbumModal(album: Album) {
    let old = Object.assign(new Album(), album);
    let modal = this.modalServ.create({
      nzTitle: '编辑相册',
      nzContent: AlbumEditComponent,
      nzComponentParams: {
        album: album
      },
      nzOnOk: () => {
        this.albumServ.patch(album).subscribe(response => {
          if(response instanceof HttpResponse && response.status === 204) {
          } else {
            this.messageServ.error('操作失败');
            Object.assign(album, old);
          }
        })
      },
      nzFooter: null,
    });
    modal.afterClose.subscribe(() => modal.destroy());
  }

  openNewAlbumModal() {
    let modal = this.modalServ.create({
      nzContent: AlbumEditComponent,
      nzClosable: false,
      nzTitle: '新建相册',
      nzOnOk: (v) => {
        this.newAlbum(v.album);
      },
      nzFooter: null,
      nzStyle: {
        'max-height': '90%',
        'overflow': 'hidden',
        'position': 'absolute',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50%, -50%)',
        'max-width': '85vw',
      },
      nzBodyStyle: {
        'overflow-y': 'auto',
      },
    });
    modal.afterClose.subscribe(() => modal.destroy());
  }

  private newAlbum(album: Album) {
    this.albumServ.add(AlbumAdd.fromAlbum(album)).subscribe(response => {
      if(response && response.status === 201 && response instanceof HttpResponse) {
        this.albums.push(Object.assign(new Album(), response.body));
      } else {
        this.messageServ.error('新建相册失败');
      }
    })
  }

  /**
   * 相册被点击回调
   * @param album 被点击的相册
   */
  onAlbumCardClicked(album: Album) {
    album.status = 'clicked';
    // 100ms后动画完成, 回调进行路由
    setTimeout(() => {
      album.status = 'none';
      this.router.navigate(['lover/images'], {queryParams: album});
    }, 100)
  }
}
