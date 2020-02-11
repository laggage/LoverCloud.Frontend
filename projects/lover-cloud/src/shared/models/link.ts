export type Links=Link[];

export class Link {
    public rel: string;
    public method: 'get'|'post'|'patch'|'update'|'delete';
    public url: string;
}
