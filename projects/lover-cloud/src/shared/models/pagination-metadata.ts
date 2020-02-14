export class PaginationMetadata {
    private _pageIndex: number;
    public _pageSize?: number;
    public _pageCount?: number;

    public set pageIndex(pageIndex: number) {
        this._pageIndex = pageIndex;
        
        if(this.pageIndex > this.pageCount) {
            this._pageIndex = this.pageCount;
        }
        if(this.pageIndex < 1) {
            this._pageIndex = 1;
        }
    }

    public get pageIndex() {
        return this._pageIndex;
    }

    public set pageSize(pageSize: number) {
        if(pageSize < 1) {
            this._pageSize = 1;
        } else {
            this._pageSize = pageSize;
        }
    }
    public get pageSize() {
        return this._pageSize;
    }

    public set pageCount(pageCount: number) {
        this._pageCount = pageCount;
        
        if(this.pageCount < this.pageIndex) {
            this._pageCount = this.pageIndex;
        }
        if(this.pageCount < 1) {
            this._pageCount = 1;
        }
    }
    public get pageCount() {
        return this._pageCount;
    }

    constructor(pageIndex, pageSize) {
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
    }

    public get hasNext() {
        if (this.pageIndex < this.pageCount) {
            return true;
        } else {
            return false;
        }
    }

    public get hasPrevious() {
        if(this.pageIndex > 1) {
            return true;
        } else {
            return false;
        }
    }
}
