import { Entity } from 'projects/lover-cloud/src/shared/models/entity';

export type Anniversaries = Anniversary[];

export class Anniversary extends Entity {
    public description: string;
    public name: string;
    public date: Date;
}
