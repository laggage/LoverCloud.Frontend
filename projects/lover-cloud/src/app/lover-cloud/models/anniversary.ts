import { Entity } from 'projects/lover-cloud/src/shared/models/entity';
import { TimeSpan } from 'projects/lover-cloud/src/shared/services/time-span';

export type Anniversaries = Anniversary[];

export class Anniversary extends Entity {

    constructor(public name?: string,
        public date: Date = new Date(),
        public description?: string,
    ) {
        super();
    }

    private _timeSpan: TimeSpan;
    private _isLoading: boolean;

    public get timeSpan(): TimeSpan {
        if (!this._timeSpan) {
            this._timeSpan = new TimeSpan(new Date(), new Date(this.date));
        }
        return this._timeSpan;
    }

    public set timeSpan(timeSpan: TimeSpan) {
        this._timeSpan = timeSpan;
    }

    public get isLoading() {
        return this._isLoading;
    }

    public set isLoading(value: boolean) {
        this._isLoading = value;
    }
}
