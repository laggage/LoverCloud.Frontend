import { QueryParameters } from 'projects/lover-cloud/src/shared/models/query-parameters';

export class ImageQueryParameters extends QueryParameters {
    /**
     *
     */
    constructor(
        public albumId?: string
    ) {
        super();
    }
}
