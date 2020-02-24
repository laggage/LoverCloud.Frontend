import { Component, OnInit, Input } from '@angular/core';
import { Image as LoverCloudImage } from '../../models/image';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.css']
})
export class ImagePreviewComponent implements OnInit {
  @Input() public imageUrl: string;
  @Input() public image: LoverCloudImage
  public imgHeight: number;
  public imgWidth: number;

  constructor() { }

  ngOnInit(): void {
  }

  onImageLoaded(event: any) {
    if (event.target instanceof HTMLImageElement) {
      let img = new Image();
      img.src = event.target.src;
      this.imgHeight = img.height;
      this.imgWidth = img.width;
    }
  }
}
