import { Entity } from 'projects/lover-cloud/src/shared/models/entity';
import { User } from 'projects/lover-cloud/src/shared/models/user';
import { IStatus } from 'projects/lover-cloud/src/shared/models/IStatus';

export type LoverRequests = LoverRequest[];

export class LoverRequest extends Entity implements IStatus {
    public receiver: User;
    public requester: User;
    public succeed: boolean;
    public requestDate: Date;
}

export class LoverRequestUpdate {
    public succeed: boolean;
}

export class LoverRequestAdd {
    public receiverId: string;

    constructor(receiver:User) {
        this.receiverId = receiver.id;
    }
}
