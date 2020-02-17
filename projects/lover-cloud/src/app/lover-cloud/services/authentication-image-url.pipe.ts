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
  transform(value: string) {
    let reg: RegExp = /^https?:\/\//
    if (!reg.test(value)) {
      // value.re
      // console.log(value);
      return new Promise<string>((resolve, reject) => resolve(value));
    }

    return this.imageServ.getAuthImage(value).toPromise();
  }

}
