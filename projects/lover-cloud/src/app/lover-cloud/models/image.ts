import { Entity } from 'projects/lover-cloud/src/shared/models/entity';

export type Images = Image[];

export class Image extends Entity {
    public url: string;
    public description: string;
    public name: string;

    constructor(url?: string, name?: string, description?: string) {
        super();
        this.url = url;
        this.description = description;
        this.name = name;
    }
}
