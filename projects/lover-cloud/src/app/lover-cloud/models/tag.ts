import { Entity } from 'projects/lover-cloud/src/shared/models/entity';

export type Tags = Tag[];

export class Tag extends Entity {
    public name: string;
}
