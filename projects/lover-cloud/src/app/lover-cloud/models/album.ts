import { Tags } from './tag';
import { Images } from './image';
import { Entity } from 'projects/lover-cloud/src/shared/models/entity';

export type Albums = Album[];

export class Album extends Entity {
    public name: string;
    public description: string;
    public createDate: Date;
    public photos: Images;
    public tags: Tags;
}
