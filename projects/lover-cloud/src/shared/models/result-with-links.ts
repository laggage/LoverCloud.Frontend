import { Links } from './link';

export class ResultWithLinks<T> {
    public links: Links;
    public value: T[];
}
