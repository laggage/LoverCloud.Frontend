import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Albums } from '../../app/lover-cloud/models/album';
import { Sex } from './sex.enum';

export class User {
    public token: Token;
    public username: string;
    public sex: Sex;
    public profileImageUrl: string;
    // 表示该用户的情侣对象
    public spouse: User;    
    public birth: Date;

    public albums: Albums;
}
