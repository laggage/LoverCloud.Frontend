import { Tags } from './tag';
import { Images } from './image';
import { Entity } from 'projects/lover-cloud/src/shared/models/entity';
import { User } from 'projects/lover-cloud/src/shared/models/user';

export type Albums = Album[];

export class Album extends Entity {
    public name: string;
    public description: string;
    public createDate: Date;
    public photos: Images;
    public tags: Tags;
    public coverImageUrl: string;
    public photosCount: number;
    public createrId:string;

    private _creater: User;

    public getCreaterFromUser(user: User) {
        if(user && user.spouse && !this._creater) {
            const users = [user, user.spouse];
            this._creater = users.find(x => x.id === this.createrId);
        }
        return this._creater;
    }
}

export class AlbumNavigation {
    public id: string;
    public name: string;
    public photosCount: number;
    public createrId:string;
    constructor(
        album: Album
    ) {
        this.id = album.id;
        this.name = album.name;
        this.photosCount = album.photosCount;
        this.createrId = album.createrId;
    }
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
