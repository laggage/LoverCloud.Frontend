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
    public coverImageUrl: string;
    public photosCount: number;
}

export class AlbumAdd {
   
    constructor(
        public name: string,
        public description: string,
        public tags: Tags = []
        ) {
        
    }

    static fromAlbum(album: Album) {
        return new AlbumAdd(album.name, album.description, album.tags);
    }
}
