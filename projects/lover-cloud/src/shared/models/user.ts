import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Sex } from './sex.enum';
import { ImageService } from '../../app/lover-cloud/services/image.service';
import { Lover } from '../../app/lover-cloud/models/lover';
import { Observable, Subscription } from 'rxjs';
import { take, shareReplay } from 'rxjs/operators';
import { Image } from '../../app/lover-cloud/models/image';

const getProfileImage = () => {
    return new Observable<string>(observer => {
        let sub: Subscription;
        if(!this._profileImageThumbUrl) {
            if(this.profileImageUrl) {
                sub = this.imgServ.getAuthImage(this.profileImageUrl).subscribe(response => {
                    if(typeof response === 'string') {
                        console.log('getProfileImage successed')
                        this._profileImageThumbUrl = response;
                        observer.next(this._profileImageThumbUrl);
                        observer.complete();
                        sub.unsubscribe();
                    }
                });
            } else {
                observer.complete();
            }
        } else {
            observer.next(this._profileImageThumbUrl);
            observer.complete();
            console.log('get profile image from cache')
            return {
                unsubscribe(){}
            }
        }
    });
}

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

    private _profileImageThumbUrl: string;
    private _profileImage:Image ;

    public get profileImage() {
        if(!this._profileImage) {
            this._profileImage = new Image(this.profileImageUrl);
            this._profileImage.loadThumbUrl(this.imgServ);
        }

        return this._profileImage;
    }

    public getProfileImage() {
        return new Observable<string>(observer => {
            let sub: Subscription;
            if(!this._profileImageThumbUrl) {
                if(this.profileImageUrl) {
                    sub = this.imgServ.getAuthImage(this.profileImageUrl).subscribe(response => {
                        if(typeof response === 'string') {
                            console.log('getProfileImage successed')
                            this._profileImageThumbUrl = response;
                            observer.next(this._profileImageThumbUrl);
                            observer.complete();
                            sub.unsubscribe();
                        }
                    });
                } else {
                    observer.complete();
                }
            } else {
                observer.next(this._profileImageThumbUrl);
                observer.complete();
            }
        }).pipe(
            shareReplay(1),
            take(1));
    }

    public get totalAnniversaryCount() {
        let array = [this.lover.loveDay, this.lover.weddingDay, this.birth, this.spouse.birth];
        let extraAnniversaryCount = array.filter(x => x).length;
        return this.loverAnniversaryCount + extraAnniversaryCount;
    }
}
