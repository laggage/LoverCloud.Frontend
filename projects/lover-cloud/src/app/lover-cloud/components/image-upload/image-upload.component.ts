import { Component, OnInit, Input } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ImageAdd } from '../../models/image';
import { ImageService } from '../../services/image.service';
import { InputComponent } from '../input/input.component';
import { Album } from '../../models/album';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  @Input() album: Album;
  public images: ImageAdd[] = [];
  private maxImageCount = 12;

  constructor(
    private message: NzMessageService,
    private imageServ: ImageService,
    private modalServ: NzModalService,
    private route: ActivatedRoute
  ) { 
    let image = new ImageAdd(null);
    this.images.push()
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.album = new Album();
      if(params)
        Object.assign(this.album, params);
    })
  }

  onFileChange(event: Event) {
    let input = event.target;
    if (input instanceof HTMLInputElement) {
      for (let i = 0; i < input.files.length; i++) {
        if(this.images.length >= this.maxImageCount) {
          this.message.info('图片数量达到上限');
          return;
        }
        let file = input.files[i];
        let regex: RegExp = /^image\/.*/
        if (regex.test(file.type)) {
          this.images.push(new ImageAdd(file, this.album ? this.album.id : null));
        }
      }
    }
  }

  removeImage(image: ImageAdd) {
    this.images.splice(this.images.indexOf(image), 1);
  }

  removeAllImages() {
    if(this.images.length > 0)
      this.images.splice(0, this.images.length);
  }

  editImageName(image: ImageAdd) {
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

  editImageDescription(image: ImageAdd) {
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
    this.images.forEach(image => {
      this.imageServ.uploadImage(image).subscribe(response => {
         console.log(response);
        if(response instanceof HttpResponse) {
          this.message.success('上传成功');
        }
        // if(response)
      })
    })
    
  }
}
