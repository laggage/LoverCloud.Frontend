export class TimeSpan {
    private _interval: number; // ms
    private _day: number;
    private _hour: number;
    private _minute: number;
    private _second: number;
    private _millisecond: number

    private _totalDay: number;
    private _totalHour: number;
    private _totalMinute: number;
    private _totalSecond: number;

    get totalDay(): number {
        if (this._totalDay) {
            return this._totalDay;
        } else {
            return Math.round((this._interval / 1000 / 60 / 60 / 24) - 0.5);
        }
    }

    get totalHour(): number {
        if (this._totalHour) {
            return this._totalHour;
        } else {
            return Math.round((this._interval / 1000 / 60 / 60) - 0.5);
        }
    }

    get totalMinute(): number {
        if (this._totalMinute) {
            return this._totalMinute;
        } else {
            return Math.round((this._interval / 1000 / 60) - 0.5);
        }
    }

    get totalSecond(): number {
        if (this._totalSecond) {
            return this._totalSecond;
        } else {
            return Math.round((this._interval / 1000) - 0.5);
        }
    }

    get day(): number {
        if (this._day) {
            return this._day;
        } else {
            return this.totalDay;
        }
    }

    get hour(): number {
        if (this._hour) return this._minute;
        else return Math.round((this._interval % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) - 0.5)
    }

    get minute(): number {
        if (this._minute) {
            return this._minute
        } else {
            return Math.round((this._interval % (1000 * 60 * 60)) / (1000 * 60) - 0.5)
        }
    }

    get second(): number {
        if (this._second) return this._second;
        else return Math.round(((this._interval % (1000 * 60)) / (1000)) - 0.5);
    }

    get millisecond(): number {
        if (this._millisecond) return this._millisecond;
        else return Math.round(this._interval % 1000 - 0.5);
    }

    constructor(date1: Date, date2: Date) {
        this._interval = Math.abs(date1.valueOf() - date2.valueOf());
    }

    static getNextDateFrom(date:Date) {
        let now = new Date();
        let next = new Date(now.getFullYear(), date.getMonth(), date.getDate());
        if(now.valueOf() > next.valueOf()) {
            next.setFullYear(now.getFullYear() + 1);
        }
        return next;
    }
}