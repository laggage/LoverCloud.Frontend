import { User } from 'projects/lover-cloud/src/shared/models/user';
import { Entity } from 'projects/lover-cloud/src/shared/models/entity';

export type LoverRequests = LoverRequest[];

export class LoverRequest extends Entity {
    public requester: User;
    public receiver: User;
    public succeed: boolean;
}
