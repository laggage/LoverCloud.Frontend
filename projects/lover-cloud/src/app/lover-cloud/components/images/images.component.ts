import { Component, OnInit } from '@angular/core';
import { Album } from '../../models/album';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Images, Image } from '../../models/image';
import { ImageService } from '../../services/image.service';
import { HttpResponse } from '@angular/common/http';
import { environment } from 'projects/lover-cloud/src/environments/environment';
import { PaginationMetadata } from 'projects/lover-cloud/src/shared/models/pagination-metadata';
import { User } from 'projects/lover-cloud/src/shared/models/user';
import { UserService } from '../../../authentication/services/user.service';
import { AuthService } from '../../../authentication/services/auth.service';
import { NzModalService } from 'ng-zorro-antd';
import { ImagePreviewService } from '../../services/image-preview.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  public album: Album = new Album();
  public images: Images = [];
  public paginationMetadata: PaginationMetadata = new PaginationMetadata(1, 18);
  public user: User;
  public editingImage: Image;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private imageServ: ImageService,
    private userServ: UserService,
    private modalServ: NzModalService,
    private imagePreviewServ: ImagePreviewService
  ) {
  }

  ngOnInit(): void {
    this.loadUser();
    /* 获取路由参数 */
    this.route.queryParams.subscribe((params: Params) => {
      Object.assign(this.album, params);
      if(typeof this.album.photosCount === 'string') {
        this.album.photosCount = Number.parseInt(this.album.photosCount)
      }
      this.loadImages();
    });
  }

  private loadUser() {
    this.userServ.getUser().subscribe(observer => {
      if(observer instanceof User) {
        this.user = observer
      } else {
        AuthService.toAuthPageIfUnauthorized(observer, this.router);
      }
    })
  }

  private loadImages() {
    this.imageServ.getImages({
      albumId: this.album.id,
      pageSize: this.paginationMetadata.pageSize,
      pageIndex: this.paginationMetadata.pageIndex,
    }, true).subscribe(response => {
      if(response instanceof HttpResponse) {
        this.images = response.body.value;
        this.paginationMetadata = JSON.parse(
          response.headers.getAll(environment.paginationHeaderKey)[0]
        )
      }
    })
  }

  private deleteImage(image: Image) {
    this.imageServ.deleteImage(image).subscribe(observer => {
      if (observer.status === 204) {
        this.images.splice(this.images.indexOf(image), 1);
        this.album.photosCount -= 1;
      } else {
        image.status = 'error_delete';
        image.statusDescription = '删除失败';
      }
    })
    
  }

  navigateToUploadImage() {
    this.router.navigate(['/lover/images/upload'], {
      queryParams: this.album
    });
  }

  confirmDeleteImage(image: Image) {
    this.modalServ.confirm({
      nzTitle: '警告',
      nzContent: `确定要删除图片 ${image.name && image.name.length > 0 ? image.name : '未命名'} 吗? 数据将无法恢复!!!`,
      nzClosable: false,
      nzOnOk: () => {
        image.status = 'deleting';
        this.deleteImage(image);
      }
    })
  }

  previewImage(image: Image) {
    this.imagePreviewServ.previewImage(image);
  }

  beginEditImage(image: Image) {
    this.editingImage = Object.assign(new Image(), image);
  }
 
  editImage(image: Image) {
    this.imageServ.patchImage(image).subscribe(observer => {
      if (observer.status === 204) {
        Object.assign(this.images.find(x => x.id === image.id), image);
        this.editingImage = null;
      } else {
        AuthService.toAuthPageIfUnauthorized(observer, this.router);
      }
    });
  }

  cancleEditImage() {
    this.editingImage = null;
  }
}
