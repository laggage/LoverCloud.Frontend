import { Component, OnInit, Input } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { UploadImage, UploadImageViewModel } from '../../models/image';
import { ImageService } from '../../services/image.service';
import { InputComponent } from '../input/input.component';
import { Album, AlbumNavigation } from '../../models/album';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  @Input() album: Album;
  public images: UploadImageViewModel[] = [];
  public failedUploadImages: UploadImageViewModel[] = [];
  public isUploading: boolean = false;
  public progress: number = 0;
  public navigationExtras: NavigationExtras = {};

  private maxImageCount = 12;

  constructor(
    private message: NzMessageService,
    private imageServ: ImageService,
    private modalServ: NzModalService,
    private route: ActivatedRoute
  ) { 
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // 从路由参数中获取相册信息
      this.album = new Album();
      if (params) {
        Object.assign(this.album, params);
        // 传参时number类型可能变为strin类型, 手动转回number类型
        this.album.photosCount = typeof this.album.photosCount === 'string'
          ? Number.parseInt(this.album.photosCount) 
          : this.album.photosCount;
      }
      this.navigationExtras.queryParams = new AlbumNavigation(this.album);
    });
  }

  onFileChange(event: Event) {
    let input = event.target;
    if (input instanceof HTMLInputElement) {
      for (let i = 0; i < input.files.length; i++) {
        if (this.images.length >= this.maxImageCount) {
          this.message.info('图片数量达到上限');
          return;
        }
        let file = input.files[i];
        let regex: RegExp = /^image\/.*/
        if (regex.test(file.type)) {
          this.images.push(
            new UploadImageViewModel(
              file,
              this.album ? this.album.id : null,
              file.name && file.name.length > 0 ? file.name : null));
        }
      }
    }
  }

  reUploadImage(image: UploadImageViewModel) {
    this.images.push(image);
    this.failedUploadImages.splice(this.failedUploadImages.indexOf(image), 1);
  }

  removeImage(image: UploadImageViewModel) {
    this.images.splice(this.images.indexOf(image), 1);
  }

  removeAllImages() {
    if(this.images.length > 0)
      this.images.splice(0, this.images.length);
  }

  editImageName(image: UploadImageViewModel) {
    let modal = this.modalServ.create({
      nzTitle: '编辑图片名',
      nzContent: InputComponent,
      nzFooter: null,
      nzClosable:false,
      nzComponentParams: {value: image.name},
      nzOnOk: (c) => {
        image.name = c.value;
      }
    });
    modal.afterClose.subscribe(() => modal.destroy() );
  }

  editImageDescription(image: UploadImageViewModel) {
    let modal = this.modalServ.create({
      nzTitle: '编辑图片描述',
      nzContent: InputComponent,
      nzFooter: null,
      nzClosable:false,
      nzComponentParams: {value: image.description, multiline: true},
      nzOnOk: (c) => {
        image.description = c.value;
      }
    });
    modal.afterClose.subscribe(() => modal.destroy() );
  }

  uploadImage() {
    let imageToUploadCount = this.images.length;
    this.isUploading = true;
    this.images.forEach(image => {
      image.status = 'loading';
      image.name = image.name ? image.name : image.file.name;
      this.imageServ.uploadImage(image.originUploadImageObj).subscribe(response => {
        if(response instanceof HttpResponse && response.status === 201) {
          image.progress = 100;
          this.message.success('上传成功');
          this.images.splice(this.images.indexOf(image), 1);
          image.status = 'none';
          this.album.photosCount += 1;
          this.navigationExtras.queryParams = new AlbumNavigation(this.album);
        } else if(response instanceof HttpErrorResponse) { // 上传失败
          this.message.error('遇到错误, 请检查网络.');
          this.failedUploadImages.push(...this.images.splice(this.images.indexOf(image), 1));
          image.status = 'error_load';
        } else if(typeof response === 'number') {
          image.progress = response;
        }
        if(this.images.length <= 0) {
          this.isUploading = false;
        }
        this.progress = Math.round(100 * (imageToUploadCount - this.images.length)/ imageToUploadCount);
      })
    })
  }

  removeFromErrorList(image: UploadImageViewModel) {
    this.failedUploadImages.splice(this.failedUploadImages.indexOf(image), 1);
  }
}
