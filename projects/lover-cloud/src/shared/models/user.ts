import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Albums } from '../../app/lover-cloud/models/album';
import { Sex } from './sex.enum';
import { ImageService } from '../../app/lover-cloud/services/image.service';
import { Lover } from '../../app/lover-cloud/models/lover';

export class User {
    public id: string;
    public token: Token;
    public userName: string;
    public sex: Sex;
    public profileImageUrl: string = '';
    // 表示该用户的情侣对象
    public spouse: User;
    public birth: Date;
    public loverLogCount: number = 0;
    public loverAlbumCount: number = 0;
    public loverAnniversaryCount: number = 0;
    public lover: Lover;

    constructor(private imgServ: ImageService) {
    }

    public async getProfileImage() {
        if (!this.profileImageUrl) {
            return null;
        }
        let data = await this.imgServ.getAuthImage(this.profileImageUrl).toPromise();
        return data;
    }

    public get totalAnniversaryCount() {
        let array = [this.lover.loveDay, this.lover.weddingDay, this.birth, this.spouse.birth];
        let extraAnniversaryCount = array.filter(x => x).length;
        return this.loverAnniversaryCount + extraAnniversaryCount;
    }
}
