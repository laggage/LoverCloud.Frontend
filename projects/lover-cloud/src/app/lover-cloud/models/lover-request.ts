import { Entity } from 'projects/lover-cloud/src/shared/models/entity';

export type LoverRequests = LoverRequest[];

export class LoverRequest extends Entity {
    public requesterId: string;
    public receiverId: string;
    public succeed: boolean;
}
