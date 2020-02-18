import { Component, OnInit } from '@angular/core';
import { Albums, Album, AlbumAdd } from '../../models/album';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { AlbumEditComponent } from '../album-edit/album-edit.component';
import { AlbumService } from '../../services/album.service';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from '../../../authentication/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  title: string = '我们的相册';
  albums: Albums = [];

  constructor(
    private modalServ: NzModalService,
    private albumServ: AlbumService,
    private messageServ: NzMessageService,
    private router: Router
  ) { 
    this.loadAlbums();
  }

  ngOnInit(): void {
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
        this.albums.push(response.body);
      } else {
        this.messageServ.error('新建相册失败');
      }
    })
  }
}
