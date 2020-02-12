import { Sex } from './sex.enum';

export class UserAddResource {
    public userName: string;
    public password: string;
    public email: string;
    public profileImage: File;
    public sex: Sex;
    public birth: Date;
}
