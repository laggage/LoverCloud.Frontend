import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Albums } from '../../app/lover-cloud/models/album';
import { Sex } from './sex.enum';
import { ImageService } from '../../app/lover-cloud/services/image.service';

export class User {
    public token: Token;
    public username: string;
    public sex: Sex;
    public profileImageUrl: string = '';
    // 表示该用户的情侣对象
    public spouse: User;
    public birth: Date;

    public albums: Albums;

    /**
     *
     */
    constructor(private imgServ: ImageService) {
    }

    public async getProfileImage() {
        if(!this.profileImageUrl) {
            return null;
        }
        let data = await this.imgServ.getAuthImage(this.profileImageUrl).toPromise();
        return data;
    }
}
