import { Images } from './image';
import { Entity } from 'projects/lover-cloud/src/shared/models/entity';
import { User } from 'projects/lover-cloud/src/shared/models/user';

export type LoverLogs = LoverLog[];

export class LoverLog extends Entity {
    public content: string;
    public createDateTime: Date;
    public loverPhotos: Images;
    public createrId: string;
    public creater: User;
}

