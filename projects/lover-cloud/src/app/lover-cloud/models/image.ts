import { Entity } from 'projects/lover-cloud/src/shared/models/entity';
import { Tags } from './tag';
import { StatusImplement } from 'projects/lover-cloud/src/shared/models/IStatus';

export type Images = Image[];

export class Image extends Entity {
    public url: string;
    public description: string;
    public name: string;

    private _thumbUrl: string;

    constructor(url?: string, name?: string, description?: string) {
        super();
        this.url = url;
        this.description = description;
        this.name = name;
    }

    public get thumbUrl() {
        return this._thumbUrl;
    }

    public set thumbUrl(value: string) {
        this._thumbUrl = value;
    }
}

export class ImageAdd extends StatusImplement {
    
    private _thumbUrl: string;

    constructor(
        public file: File,
        public albumId?:string,
        public name?: string,
        public description?: string,
        public tags?: Tags,
    ) {
        super();
        let reader = new FileReader();
        if(file) {
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
}
