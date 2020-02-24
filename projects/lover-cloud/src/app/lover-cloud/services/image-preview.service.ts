import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { Image } from '../models/image';
import { ImagePreviewComponent } from '../components/image-preview/image-preview.component';
import { ImageService } from './image.service';

@Injectable()
export class ImagePreviewService {

  constructor(
    private modalServ: NzModalService,
    private imageServ: ImageService
  ) {
  }

  public previewImage(img: Image|string) {
    let param = null;
    if (typeof img === 'string') {
      param = {
        imageUrl: img
      }
    } else {
      img = Object.assign(new Image(), img);
      !img.thumbUrl ? img.loadThumbUrl(this.imageServ) : null;
      param = {
        image: img
      }
    }
    
    let modal = this.modalServ.create({
      nzClassName: 'preview-image-modal',
      nzContent: ImagePreviewComponent,
      nzFooter: null,
      nzClosable: false,
      nzComponentParams: param,
      nzStyle: {
        'overflow': 'hidden',
        'position': 'absolute',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50%, -50%)',
        'width': '100vw',
        'padding': '0 .3rem'
      },
      nzBodyStyle: {
        'overflow-y': 'auto',
        padding: '0',
        'max-width': '100vw',
      },
    });
    /* 需要主动回收 */
    modal.afterClose.subscribe(() => {
      modal.destroy();
    })
  }

}
