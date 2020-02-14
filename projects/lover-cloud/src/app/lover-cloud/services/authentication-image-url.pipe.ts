import { Pipe, PipeTransform } from '@angular/core';
import { ImageService } from './image.service';

@Pipe({
  name: 'authenticationImageUrl'
})
export class AuthenticationImageUrlPipe implements PipeTransform {

  constructor(
    private imageServ: ImageService
  ) {
      
  }
  async transform(value: string) {
    return this.imageServ.getAuthImage(value).toPromise();
  }

}
