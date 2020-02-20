import { Entity } from 'projects/lover-cloud/src/shared/models/entity';
import { Tags } from './tag';
import { StatusImplement, IStatus } from 'projects/lover-cloud/src/shared/models/IStatus';
import { ImageService } from '../services/image.service';
import { User } from 'projects/lover-cloud/src/shared/models/user';

export type Images = Image[];

export class Image extends Entity implements IStatus{
    public url: string;
    public description: string;
    public name: string;
    public uploaderId: string;
    public albumId: string;
    public tags: Tags;
    public photoTakenDate: Date;

    private _thumbUrl: string;
    private _uploader: User;

    constructor(url?: string, name?: string, description?: string) {
        super();
        this.url = url;
        this.description = description;
        this.name = name;
    }

    public loadThumbUrl(imageServ: ImageService) {
        this.status = 'loading';
        this.statusDescription = '图片正在加载';
        imageServ.getAuthImage(this.url).subscribe(observer => {
            if(typeof observer === 'string') {
                this.thumbUrl = observer;
                this.status = 'loaded';
            } else {
                this.status = 'error_load';
            }
        }, () => {
            this.status = 'error_load';
        });
    }

    public getUploaderFromUser(user: User) {
        if(user && !this._uploader) {
            const users = [user, user.spouse];
            this._uploader = users.find(x => x.id === this.uploaderId);
        }
        return this._uploader;
    }

    public get thumbUrl() {
        return this._thumbUrl;
    }

    public set thumbUrl(value: string) {
        this._thumbUrl = value;
    }
}

export class UploadImage {
    constructor(
        public file: File,
        public albumId?: string,
        public name?: string,
        public description?: string,
        public tags?: Tags
    ) {
    }
}

export class ImageUpdate {
    constructor(
        public albumId?: string,
        public name?: string,
        public description?: string,
        public photoTakenDate?: Date,
        public tags?: Tags
    ) {
    }

    public static fromImage(image: Image) {
        if(!image) return;
        let update = new ImageUpdate(
            image.albumId, image.name, image.description, image.photoTakenDate, image.tags);
        return update;
    }
}

export class UploadImageViewModel extends StatusImplement {
    private _thumbUrl: string;

    constructor(public file: File,
        public albumId?: string,
        public name?: string,
        public description?: string,
        public tags?: Tags) {
            super();
        let reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                this._thumbUrl = reader.result as string;
            }
        }
    }

    public get thumbUrl() {
        return this._thumbUrl;
    }

    public set thumbUrl(value: string) {
        this._thumbUrl = value;
    }

    public get originUploadImageObj() {
        return new UploadImage(this.file, this.albumId, this.name, this.description, this.tags);
    }
}
